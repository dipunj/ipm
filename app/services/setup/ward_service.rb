module Setup
	class WardService < SetupService

		def self.create_new_ward(building_id, params)

			raise 'Ward cannot exist without a building, please select the associated building' if building_id.blank?
			raise 'Ward must have a floor' if params[:floor].blank?
			raise 'Ward must have a number' if params[:ward_number].blank?
			raise 'Ward must have a type' if params[:ward_type].blank?

			create_params = {
				building_id:  building_id,
				floor:        params[:floor],
				ward_type:    params[:ward_type],
				ward_number:  params[:ward_number],
				display_name: "#{params[:ward_type]}-#{params[:ward_number]} L#{params[:floor]}"
			}

			new_ward = Ward.create!(create_params)
			return ResponseHelper.json(true, new_ward, 'Ward Created Successfully')
		end

		def self.fetch_ward_by_id(id)
			ward = Ward.find_by(id: id)
			return ResponseHelper.json(true, ward, 'Ward not found') if ward.nil?
			return ResponseHelper.json(true, ward, nil)
		end

		def self.update_existing_ward(ward_id, params)
			ward = Ward.find_by(id: ward_id)
			raise 'No Such Ward exists in database' if ward.blank?

			update_params = {
				floor:        params[:floor] || ward[:floor],
				ward_type:    params[:ward_type] || ward[:ward_type],
				ward_number:  params[:ward_number] || ward[:ward_number],
				display_name: "#{params[:ward_type] || ward[:ward_type]}-#{params[:ward_number] ||
					ward[:ward_number]} L#{params[:floor] || ward[:floor]}"
			}

			ward.update!(update_params)

			return ResponseHelper.json(true, ward, 'Updated Ward Successfully')
		end

		def self.delete_existing_ward(id)
			ward = Ward.find_by(id: id)
			raise 'No Such Ward exists in database' if ward.blank?
			ward.delete

			return ResponseHelper.json(true, nil, 'Ward Deleted Successfully')
		end

		def self.fetch_all_wards(params)
			building_id = params[:building_id]
			code        = params[:code]
			city        = params[:city]
			postal_code = params[:postal_code]

			# search sql here
		end

		def self.find_ward(building_id, params)

		end
	end
end