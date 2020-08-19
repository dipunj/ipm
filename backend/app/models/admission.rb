class Admission < ApplicationRecord
	belongs_to :patient
	belongs_to :bed
	belongs_to :created_by     , class_name: 'User'
	belongs_to :last_updated_by, class_name: 'User'

	has_one :ward, through: :bed
	has_many :transactions
	has_many :admission_logs
	has_many :visit_logs

	has_many :visitors         , through: :visit_logs

	validates :patient_id      , uniqueness:  { scope: :admit_timestamp }
	attribute :is_discharged   , default: false


	def self.with_overview_data
		{
			except: [:comment, :patient_id, :created_at, :updated_at, :created_by_id, :last_updated_by_id, :bed_id],
			include: {
				bed: {
					only: [:name]
				},
				ward: {
					only: [:name, :floor]
				},
				patient: {
					only: [:name, :phone]
				},
			}
		}
	end

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
				patient: {
					except: [:created_at, :updated_at]
				},
				transactions: {
					except: [],
					include: {
						created_by: {
							only: [:id, :name]
						}
					}
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
