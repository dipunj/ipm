class Api::V1::BaseController < ApplicationController

	before_action :authenticate!
	rescue_from Exception, :with => :custom_handle_exceptions

	def custom_handle_exceptions(exception)
		render json: ResponseHelper.json(false, Rails.env.development? && exception.backtrace, exception.message || exception.class.to_s), status: 500
	end

	def authorise_building_access
		error_message = nil

		if cookies[:_ipm_sb].blank?
			error_message = "You don't have access to any hospital building. Please contact admin"
		elsif @current_user.buildings.find(cookies[:_ipm_sb]).nil?
			error_message = 'You are not allowed to access this building'
		end

		render json: ResponseHelper.json(false, nil, error_message), status: 500 unless error_message.nil?
	end

	def authenticate!
		render json: {
			success: false,
			is_authenticated: false,
			response: {
				data: nil,
				message: 'Not authenticated'
			}
		}, status: 401 unless authenticated?
	end

	def require_escalated_privileges
		render json: {
			success: false,
			is_authenticated: true,
			response: {
				data: nil,
				message: 'Unauthorised'
			}
		}, status: 403 unless current_user[:account_type] == AccountTypes::ADMIN
	end

	def pagination_params
		params.permit(:page, :records_per_page)
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
