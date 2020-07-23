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
			return ResponseHelper.json(true, patient, 'Patient Created')
		end
	end
end