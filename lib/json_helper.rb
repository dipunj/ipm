class JsonHelper

	def response(success, data, message)
		{
			success: success,
			response: {
				message: message,
				data: data
			}
		}
	end
end