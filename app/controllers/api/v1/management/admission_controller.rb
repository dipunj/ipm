class Api::V1::Management::AdmissionController < Api::V1::BaseController

  before_action :set_service

  def initiate_new_admission
    response = @service.initiate_new_admission(@current_user, admission_params, patient_params)
    render json: response
  end

  def list_current_admissions

  end

  def find_admission_by_id
    response = @service.find_admission_by_id(@current_user, admission_id)
    render json: response
  end

  def update_admission
    response = @service.update_admission(@current_user, admission_id, admission_params, patient_params)
    render json: response
  end

  def list_all_admissions

  end


  private

    def set_service
      @service ||= Management::AdmissionService
    end

    def admission_id
      params.permit(:admission_id)[:admission_id]
    end

    def admission_params
      params.permit(:doctor_name,:purpose,:comment, :bed_id, :guardian_name, :guardian_phone)
    end

    def patient_params
      params.permit(:name, :phone, :gender, :age)
    end
end
