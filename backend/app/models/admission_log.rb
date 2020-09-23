class AdmissionLog < ApplicationRecord
	belongs_to :admission

	belongs_to :bed
	belongs_to :updated_by     , class_name: 'User'

	has_one :ward, through: :bed
	has_one :building, through: :ward

	has_many :transactions
	has_many :admission_logs
	has_many :visit_logs

	has_many :visitors         , through: :visit_logs

	def self.with_all_data
		{
			include: {
				bed: {
					except: [:created_at, :updated_at],
					include: {
						ward: {
							except: [:created_at, :updated_at],
							include: {
								building: {
									except: [:created_at, :updated_at],
								}
							}
						}
					}
				},
				updated_by: {
					only: [:id, :name]
				}
			}
		}
	end
end