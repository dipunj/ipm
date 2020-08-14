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
				created_by_id:       operator.id,
				last_updated_by_id:  operator.id
			}

			admission = Admission.create!(admission_params)
			return ResponseHelper.json(true, admission.as_json(Admission.with_all_data), "#{patient.name} has been admitted at #{bed.name} in #{bed.ward.name}")
		end

		def self.update_admission(operator, admission_id, params)
			raise 'Please select a valid admission' if admission_id.nil?
			admission = Admission.find_by(id: admission_id)

			# implies that the patient is being shifted from one bed to other
			bed = nil
			if params[:bed_id].present?
				bed = Bed.find_by(id: params[:bed_id])
				bed = nil if bed && bed.id == admission[:bed_id]
			end

			update_params                      = {}

			update_params[:admit_timestamp]        = params[:admit_timestamp]     if params[:admit_timestamp].present?
			update_params[:discharge_timestamp]    = params[:discharge_timestamp] if params[:discharge_timestamp].present?
			update_params[:doctor_name]            = params[:doctor_name]         if params[:doctor_name].present?
			update_params[:purpose]                = params[:purpose]             if params[:purpose].present?
			update_params[:comment]                = params[:comment]             if params[:comment].present?
			update_params[:guardian_name]          = params[:guardian_name]       if params[:guardian_name].present?
			update_params[:guardian_phone]         = params[:guardian_phone]      if params[:guardian_phone].present?
			update_params[:bed_id]                 = bed.id unless bed.nil?
			update_params[:last_updated_by_id]     = operator.id

			Admission.transaction do
				log_params = admission.as_json.deep_symbolize_keys.except(:id, :created_at, :updated_at)
				log_params[:admission_id] = admission.id
				log_entry = AdmissionLog.create!(log_params)
				admission.update!(update_params)
			end
			return ResponseHelper.json(true, admission.as_json(Admission.with_all_data), nil)
		end

		def self.find_admission_by_id(operator, admission_id)
			raise 'Invalid Admission' if admission_id.nil?
			admission = Admission.find_by(id: admission_id)

			return ResponseHelper.json(admission.present?, admission.as_json(Admission.with_all_data), nil)
		end

		def self.list_current_admissions(operator, building_id, params, search_params)
			records_per_page = (params[:records_per_page] || 10).to_i
			page = params[:page].nil? ? 0 : (params[:page].to_i - 1)
			current = Admission.where(is_discharged: false)
			if building_id.present?
				current =  current.joins(bed: [ward: [:building]]).where(beds: { wards: { building_id: building_id } })
				count = current.length
				if search_params[:query].present?
					regex_query = "%#{search_params[:query].downcase}%"
					current = current.joins(:patient).where('LOWER(patients.name) LIKE ? OR patients.phone LIKE ?', regex_query, regex_query)
				end
				current = current.limit(records_per_page).offset(page*records_per_page)
			else
				raise 'Invalid Building ID'
			end


			return ResponseHelper.json(true, {page: page.to_i+1, count: count, result: current.as_json(Admission.with_overview_data)}, nil)
		end

		def self.search_admissions(operator, params)
			regex_query = "%" + params[:query] + "%"

			# search in
			# 1. patient names, phones
			# 2. guardian names, phones
			# 3. visitor names, phones

			# 1

			result = []
			patient_matches = Patient.where("name LIKE ? OR phone LIKE ?", regex_query).collect(&:admissions)
			guardian_matches = Admission.where("guardian_name LIKE ? OR guardian_phone LIKE ?", regex_query, regex_query)
			visitor_matches = Visitor.where("name LIKE ? OR phone LIKE ?", regex_query, regex_query)
		end
	end
end





