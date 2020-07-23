class Building < ApplicationRecord
	has_and_belongs_to_many :users
	has_many :wards
	has_many :admissions
	has_many :beds, through: :wards

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
