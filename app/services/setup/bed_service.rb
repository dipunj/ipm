module Setup
	class BedService < SetupService

		def self.create_new_bed(ward_id, params)

			raise 'Bed cannot exist without a ward, please select the associated ward' if ward_id.blank?

			create_params = {
				ward_id:  ward_id,
				name: params[:name]
			}

			new_bed = Bed.create!(create_params)
			return ResponseHelper.json(true, new_bed, "Bed #{create_params[:code]} created Successfully")
		end

		def self.fetch_bed_by_id(id)
			bed = Bed.find_by(id: id)
			return ResponseHelper.json(false, bed, 'Bed not found') if bed.nil?
			return ResponseHelper.json(true, bed.as_json(Bed.with_all_data), nil)
		end

		def self.update_existing_bed(bed_id, params)
			bed = Bed.find_by(id: bed_id)
			raise 'No Such Bed exists in database' if bed.blank?

			update_params = {
				name: params[:name]
			}

			bed.update!(update_params)

			return ResponseHelper.json(true, bed.as_json(Bed.only), 'Updated Bed Successfully')
		end

		def self.delete_existing_bed(id)
			bed = Bed.find_by(id: id)
			raise 'No Such Bed exists in database' if bed.blank?
			bed.delete

			return ResponseHelper.json(true, nil, 'Bed Deleted Successfully')
		end

		def self.fetch_all_beds(params)
			branch_code = params[:branch_code]
			city        = params[:city]
			postal_code = params[:postal_code]

			beds = Building.where("branch_code = ? or city = ? or postal_code = ?",
								  branch_code,
								  city,
								  postal_code).collect(&:beds)
						                      .flatten

			ResponseHelper.json(true, beds.as_json(Bed.with_all_data), 'Success')
		end

		def self.find_bed(building_id, ward_id, params)

			if ward_id.present?
				ward = Ward.find_by(id: ward_id)

			end
		end

	end
end