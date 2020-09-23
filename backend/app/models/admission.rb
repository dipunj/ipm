class Admission < ApplicationRecord
	belongs_to :patient
	belongs_to :bed
	belongs_to :updated_by     , class_name: 'User'

	has_one :ward, through: :bed
	has_one :building, through: :ward

	has_many :transactions
	has_many :admission_logs
	has_many :visit_logs

	has_many :visitors         , through: :visit_logs

	validates :patient_id      , uniqueness:  { scope: :admit_timestamp }
	attribute :is_discharged   , default: false


	def self.with_overview_data
		{
			except: [:comment, :patient_id, :created_at, :updated_at, :updated_by_id, :bed_id],
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

	def self.with_all_data(operator)
		if operator.account_type == AccountTypes::OPERATOR
			return {
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
					# transactions: {
					# 	except: [],
					# 	include: {
					# 		updated_by: {
					# 			only: [:id, :name]
					# 		}
					# 	}
					# },
					updated_by: {
						only: [:id, :name]
					}
				}
			}
		else
			return {
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
					# transactions: {
					# 	except: [],
					# 	include: {
					# 		updated_by: {
					# 			only: [:id, :name]
					# 		}
					# 	}
					# },
					admission_logs: {
						except: []
					},
					updated_by: {
						only: [:id, :name]
					}
				}
			}
		end
	end
end
