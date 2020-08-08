class Api::V1::BaseController < ApplicationController

	before_action :authenticate!

	def authenticate!
		render json: {
			success: false,
			is_authenticated: false,
			data: {
				data: nil,
				message: 'Not authenticated'
			}
		} unless authenticated?
	end

	def require_escalated_privileges
		render json: {
			success: false,
			is_authenticated: true,
			data: {
				data: nil,
				message: 'Unauthorised'
			}
		} unless current_user[:account_type] == AccountTypes::ADMIN
	end

	private

		def authenticated?
			!!current_user
		end

		def current_user
			user = nil
			case ENV["AUTH_MODE"]
				when 'jwt'
					if header_present?
						user = User.find_by(id: auth_data["user_id"])
					end
				when 'cookie'
					if session[:user_id].present?
						user = User.find_by(id: session[:user_id])
					end
				else nil
			end
			if user.present? && user[:is_active]
				@current_user ||= user
			end
		end

		def header_present?
			!!request.env.fetch("HTTP_AUTHORIZATION", "").scan(/Bearer/).flatten.first
		end

		def auth_data
			JwtAuth.decode(token)
		end

		def token
			request.env["HTTP_AUTHORIZATION"].scan(/Bearer(.*)$/).flatten.last
		end
end
