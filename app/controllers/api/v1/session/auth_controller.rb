class Api::V1::Session::SessionController < Api::V1::ApplicationController

	skip_before_action :authenticate!, only: [:login]

	def login
		response = @service.authenticate(login_params)
		if ENV["AUTH_MODE"] == 'cookie'
			session[:user_id] = response[:response][:data]
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
end
