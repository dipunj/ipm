class Admission < ApplicationRecord
	belongs_to :patient
	belongs_to :bed
	belongs_to :created_by     , class_name: 'User'
	belongs_to :last_updated_by, class_name: 'User'

	has_many :transactions
	has_many :admission_logs
	has_many :visit_logs

	has_many :visitors         , through: :visit_logs

	validates :patient_id      , uniqueness:  { scope: :admit_timestamp }
	attribute :is_discharged   , default: false



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
					except: []
				},
				created_by: {
					only: [:id, :name]
				},
				last_updated_by: {
					only: [:id, :name]
				}
			}
		}
	end
end
