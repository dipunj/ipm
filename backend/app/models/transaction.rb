class Transaction < ApplicationRecord

	before_update :push_to_logs

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

	private

		def push_to_logs
			log_params = self.as_json.deep_symbolize_keys.except!(:id, :created_at, :updated_at)
			self.transaction_logs.create!(log_params)
		end
end
