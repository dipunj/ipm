module Setup
	class BuildingService < SetupService

		def self.create_new_building(params)
			new_building = Building.create!(params)
			return ResponseHelper.json(true,
									   new_building,
									   'Building Created Successfully')
		end

		def self.fetch_building_by_id(id)
			building = Building.find_by(id: id)

			return ResponseHelper.json(true,
									   building,
									   'No such building exists in database')
		end

		def self.update_existing_building(id, params)
			building = Building.find_by(id: id)
			raise 'No such building exists in database' if building.blank?
			building = building.update!(params)

			return ResponseHelper.json(true,
									   building,
									   'Successfully Updated')
		end

		def self.delete_existing_building(id)
			raise 'id cannot be null' if id.blank?

			updated = Building.delete_by(id: id)
			return ResponseHelper.json(true,
									   { delete_count: updated },
									   'Successfully Deleted')
		end

		def self.fetch_all_buildings
			buildings = Building.all
			return ResponseHelper.json(true,
								{
									count: buildings.length,
									buildings: buildings
								}, nil)
		end

		def self.search_building(params)
			buildings = Building.find(params)
			return ResponseHelper.json(true,{
				count: buildings.length,
				buildings: buildings
			}, nil)
		end

	end
end