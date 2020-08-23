module Management
	class TransactionService

		def self.create_new_transaction(operator, admission_id, params)
			raise 'Please select a valid admission'               if admission_id.nil?
			raise 'Please select payment type'                    if params[:is_credit].nil?
			raise 'Please enter a non zero transaction value'     if params[:value].nil? or params[:value].to_i <= 0
			raise 'Please select a payment mode'                  if params[:payment_mode].nil?
			raise 'Please select if transaction has been settled' if params[:is_settled].nil?

			create_params = {
				admission_id:  admission_id,
				is_credit:     params[:is_credit].to_s.downcase == "true",
				currency:      params[:currency],
				value:         params[:value],
				payment_mode:  params[:payment_mode],
				purpose:       params[:purpose],
				is_settled:    params[:is_settled].to_s.downcase == "true",
				created_by_id: operator.id
			}
			transaction = Transaction.create!(create_params)
			ResponseHelper.json(true, transaction.as_json, 'Created new transaction')
		end

		def self.undo_transaction(operator, revert_id, params)

			raise 'Please select a valid transaction to revert'   if revert_id.blank?
			raise 'Please select if transaction has been settled' if params[:is_settled].blank?

			target_txn = Transaction.find_by(id: revert_id)

			if target_txn.nil?
				return ResponseHelper.json(false, nil, 'Invalid transaction id')
			else
				create_params = {
					reverses_transaction_id: target_txn.id,
					admission_id:            target_txn[:admission_id],
					is_credit:               !(target_txn[:is_credit].to_s.downcase == "true"),
					value:                   target_txn[:value],
					payment_mode:            params[:payment_mode] || target_txn[:payment_mode],
					is_settled:              params[:is_settled].to_s.downcase == "true",
					created_by_id:           operator.id
				}
				transaction   = Transaction.create!(create_params)
				return ResponseHelper.json(true, transaction.as_json, 'Reverted transaction')
			end
		end

		def self.compute_total(operator, admission_id, internal)
			transactions = Transaction.where(admission_id: admission_id).order(created_at: :asc)
			credit_txn = transactions.where(is_credit: true)
			debit_txn = transactions.where(is_credit: false)
			total_bill = credit_txn.pluck(:value) - debit_txn.pluck(:value)


			amount_receivable = credit_txn.where(is_settled: false)
			amount_payable = debit_txn.where(is_settled: false)

			amount_received = credit_txn.where(is_settled: true)
			amount_payed = debit_txn.where(is_settled: true)

			total = {
				total_bill: total_bill,
				amount_receivable: amount_receivable - amount_payable,
				amount_received: amount_received - amount_payed
			}
			return total if internal

			return ResponseHelper.json(true, total, nil)
		end

		def self.list_all_in_admission(operator, admission_id)
			admission = Admission.find_by(id: admission_id)
			raise 'Invalid admission ID' if admission.nil?

			transactions = Transaction.where(admission_id: admission_id).order(created_at: :asc)

			return ResponseHelper.json(true, transactions.as_json, nil)
		end
	end
end





