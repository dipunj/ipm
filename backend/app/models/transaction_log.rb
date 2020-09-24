class TransactionLog < ApplicationRecord
	belongs_to :main_transaction, foreign_key: 'transaction_id' ,class_name: "Transaction"
	belongs_to :updated_by     , class_name: 'User'


	def self.as_json
		{
			include: {
				updated_by: {
					only: [:id, :name]
				}
			}
		}
	end
end
