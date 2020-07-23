class Bed < ApplicationRecord
	belongs_to :ward

	def self.with_all_data
		{
			only: [:id, :name],
			include: { ward: {
				only: [:name],
				include: {
					building: {
						only: [:code, :city]
					}
				}
			}}
		}
	end

	def self.only
		{
			except: [:created_at, :updated_at]
		}
	end
end
