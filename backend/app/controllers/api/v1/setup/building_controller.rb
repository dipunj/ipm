class Api::V1::Setup::BuildingController < Api::V1::BaseController

	before_action :set_service
	before_action :require_escalated_privileges, except: [:find_building_by_id]
	before_action :authorise_building_access, only: [:find_building_by_id]

	def create
		response = @service.create_new_building(building_params)
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



	# for use by operators

	def find_building_by_id
		response = @service.fetch_building_by_id(selected_building_id)
		render json: response
	end


	private
		def set_service
			@service ||= Setup::BuildingService
		end

		def building_params
			params.permit(:branch_code,
						  :name_line,
						  :address_line,
						  :locality,
						  :city,
						  :administrative_area,
						  :postal_code,
						  :country)
		end

		def selected_building_id
			cookies[:_ipm_sb]
		end

		def building_id
			params.permit(:id)[:id]
		end
end
