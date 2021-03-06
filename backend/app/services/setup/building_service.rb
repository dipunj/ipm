module Setup
	class BuildingService < SetupService

		def self.create_new_building(params)
			new_building = nil
			ActiveRecord::Base.transaction do
				new_building = Building.create!(params)
				admin_users = User.where(account_type: AccountTypes::ADMIN)

				admin_users.each do |admin|
					admin.buildings << new_building
				end
			end

			return ResponseHelper.json(true,
									   new_building,
									   'Building Created Successfully')
		end

		# used by operators on initial call to set context in frontend
		def self.fetch_building_by_id(id, ctx_call = false, patient_data)

			building = Building.find_by(id: id)
			raise 'Invalid Building ID' if building.blank?
			return ResponseHelper.json(true, building.as_json, nil) unless ctx_call

			occupied_beds = Admission.all.where(is_discharged: false).joins(bed: [ward: [:building]]).where("buildings.id = ?",id).pluck(:bed_id, :patient_id, :id)
			json_data = building.as_json(Building.with_structural_data)

			json_data["wards"].each do |ward|
				ward["beds"].each do |bed|
					occupied_beds.each do |bed_patient|
						unless bed.has_key?("is_occupied")
							bed["is_occupied"] = false
						end
						next if bed["is_occupied"] == true

						if bed_patient[0] == bed["id"]
							bed["is_occupied"] = true
							if patient_data
								bed["occupied_by"] = Patient.find(bed_patient[1]).as_json
								bed["occupied_by_admission_id"] = bed_patient[2]
							end
						end
					end
				end
			end

			return ResponseHelper.json(true,
									   json_data,
									   nil)
		end

		def self.update_existing_building(id, params)
			building = Building.find_by(id: id)
			raise 'No such building exists in database' if building.blank?
			building.update!(params)

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

		def self.find_building(params)
			buildings = Building.find(params)
			return ResponseHelper.json(true,{
				count: buildings.length,
				buildings: buildings
			}, nil)
		end

	end
end