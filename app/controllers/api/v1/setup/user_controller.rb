class Api::V1::Setup::UserController < Api::V1::BaseController

	before_action :set_service, :require_escalated_privileges

	def create
		response = @service.create_new_user(user_params)
		render json: response
	end

	def read
		response = @service.fetch_user_by_id(user_id)
		render json: response
	end

	def update
		response = @service.update_existing_user(user_id, user_params)
		render json: response
	end

	def delete
		response = @service.delete_existing_user(user_id)
		render json: response
	end

	def search
		response = @service.find_user(user_params)
		render json: response
	end

	def list_all
		response = @service.fetch_all_users(filter_params)
		render json: response
	end


	private
		def set_service
			@service ||= Setup::UserService
		end

		def user_params
			params.permit(:display_name, :account_type, :image_url, :login_id, :password, :password_confirmation)
		end

		def user_id
			params.permit(:id)[:id]
		end

		def building_id
			params.permit(:building_id)[:building_id]
		end

		def filter_params
			params.permit(:building_id, :code, :city, :postal_code)
		end

end
