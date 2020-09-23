class Admission < ApplicationRecord

	before_update :push_to_log

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


	private


		def push_to_log
			log_params = self.as_json.deep_symbolize_keys.except(:id, :created_at, :updated_at)
			log_params[:patient_name] = self.patient[:name]
			log_params[:patient_phone] = self.patient[:phone]
			log_params[:patient_gender] = self.patient[:gender]
			log_params[:patient_yob] = self.patient[:yob]
			self.admission_logs.create!(log_params)
		end
end
