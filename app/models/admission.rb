class Admission < ApplicationRecord
	belongs_to :patient
	belongs_to :building
	has_many :transactions
	has_many :visit_logs
	has_many :visitors, through: :visit_logs
end
