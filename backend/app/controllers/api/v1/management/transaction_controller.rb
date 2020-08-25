class Api::V1::Management::TransactionController < Api::V1::BaseController

  before_action :set_service, :authorise_building_access

  def create
    response = @service.create_new_transaction(@current_user, admission_id, transaction_params)
    render json: response
  end

  def modify
    response = @service.modify_transaction(@current_user, transaction_id, transaction_params)
    render json: response
  end

  def delete
    response = @service.delete_transaction(@current_user, transaction_id)
  end

  def list_all_in_admission
    response = @service.list_all_in_admission(@current_user, admission_id)
    render json: response
  end

  private

    def set_service
      @service ||= Management::TransactionService
    end

    def admission_id
      params.permit(:admission_id)[:admission_id]
    end

    def transaction_params
      params.permit(:is_credit, :payment_mode, :value, :is_settled, :purpose)
    end

    def transaction_id
      params.permit(:transaction_id)[:transaction_id]
    end
end
