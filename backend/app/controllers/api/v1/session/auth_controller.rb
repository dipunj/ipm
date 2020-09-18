class Api::V1::Session::AuthController < Api::V1::BaseController

	before_action :set_service
	skip_before_action :authenticate!, only: [:login]

	def login
		reset_session
		response = @service.authenticate(login_params)
		if ENV["AUTH_MODE"] == 'cookie'
			if response[:success]
				session[:user_id] = response[:response][:data]["id"]
				cookie_val = response[:response][:data]["buildings"].length > 0 ? response[:response][:data]["buildings"][0]["id"] : ""
				cookies[:_ipm_sb] = {
					value: cookie_val,
					domain: 'localhost',
					expires: 1.week,
					path: '/'
				}
				render json: response.as_json
			else
				render json: response.as_json, status: 401
			end
		end
	end

	def is_logged_in
		response = nil
		if ENV["AUTH_MODE"] == "cookie"
			response = @service.check_cookie(session[:user_id])
		end
		render json: response
	end

	def toggle_theme
		response = @service.toggle_theme(@current_user, theme_params)
		render json: response
	end

	# only makes sense when using cookie as auth mode
	def logout
		reset_session
		render json: {
			success: true,
			response: {
				data: nil,
				message: 'Logged out Successfully'
			}
		}
	end

	def change_password
		response = @service.change_password(@current_user, password_params)
		if response[:success]
			reset_session
		end
		render json: response
	end

	private

		def set_service
			@service ||= Session::SessionService
		end

		def login_params
			params.permit(:login_id, :password)
		end

		def password_params
			params.permit(:password, :password_confirmation)
		end

		def theme_params
			params.permit(:prefers_dark)
		end
end
