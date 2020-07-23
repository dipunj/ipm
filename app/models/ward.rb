class Ward < ApplicationRecord
	belongs_to :building
	has_many :beds

	def self.admin_view
		{
			only: [:id, :name],
			include: {
				beds: {
					only: [:name]
				},
				building: {
					only: [:branch_code, :city]
				}
			}
		}
	end
end
