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


	def add_to_building
		response = @service.add_user_to_building(@current_user, user_id, building_params)
		render json: response
	end

	def remove_from_building
		response = @service.remove_user_from_building(@current_user, user_id, building_params)
		render json: response
	end

	def change_other_password
		response = @service.change_other_user_password(@current_user, user_id, password_params)
		render json: response
	end

	def toggle_account_state
		response = @service.toggle_user_account_status(@current_user, user_id)
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

		def building_params
			params.permit(:building_id_list => [])
		end

		def filter_params
			params.permit(:building_id, :code, :city, :postal_code)
		end

		def password_params
			params.permit(:password, :password_confirmation)
		end

end
