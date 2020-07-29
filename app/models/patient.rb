class Patient < ApplicationRecord
	has_many :admissions

	has_many :visitors    , through: :admissions
	has_many :visit_logs  , through: :admissions
	has_many :transactions, through: :admissions

	validates :phone, uniqueness: { scope: :name }
	validates :gender, inclusion: GenderTypes.values
end
