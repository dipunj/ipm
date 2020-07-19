class Building < ApplicationRecord
	has_and_belongs_to_many :users
	has_many :wards
	has_many :admissions
end
