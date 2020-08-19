class Transaction < ApplicationRecord
	belongs_to :admission
	validates :payment_mode, inclusion: PaymentModeTypes.values
	belongs_to :created_by     , class_name: 'User'
end
