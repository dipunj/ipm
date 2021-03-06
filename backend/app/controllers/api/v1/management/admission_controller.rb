class Api::V1::Management::AdmissionController < Api::V1::BaseController

  before_action :set_service, :authorise_building_access
  # before_action: :admission_belongingness

  def create_new_admission
    response = @service.initiate_new_admission(@current_user, admission_params, patient_params)
    render json: response
  end

  def find_admission_by_id
    response = @service.find_admission_by_id(@current_user, admission_id)
    render json: response
  end

  def logs
    response = @service.admission_logs(@current_user, admission_id, pagination_params)
    render json: response
  end

  def update_admission
    response = @service.update_admission(@current_user, admission_id, admission_params, patient_id, patient_params)
    render json: response
  end

  def list_admissions
    response = @service.list_admissions(@current_user, building_id, pagination_params, search_params)
    render json: response
  end

  def search
    response = @service.search_admissions(@current_user, search_params)
    render json: response
  end

  def discharge
    response = @service.discharge_admission(@current_user, admission_id, discharge_params)
    render json: response
  end


  private

    def set_service
      @service ||= Management::AdmissionService
    end

    def admission_id
      params.permit(:admission_id)[:admission_id]
    end

    def patient_id
      params.permit(:patient_id)[:patient_id]
    end

    def building_id
      cookies[:_ipm_sb]
    end

    def admission_params
      params.permit(:admit_timestamp, :discharge_timestamp, :doctor_name,:purpose,:comment, :bed_id, :guardian_name, :guardian_phone)
    end

    def discharge_params
      params.permit(:discharge_timestamp, :undo_discharge)
    end

    def patient_params
      params.permit(:name, :phone, :gender, :age)
    end

    def search_params
      params.permit(:query, :is_discharged, :from_date, :to_date)
    end
end
