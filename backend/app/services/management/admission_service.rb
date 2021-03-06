module Management
	class AdmissionService

		def self.initiate_new_admission(operator, params, patient_params)
			patient = PatientService.create_or_find_patient(operator, patient_params)
			bed = Bed.find_by(id: params[:bed_id])
			raise 'Invalid bed' if bed.nil?

			raise 'Guardian Name is required' if params[:guardian_name].nil?
			# raise 'Guardian phone is required' if params[:guardian_phone].nil?

			print "Number of faulty records on this bed #{} ", Admission.where(bed_id: bed.id, discharge_timestamp: nil).length

			# find the latest admission on that bed,
			# if the patient hasn't been discharged
			last_admission = Admission.where(bed_id: bed.id).order(admit_timestamp: :desc).first
			raise 'Please discharge previous patient on this bed.' if last_admission && !last_admission[:is_discharged]

			admission_params = {
				admit_timestamp:     params[:admit_timestamp] || Time.now,
				discharge_timestamp: params[:discharges_timestamp],
				doctor_name:         params[:doctor_name],
				purpose:             params[:purpose],
				comment:             params[:comment],
				guardian_name:       params[:guardian_name],
				guardian_phone:      params[:guardian_phone],
				bed_id:              bed.id,
				patient_id:          patient.id,
				updated_by_id:       operator.id,
			}

			admission = Admission.create!(admission_params)
			return ResponseHelper.json(true, admission.as_json(Admission.with_all_data(operator)), "#{patient.name} has been admitted at #{bed.name} in #{bed.ward.name}")
		end

		def self.update_admission(operator, admission_id, params, patient_id, patient_params)

			raise 'Please select a valid admission' if admission_id.nil?
			raise 'Invalid patient ID' if patient_id.nil?

			admission = Admission.find_by(id: admission_id)
			raise 'Please reopen admission to modify it' if admission.is_discharged

			patient   = Patient.find_by(id: patient_id)

			# implies that the patient is being shifted from one bed to other
			bed = nil
			if params[:bed_id].present?
				bed = Bed.find_by(id: params[:bed_id])
				bed = nil if bed && bed.id == admission[:bed_id]
			end

			admission_params = {
				admit_timestamp:     params[:admit_timestamp]     || admission.admit_timestamp,
				discharge_timestamp: params[:discharge_timestamp],
				doctor_name:         params[:doctor_name]         || admission.doctor_name,
				purpose:             params[:purpose]             || admission.purpose,
				comment:             params[:comment]             || admission.comment,
				guardian_name:       params[:guardian_name]       || admission.guardian_name,
				guardian_phone:      params[:guardian_phone]      || admission.guardian_phone,
				bed_id:              bed.present? && bed.id       || admission.bed_id,
				updated_by_id:       operator.id
			}

			ActiveRecord::Base.transaction do

				# copy of admission before new changes
				# log_params = admission.as_json.deep_symbolize_keys.except(:id, :created_at, :updated_at)
				#
				# # admission log also saves patient details
				# log_params[:patient_name] = patient[:name]
				# log_params[:patient_phone] = patient[:phone]
				# log_params[:patient_gender] = patient[:gender]
				# log_params[:patient_yob] = patient[:yob]
				#
				# admission.admission_logs.create!(log_params)
				admission.update!(admission_params)

				patient_params[:yob] = Time.now.year - patient_params[:age].to_i
				patient.update!(patient_params.except(:age))
			end
			return ResponseHelper.json(true, admission.as_json(Admission.with_all_data(operator)), 'Updated Successfully')
		end

		def self.find_admission_by_id(operator, admission_id)
			raise 'Invalid Admission' if admission_id.nil?
			admission = Admission.find_by(id: admission_id)

			return ResponseHelper.json(admission.present?, admission.as_json(Admission.with_all_data(operator)), nil)
		end

		def self.admission_logs(operator, admission_id, pagination_params)
			raise 'Invalid Admission' if admission_id.nil?
			admission = Admission.find_by(id: admission_id)
			records_per_page           = (pagination_params[:records_per_page] || 10).to_i
			page                       = pagination_params[:page].nil? ? 0 : (pagination_params[:page].to_i - 1)

			log_list = admission.admission_logs.all
			count = log_list.length
			log_list = log_list.order('created_at DESC').limit(records_per_page).offset(page*records_per_page)
			return ResponseHelper.json(admission.present?, {page: page.to_i+1, count: count, result: log_list.as_json(AdmissionLog.with_all_data)}, nil)
		end

		def self.discharge_admission(operator, admission_id, params)
			raise 'Invalid admission ID' if admission_id.blank?

			admission = Admission.find(admission_id)
			undo_discharge = params[:undo_discharge]

			if undo_discharge
				if !admission.is_discharged
					raise 'Admission is active, cannot reopen an already open admission'
				else
					bed_occupied = Admission.where(bed_id: admission.bed_id, is_discharged: false).length > 0
					raise "An admission is already active on #{admission.bed.name} at #{admission.ward.name}" if bed_occupied
					admission.update!({
										  is_discharged: false,
										  discharge_timestamp: nil
									  })
					return ResponseHelper.json(true, admission.as_json(Admission.with_overview_data), 'Reopened Admission')
				end
			end

			total = TransactionService.compute_total(operator, admission_id, true)
			if (total[:total_bill] != total[:amount_received]) || total[:amount_receivable] != 0
				raise 'Cannot discharge, since there are outstanding transactions. Please settle the ledger'
			else
				admission.update!({
									  discharge_timestamp: params[:discharge_timestamp] || Time.now,
									  is_discharged: true
								  })
				return ResponseHelper.json(true, admission.as_json(Admission.with_overview_data), "Patient Discharged. Bed #{admission.bed.name} at #{admission.ward.name} is empty now")
			end
		end

		def self.list_admissions(operator, building_id, pagination_params, params)
			records_per_page           = (pagination_params[:records_per_page] || 10).to_i
			page                       = pagination_params[:page].nil? ? 0 : (pagination_params[:page].to_i - 1)
			admission_list             = Admission.all
			admission_list             = admission_list
											 .where(is_discharged: params[:is_discharged]) if params[:is_discharged].present?

			raise 'Invalid Building ID' unless building_id.present?

			admission_list             = admission_list
											 .joins(bed: [ward: [:building]])
											 .where(beds: { wards: { building_id: building_id } })
			count                      = admission_list.length

			if params[:query].present?
				regex_query            = "%#{params[:query].downcase}%"
				admission_list         = admission_list
											 .joins(:patient)
											 .where('LOWER(patients.name) LIKE ? OR patients.phone LIKE ?', regex_query, regex_query)
			end

			admission_list         = admission_list
										 .where('discharge_timestamp between ? and ?', params[:from_date], params[:to_date]) if params[:from_date].present? && params[:to_date].present?
			admission_list             = admission_list.limit(records_per_page).offset(page*records_per_page)
			return ResponseHelper.json(true, {page: page.to_i+1, count: count, result: admission_list.as_json(Admission.with_overview_data)}, nil)
		end

		def self.search_admissions(operator, params)
			regex_query = "%" + params[:query] + "%"

			# search in
			# 1. patient names, phones
			# 2. guardian names, phones
			# 3. visitor names, phones

			# 1

			result = []
			patient_matches  = Patient.where("name LIKE ? OR phone LIKE ?", regex_query).collect(&:admissions)
			guardian_matches = Admission.where("guardian_name LIKE ? OR guardian_phone LIKE ?", regex_query, regex_query)
			visitor_matches  = Visitor.where("name LIKE ? OR phone LIKE ?", regex_query, regex_query)
		end
	end
end





