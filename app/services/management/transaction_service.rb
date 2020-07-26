module Management
	class TransactionService

		def self.create_new_transaction(operator, admission_id, params)
			raise 'Please select a valid admission'           if admission_id.blank?
			raise 'Please select payment type'                if params[:is_credit].blank?
			raise 'Please enter a non zero transaction value' if params[:value].blank? or params[:value].to_i <= 0
			raise 'Please select a payment mode'              if params[:payment_mode].blank?

			create_params = {
				admission_id: admission_id,
				is_credit: params[:is_credit].to_s.downcase == "true",
				currency: params[:currency],
				value: params[:value],
				payment_mode: params[:payment_mode],
				purpose: params[:purpose],
				created_by_id: operator.id
			}
			transaction = Transaction.create!(create_params)
			ResponseHelper.json(true, transaction.as_json, 'Created new transaction')
		end

		def self.undo_transaction(operator, revert_id, params)

			raise 'Please select a valid transaction to revert' if revert_id.blank?
			target_txn = Transaction.find_by(id: revert_id)

			if target_txn.nil?
				return ResponseHelper.json(false, nil, 'Invalid transaction id')
			else
				create_params = {
					reverses_transaction_id: target_txn.id,
					admission_id:            target_txn[:admission_id],
					is_credit:               !target_txn[:is_credit],
					value:                   target_txn[:value],
					payment_mode:            params[:payment_mode] || target_txn[:payment_mode],
					created_by_id:           operator.id
				}
				transaction   = Transaction.create!(create_params)
				return ResponseHelper.json(true, transaction.as_json, 'Reverted transaction')
			end
		end

		def self.list_all_in_admission(operator, admission_id)
			admission = Admission.find_by(id: admission_id)
			raise 'Invalid admission ID' if admission.nil?

			transactions = Transaction.where(admission_id: admission_id).order(created_at: :asc)

			return ResponseHelper.json(true, transactions.as_json, nil)
		end
	end
end





