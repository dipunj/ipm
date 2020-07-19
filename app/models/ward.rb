class Ward < ApplicationRecord
	belongs_to :building
	has_many :beds
end
