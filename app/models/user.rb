class User < ApplicationRecord
	has_secure_password
	has_and_belongs_to_many :buildings

	def as_json(options = {})
		super(options.merge!({except: [:password_digest]}))
	end

	def self.with_all_data
		{
			include: {
				buildings: {
					only: [:branch_code, :city]
				}
			}
		}
	end
end
