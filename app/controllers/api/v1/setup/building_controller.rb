class Api::V1::Setup::BuildingController < Api::V1::AuthorisationController

	before_action :set_service

	def create
		response = @service.create_new_building(new_building_params)
		render json: response
	end

	def read
		response = @service.fetch_building_by_id(fetch_building_params)
		render json: response
	end

	def update
		response = @service.update_existing_building(update_building_params)
		render json: response
	end

	def delete
		response = @service.delete_existing_building(delete_building_params)
		render json: response
	end


	private
		def set_service
			@service ||= Setup::BuildingService
		end

		def new_building_params
			params.permit(:code,
						  :name_line,
						  :address_line,
						  :locality,
						  :city,
						  :administrative_area,
						  :postal_code,
						  :country)
		end
end
