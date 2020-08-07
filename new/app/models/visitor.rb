class Visitor < ApplicationRecord
	has_many :visit_logs

	validates :phone, uniqueness: { scope: [:name, :relation_with_patient] }
end
