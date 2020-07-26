class Admission < ApplicationRecord
	belongs_to :patient
	belongs_to :bed


	has_many :transactions
	has_many :visit_logs

	has_many :visitors, through: :visit_logs
	has_one :created_by, class_name: 'User'
	has_one :last_updated_by, class_name: 'User'
	has_many :admission_logs

	validates :patient_id, uniqueness:  { scope: :admit_timestamp }

	def self.with_all_data
		{
			include: {
				bed: {
					only: [:name],
					include: {
						ward: {
							only: [:name],
							include: {
								building: {
									only: [:branch_code, :address_line, :postal_code]
								}
							}
						}
					}
				},
				transactions: {
					except: [:created_at]
				},
				admission_logs: {
					except: [:created_at]
				}
			}
		}
	end
end
