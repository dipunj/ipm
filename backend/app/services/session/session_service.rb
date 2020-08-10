module Session
	class SessionService < ApplicationService

		def self.authenticate(params, mode='cookie')
			user = User.find_by(login_id: params[:login_id])

			raise "User doesn't exist, please contact admin" if user.nil?

			unless user[:is_active]
				return ResponseHelper.json(false, nil, 'Account is not active. Contact Admin')
			end

			if user.authenticate(params[:password])
				case mode
					when 'jwt'
						jwt = JwtAuth.issue({ user_id: user.id, account_type: user.account_type})
						return ResponseHelper.json(true, jwt, 'Logged In')
					when 'cookie'
						return ResponseHelper.json(true, user.as_json(User.with_all_data), 'Logged In')
					else nil
				end
			end
			ResponseHelper.json(true, nil, 'Invalid Username or password')
		end

		def self.check_cookie(user_id)
			raise 'Invalid Session, please login again' if user_id.nil?

			user = User.find(user_id)
			raise 'Invalid User' if user.nil?

			return ResponseHelper.json(true, user.as_json(User.with_all_data), nil)
		end

		def self.change_password(current_user, params)
			password_params = {
				password: params[:password],
				password_confirmation: params[:password_confirmation]
			}
			if current_user.update!(password_params)
				ResponseHelper.json(true, nil, 'Password Changed Successfully')
			end
		end

		def self.toggle_theme(current_user, params)

			return ResponseHelper.json(true, nil, nil) if current_user.update!(params)

			raise 'Something is broken'
		end
	end
end