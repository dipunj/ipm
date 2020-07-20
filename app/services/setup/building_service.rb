module Setup
	class BuildingService < SetupService

		def self.create_new_building(params)
			new_building = Building.create!(params)
			return JsonHelper.response(true,
									   new_building,
									   'Building Created Successfully')
		end

		def self.fetch_building_by_id(params)
			raise 'id cannot be null' if params.key?("id")

			building = Building.find_by(id: params[:id])
			return JsonHelper.response(true,
									   building,
									   nil)
		end

		def self.update_existing_building(params)
			raise 'id cannot be null' if params.key?("id")

			building = Building.find_by(id: id)
			return JsonHelper.response(true,
									   building,
									   nil)
		end

		def self.delete_existing_building(params)
			raise 'id cannot be null' if params.key?("id")

			updated = Building.delete_by(id: params[:id])
			return JsonHelper.response(true,
									   updated,
									   'Successfully Deleted')
		end

		def self.fetch_all_buildings(params)
			JsonHelper.response(true, Building.all, nil)
		end
	end
end