class Transaction < ApplicationRecord
	belongs_to :admission
	validates :payment_mode, inclusion: PaymentModeTypes.values
	belongs_to :updated_by     , class_name: 'User'

	has_many :transaction_logs
	attribute :currency, default: ENV["CURRENCY"] || "INR"
	attribute :is_deleted, default: false


	def self.with_data
		{
			include: {
				updated_by: {
					only: [:id, :name]
				}
			}
		}
	end
end
