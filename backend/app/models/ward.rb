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
					only: [:id, :name]
				},
				building: {
					only: [:id, :branch_code, :city]
				}
			}
		}
	end

	def self.with_beds
		{
			except: [:created_at, :updated_at],
			include: {
				beds: {
					only: [:id, :name]
				}
			}
		}
	end
end
