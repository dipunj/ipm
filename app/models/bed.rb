class Bed < ApplicationRecord
	belongs_to :ward
	has_many :admissions

	has_many :patients, through: :admissions
	has_many :visit_logs, through: :admissions
	has_many :visitors, through: :admissions

	validates :name, uniqueness: {
		scope: :ward_id,
		message: ->(object, data) do
			"Bed #{object.name} is already present in ward #{object.ward.name}"
		end
	}

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
