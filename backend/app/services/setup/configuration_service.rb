module Setup
	class ConfigurationService < SetupService


		def self.hard_reset
			admin = nil
			admin_params = {
				name: 'System Admin',
				account_type: AccountTypes::ADMIN,
				login_id: 'admin',
				password: 'admin',
				password_confirmation: 'admin',
				is_active: true
			}
			dummy_building = nil
			building_params = {
				branch_code: '0000',
				name_line: 'Dummy Building',
				address_line: 'Delete this building once you have setup your building',
				locality: nil,
				city: 'dummy',
				administrative_area: 'dummy',
				postal_code: '242001',
				country: 'IN'
			}
			ActiveRecord::Base.transaction do
				TransactionLog.all.destroy_all
				Transaction.all.destroy_all
				AdmissionLog.all.destroy_all
				Admission.all.destroy_all
				Patient.all.destroy_all
				Bed.all.destroy_all
				Ward.all.destroy_all
				User.all.destroy_all
				Building.all.destroy_all
				dummy_building = Building.create!(building_params)
				admin = User.create!(admin_params)
				admin.buildings << dummy_building
			end
			ResponseHelper.json(true, {admin: admin, building: dummy_building}, 'System Full Reset')
		end

		def self.soft_reset(building_id)
			building = Building.find(building_id)
			raise 'Invalid Building ID' if building.blank?

			ActiveRecord::Base.transaction do
				building.transaction_logs.all.destroy_all
				building.transactions.all.destroy_all
				building.admission_logs.all.destroy_all
				building.admissions.all.destroy_all
				building.patients.all.destroy_all
			end

			ResponseHelper.json(true, nil, "All admissions, transactions deleted for branch #{building.branch_code}")
		end


		def self.generate_backup_file
			all_buildings = Building.all
			all_users = User.all

			data = {
				users: all_users.as_json(User.with_all_data),
				buildings: all_buildings.as_json(Building.with_structural_data)
			}

			return data.as_json
		end


		def self.restore_from_config_file(params)
			raise 'Please hard reset the system first to restore from config file' if Admission.all.length > 0 || Building.all.length > 1 || User.all.length > 1
			raise 'Invalid configuration file' if params[:users].blank? || params[:buildings].blank?


			ActiveRecord::Base.transaction do

				Building.all.destroy_all
				User.all.destroy_all

				buildings = params[:buildings]
				users = params[:users]

				buildings.each do |bld|
					new_building = Building.create!(bld.except(:wards))
					bld[:wards].each do |ward|
						new_ward = new_building.wards.create!(ward.except(:beds, :building_id))
						ward[:beds].each do |bed|
							new_ward.beds.create!(bed.except(:ward_id))
						end
					end
				end

				users.each do |usr|
					if usr[:account_type] == AccountTypes::ADMIN
						usr[:password] = 'admin'
						usr[:password_confirmation] = 'admin'
					else
						usr[:password] = 'password'
						usr[:password_confirmation] = 'password'
					end
					new_user = User.create!(usr.except(:buildings, :created_at, :updated_at))
					UserService.set_user_building_list(nil,new_user[:id], { building_id_list: usr[:buildings].map {|b| b[:id] } })
				end
			end
			ResponseHelper.json(true, nil, 'System Restored, admin password is "admin", all other users password is "password"')
		end

	end
end