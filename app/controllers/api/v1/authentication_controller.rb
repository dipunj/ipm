class Api::V1::AuthenticationController < ApplicationController

	before_action :authenticate_user!

	def current_user
		@current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
	end

	def authenticate_user!

	end

end
