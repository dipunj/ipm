class Api::V1::Setup::ConfigurationController < Api::V1::BaseController

	before_action :set_service
	before_action :require_escalated_privileges
	before_action :authorise_building_access, only: [:soft_reset]


	def hard_reset
		response = @service.hard_reset
		# logout the user
		reset_session
		render json: response
	end

	def soft_reset
		response = @service.soft_reset(selected_building_id)
		render json: response
	end


	def generate_backup_file
		response = @service.generate_backup_file
		render json: response
	end

	def restore_from_config_file
		response = @service.restore_from_config_file(restore_params)
		render json: response
	end

	private

		def set_service
			@service ||= Setup::ConfigurationService
		end

		def selected_building_id
			cookies[:_ipm_sb]
		end

		def restore_params
			params.permit(users: [:id,
					              :name,
					              :account_type,
					              :prefers_dark,
					              :image_url,
					              :login_id,
					              :is_active,
								  :created_at,
								  :updated_at,
								  buildings: [
												:id,
												:branch_code,
												:city
											 ]
								 ],
						  buildings: [
										 :id,
										 :branch_code,
										 :name_line,
										 :address_line,
										 :locality,
										 :city,
										 :administrative_area,
										 :postal_code,
										 :country,
										 wards: [
													:id,
													:floor,
													:ward_type,
													:ward_number,
													:name,
													:building_id,
													beds: [
															:id,
															:name,
															:ward_id
														  ]
												]
								 ])
		end
end
