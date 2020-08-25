module ResponseHelper
	def self.json(success, data, message=nil, auth=true)
		{
			success: success,
			is_authenticated: auth,
			response: {
				message: message,
				data: data
			}
		}
	end
end