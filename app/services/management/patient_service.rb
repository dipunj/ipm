module Management

	class PatientService

		def self.create_or_find_patient(operator, params, internal=true)

			raise 'Name cannot be empty'                    if params[:name].blank?
			raise 'Phone number of the patient is required' if params[:phone].blank?
			raise 'Specify the gender of the patient'       if params[:gender].blank?

			create_params = {
				name: params[:name],
				phone: params[:phone],
				gender: params[:gender],
				# created_by: operator.id
			}
			patient = Patient.find_by(create_params)
			patient = Patient.create!(create_params) if patient.nil?

			return patient if internal
			return ResponseHelper.json(true, patient.as_json, 'Patient Created')
		end

		def self.search_patient(operator, params)
			query_string     = params[:query]
			results_per_page = min(params[:results_per_page] || 10, 50)
			page             = params[:page] || 0


			latest_patients = Patient.all.order(created_at: :desc).offset(page).limit(results_per_page)
			return ResponseHelper.json(true, latest_patients.as_json, nil) if query_string.blank?

			query_string = "%" + query_string + "%"
			matched_patients = Patient.where("name LIKE ? or phone LIKE ?", query_string, query_string).offset(page).limit(results_per_page)
			return ResponseHelper.json(true, matched_patients.as_json, nil)

		end

		def self.find_patient_by_id(operator, patient_id)
			raise 'Please select a patient' if patient_id.blank?

			patient = Patient.find_by(id: patient_id)
			return ResponseHelper.json(true, patient.as_json, nil)
		end

	end
end