module Setup
	class UserService < SetupService

		def self.create_new_user(params, building_params)
			raise 'Name should not be empty'              if params[:name].blank?
			raise 'Please Select Account type'            if params[:account_type].blank?
			raise 'Please enter your mobile phone number' if params[:login_id].blank?

			create_params = {
				name: params[:name],
				account_type: params[:account_type],
				login_id: params[:login_id],
				password: params[:password],
				password_confirmation: params[:password_confirmation],
				is_active: true
			}
			user = User.create!(create_params)

			# allow access to all buildings
			if params[:account_type] == AccountTypes::ADMIN
				user.buildings = Building.all
			else
				buildings = Building.where(id: building_params[:building_id_list])
				user.buildings << buildings.select{ |building| ! user.buildings.include?(building) }
			end
			user.save
			return ResponseHelper.json(true, user, 'Successfully Created User')
		end

		def self.fetch_user_by_id(user_id)
			user = User.find_by(id: user_id)
			return ResponseHelper.json(true, nil, 'No Such User') if user.nil?
			return ResponseHelper.json(true, user.as_json(User.with_all_data), nil)

		end

		def self.update_existing_user(user_id, params, building_params)
			user = User.find_by(id: user_id)
			raise 'No Such User' if user.nil?

			update_params = {
				name:         params[:name]         || user[:name],
				account_type: params[:account_type] || user[:account_type],
				login_id:     params[:login_id]     || user[:login_id],
			}

			if params[:password] && params[:password_confirmation]
				update_params[:password] = params[:password]
				update_params[:password_confirmation] = params[:password_confirmation]
			end

			user.update!(update_params)
			# allow access to all buildings
			if params[:account_type] == AccountTypes::ADMIN
				user.buildings = Building.all
			else
				buildings = Building.where(id: building_params[:building_id_list])
				# user.buildings = buildings.select{ |building| ! user.buildings.include?(building) }
				user.buildings = buildings
			end
			user.save

			return ResponseHelper.json(true, user, 'User Updated Successfully')
		end

		def self.delete_existing_user(user_id)
			user = User.find_by(id: user_id)
			return ResponseHelper.json(true, nil, 'No Such User') if user.nil?
			user.delete
			return ResponseHelper.json(true, nil, 'User Deleted')
		end

		def self.fetch_all_users(params)
			building_id = params[:building_id]
			branch_code = params[:branch_code]
			city        = params[:city]
			postal_code = params[:postal_code]

			if branch_code.nil? && city.nil? && postal_code.nil? && building_id.nil?
				users = User.all
			else
				buildings = Building.where("branch_code = ? or city = ? or postal_code = ? or id = ?",
										   branch_code,
										   city,
										   postal_code,
										   building_id)

				users     = buildings.collect(&:users).flatten
			end
			return ResponseHelper.json(true, users.as_json(User.with_all_data), nil)
		end


		# application specific
		def self.add_user_to_building(admin, user_id, params)
			user = User.find_by(id: user_id)
			raise 'No such user in database' if user.nil?

			buildings = Building.where(id: params[:building_id_list])
			user.buildings << buildings.select{ |building| ! user.buildings.include?(building) }

			access_count = user.buildings.length
			ResponseHelper.json(true,
								nil,
								"#{user[:name]} can now login into #{access_count} #{'branch'.pluralize(access_count)}")
		end

		def self.remove_user_from_building(admin, user_id, params)
			user = User.find_by(id: user_id)
			raise 'No such user in database' if user.nil?

			user.buildings.delete(Building.find(params[:building_id_list]))
			access_count = user.buildings.length

			ResponseHelper.json(true,
								nil,
								"#{user[:name]} can now login into #{access_count} #{'branch'.pluralize(access_count)}")
		end

		def self.toggle_user_account_status(admin, user_id)
			user = User.find_by(id: user_id)
			system_admin = User.find_by(login_id: 'admin')
			raise 'Cannot deactivate system admin' if system_admin.id == user.id
			raise 'No such user in database' if user.nil?
			if user.update!(is_active: !user[:is_active])
				return ResponseHelper.json(true, user, "#{user[:name]}'s account is now #{user[:is_active] ?
																								  'active'
																									: 'deactivated'}")
			end
			ResponseHelper.json(false, nil, "Request Failed!")
		end

		def self.change_other_user_password(admin, user_id, params)
			user = User.find_by(id: user_id)
			raise 'No such user in database' if user.nil?

			pass_params = {
				password: params[:password],
				password_confirmation: params[:password_confirmation]
			}

			if user.update!(pass_params)
				return ResponseHelper.json(true, user, "#{user[:name]}'s password changed successfully")
			end
			ResponseHelper.json(false, nil, 'Request Failed')
		end
	end
end