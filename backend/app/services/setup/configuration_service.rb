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

	end
end