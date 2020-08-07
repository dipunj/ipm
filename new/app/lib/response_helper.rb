module ResponseHelper
	def self.json(success, data, message)
		{
			success: success,
			auth: true,
			response: {
				message: message,
				data: data
			}
		}
	end
end