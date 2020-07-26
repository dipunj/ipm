class Building < ApplicationRecord
	has_and_belongs_to_many :users
	has_many :wards
	has_many :beds, through: :wards
	has_many :admissions, through: :wards

	has_many :transactions, through: :admissions
	has_many :patients, through: :admissions
	has_many :visitors, through: :admissions
	has_many :visit_logs, through: :admissions

	validates :branch_code, uniqueness: true

	def self.with_all_data
		{
			except: [:created_at, :updated_at],
			include: {
				wards: {
					only: [:name],
					include: {
						beds: {
							only: [:name]
						}
					}
				}
			}
		}
	end
end
