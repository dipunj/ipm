class JwtAuth

	require 'jwt'

	ALGORITHM = 'HS256'

	def self.issue(payload)
		JWT.encode(payload,
				   auth_secret,
				   ALGORITHM
		)
	end

	def self.decode(payload)
		JWT.decode(token,
				   auth_secret,
				   true,
				   { algorithm: ALGORITHM}).first
	end

	private
		def self.auth_secret
			Rails.application.secret_key_base
		end
end