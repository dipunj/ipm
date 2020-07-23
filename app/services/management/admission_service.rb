module Management

	class AdmissionService

		def self.initiate_new_admission(operator, params, patient_params)
			patient = PatientService.create_or_find_patient(operator, patient_params)
			bed = Bed.find_by(id: params[:bed_id])
			raise 'Invalid bed' if bed.nil?

			raise 'Guardian Name is required' if params[:guardian_name].nil?
			raise 'Guardian phone is required' if params[:guardian_phone].nil?

			admission_params = {
				admit_timestamp:    params[:admit_timestamp] || Time.now,
				doctor_name:        params[:doctor_name],
				purpose:            params[:purpose],
				comment:            params[:comment],
				guardian_name:      params[:guardian_name],
				guardian_phone:     params[:guardian_phone],
				bed_id:             bed.id,
				patient_id:         patient.id,
				created_by_id:      operator.id,
				last_updated_by_id: operator.id
			}
			admission = Admission.create!(admission_params)
			return ResponseHelper.json(true, admission.as_json(Admission.with_all_data), "#{patient.name} has been admitted at #{bed.name} in #{bed.ward.name}")
		end

		def self.find_admission_by_id(operator, admission_id)
			raise 'Invalid Admission' if admission_id.nil?
			admission = Admission.find_by(id: admission_id)

			return ResponseHelper.json(true, admission.as_json(Admission.with_all_data), nil)
		end

		def self.update_admission(operator, admission_id, params)
			raise 'Please select a valid admission' if admission_id.nil?
			admission = Admission.find_by(id: admission_id)

			bed = Bed.find_by(id: params[:bed_id])

			update_params                      = {}

			update_params[:admit_timestamp]    = params[:admit_timestamp] if params[:admit_timestamp].present?
			update_params[:doctor_name]        = params[:doctor_name]     if params[:doctor_name].present?
			update_params[:purpose]            = params[:purpose]         if params[:purpose].present?
			update_params[:comment]            = params[:comment]         if params[:comment].present?
			update_params[:guardian_name]      = params[:guardian_name]   if params[:guardian_name].present?
			update_params[:guardian_phone]     = params[:guardian_phone]  if params[:guardian_phone].present?
			update_params[:bed_id]             = bed.id unless bed.nil?
			update_params[:last_updated_by_id] = operator.id

			admission.update!(update_params)
			return ResponseHelper.json(true, admission.as_json(Admission.with_all_data), nil)
		end
	end
end