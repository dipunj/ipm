module Management
	class TransactionService

		def self.create_new_transaction(operator, admission_id, params)
			raise 'Please select a valid admission'                       if admission_id.nil?
			raise 'Please select payment type'                            if params[:is_credit].nil?
			raise 'Please enter a non zero transaction value'             if params[:value].nil? or params[:value].to_i <= 0
			raise 'Please select a payment mode'                          if params[:payment_mode].nil?
			raise 'Please select if transaction has been executed or not' if params[:is_settled].nil?

			# TODO: check if the following type conversion is required or not
			create_params = {
				admission_id:  admission_id,
				is_credit:     params[:is_credit].to_s.downcase == "true",
				value:         params[:value],
				payment_mode:  params[:payment_mode],
				purpose:       params[:purpose],
				is_settled:    params[:is_settled].to_s.downcase == "true",
				updated_by_id: operator.id
			}
			transaction = Transaction.create!(create_params)
			ResponseHelper.json(true, transaction.as_json, 'Created new transaction')
		end

		def self.transaction_logs(operator, transaction_id, pagination_params)
			records_per_page           = (pagination_params[:records_per_page] || 10).to_i
			page                       = pagination_params[:page].nil? ? 0 : (pagination_params[:page].to_i - 1)

			# TODO: Add operator role check
			raise 'Invalid Transaction' if transaction_id.blank?
			transaction = Transaction.find(transaction_id)
			raise ActiveRecord::RecordNotFound "Transaction doesn't exist" if transaction.nil?
			logs = transaction.transaction_logs
			count = logs.length
			logs = logs.order('created_at DESC').limit(records_per_page).offset(page*records_per_page)

			ResponseHelper.json(true, {page: page.to_i+1, count: count, result: logs.as_json(TransactionLog.as_json)})
		end

			Transaction.transaction do
				log_params = transaction.as_json.deep_symbolize_keys.except!(:id, :created_at, :updated_at)
				transaction.transaction_logs.create!(log_params)

				params[:updated_by_id] = operator.id
				transaction.update!(params)
			end
			ResponseHelper.json(true, transaction.as_json)
		end

		def self.compute_total(operator, admission_id, internal=false)
			transactions = Transaction.where(admission_id: admission_id, is_deleted: false).order(created_at: :asc)
			credit_txn = transactions.where(is_credit: true)
			debit_txn = transactions.where(is_credit: false)


			total_bill = credit_txn.sum(:value) - debit_txn.sum(:value)

			amount_receivable = credit_txn.where(is_settled: false).sum(:value)
			amount_payable = debit_txn.where(is_settled: false).sum(:value)

			amount_received = credit_txn.where(is_settled: true).sum(:value)
			amount_payed = debit_txn.where(is_settled: true).sum(:value)

			# amount_receivable = -1000 => client owes 1000 to customer
			# amount_received = -1000 => client has payed 1000 to customer
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

			transactions = Transaction.where(admission_id: admission_id)


			# TODO : add the following condition
			# if operator is not admin/manager
			transactions = transactions.where(is_deleted: false)


			transactions = transactions.order(created_at: :asc)
			totals = compute_total(operator, admission_id, true)

			response = {
				list: transactions.as_json(Transaction.with_data),
				totals: totals,
				admission_info: admission.as_json(Admission.with_overview_data)
			}
			return ResponseHelper.json(true, response,  nil)
		end
	end
end
