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

	private

		def set_service
			@service ||= Setup::ConfigurationService
		end

		def selected_building_id
			cookies[:_ipm_sb]
		end
end
