class Ward < ApplicationRecord
	belongs_to :building
	has_many :beds
	has_many :admissions, through: :beds
	has_many :visit_logs, through: :admissions

	validates :ward_number, uniqueness: {
		scope: [:ward_type, :building_id],
		message: ->(object, data) do
			"#{object.name} already present in branch #{object.building.branch_code}"
		end
	}

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
