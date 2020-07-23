class Bed < ApplicationRecord
	belongs_to :ward
	has_many :admissions

	has_many :patients, through: :admissions
	has_many :visit_logs, through: :admissions
	has_many :visitors, through: :admissions

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
