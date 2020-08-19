class Api::V1::Session::AuthController < Api::V1::BaseController

	before_action :set_service
	skip_before_action :authenticate!, only: [:login]

	def login
		response = @service.authenticate(login_params)
		if ENV["AUTH_MODE"] == 'cookie'
			session[:user_id] = response[:response][:data]["id"]
			cookies[:_ipm_sb] = {
				value: response[:response][:data]["buildings"][0]["id"],
				domain: 'localhost',
				expires: 1.week,
				path: '/'
			}
		end
		render json: response
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
