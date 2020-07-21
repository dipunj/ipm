class Api::V1::Setup::BuildingController < Api::V1::AuthorisationController

	before_action :set_service

	def create
		response = @service.create_new_building(building_params)
		render json: response
	end

	def read
		response = @service.fetch_building_by_id(building_id)
		render json: response
	end

	def update
		response = @service.update_existing_building(building_id, building_params)
		render json: response
	end

	def delete
		response = @service.delete_existing_building(building_id)
		render json: response
	end

	def search
		response = @service.find_building(building_params)
		render json: response
	end

	def list_all
		response = @service.fetch_all_buildings
		render json: response
	end


	private
		def set_service
			@service ||= Setup::BuildingService
		end

		def building_params
			params.permit(:code,
						  :name_line,
						  :address_line,
						  :locality,
						  :city,
						  :administrative_area,
						  :postal_code,
						  :country)
		end

		def building_id
			params.permit(:id)[:id]
		end
end
