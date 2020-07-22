module Setup
	class UserService < SetupService

		def self.create_new_user(params)
			raise 'Display Name should not be empty'      if params[:display_name].blank?
			raise 'Please Select Account type'            if params[:account_type].blank?
			raise 'Please enter your mobile phone number' if params[:login_id].blank?

			create_params = {
				display_name: params[:display_name],
				account_type: params[:account_type],
				login_id: params[:login_id],
				password: params[:password],
				password_confirmation: params[:password_confirmation]
			}
			user = User.create!(create_params)
			return ResponseHelper.json(true, user, 'Successfully Created User')
		end

		def self.fetch_user_by_id(user_id)
			user = User.find_by(id: user_id)
			return ResponseHelper.json(true, nil, 'No Such User') if user.nil?
			return ResponseHelper.json(true, user, nil)

		end

		def self.update_existing_user(user_id, params)
			user = User.find_by(id: user_id)
			return ResponseHelper.json(true, nil, 'No Such User') if user.nil?
			update_params = {
				display_name: params[:display_name] || user[:display_name],
				account_type: params[:account_type] || user[:account_type],
				login_id: params[:login_id] || user[:login_id],
			}

			if params[:password] && params[:password_confirmation]
				update_params[:password] = params[:password]
				update_params[:password_confirmation] = params[:password_confirmation]
			end

			user.update!(update_params)

			return ResponseHelper.json(true, user, 'User Updated Successfully')
		end

		def self.delete_existing_user(user_id)
			user = User.find_by(id: user_id)
			return ResponseHelper.json(true, nil, 'No Such User') if user.nil?
			user.delete
			return ResponseHelper.json(true, nil, 'User Deleted')
		end

		def self.fetch_all_users(params)
			return ResponseHelper.json(true, User.all, nil)
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
								"#{user[:display_name]} can now login into #{access_count} #{'branch'.pluralize(access_count)}")
		end

		def self.remove_user_from_building(admin, user_id, params)
			user = User.find_by(id: user_id)
			raise 'No such user in database' if user.nil?

			user.buildings.delete(Building.find(params[:building_id_list]))
			access_count = user.buildings.length

			ResponseHelper.json(true,
								nil,
								"#{user[:display_name]} can now login into #{access_count} #{'branch'.pluralize(access_count)}")
		end

		def self.toggle_user_account_status(admin, user_id)
			user = User.find_by(id: user_id)
			raise 'No such user in database' if user.nil?
			if user.update!(is_active: !user[:is_active])
				ResponseHelper.json(true, user, "#{user[:display_name]}'s account is now #{user[:is_active] ? 'active'
																									: 'deactivated'}")
			end
			ResponseHelper.json(false, nil, "Request Failed!")
		end

		def change_other_user_password(admin, user_id, params)
			user = User.find_by(id: user_id)
			raise 'No such user in database' if user.nil?

			pass_params = {
				password: params[:password],
				password_confirmation: params[:password_confirmation]
			}

			if user.update!(pass_params)
				ResponseHelper.json(true, user, "#{user[:display_name]}'s password changed successfully")
			end
			ResponseHelper.json(false, nil, 'Request Failed')
		end
	end
end