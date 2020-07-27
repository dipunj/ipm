class Transaction < ApplicationRecord
	belongs_to :admission
	validates :payment_mode, inclusion: PaymentModeTypes
end
