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

		def self.fetch_user_by_id(id)
			user = User.find_by(id: id)
			return ResponseHelper.json(true, nil, 'No Such User') if user.nil?
			return ResponseHelper.json(true, user, nil)

		end

		def self.update_existing_user(id, params)
			user = User.find_by(id: id)
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

		def self.delete_existing_user(id)
			user = User.find_by(id: id)
			return ResponseHelper.json(true, nil, 'No Such User') if user.nil?
			user.delete
			return ResponseHelper.json(true, nil, 'User Deleted')
		end

		def self.fetch_all_users
			return ResponseHelper.json(true, User.all, nil)
		end


		# application specific
		def self.add_user_to_building(params)

		end

		def self.remove_user_from_building(params)

		end

		def self.deactivate_user_account(params)

		end
	end
end