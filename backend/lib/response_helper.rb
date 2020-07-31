module ResponseHelper
	def self.json(success, data, message)
		{
			success: success,
			response: {
				message: message,
				data: data
			}
		}
	end
end