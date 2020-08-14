class Api::V1::Management::AdmissionController < Api::V1::BaseController

  before_action :set_service, :authorise_building_access

  def create_new_admission
    response = @service.initiate_new_admission(@current_user, admission_params, patient_params)
    render json: response
  end

  def find_admission_by_id
    response = @service.find_admission_by_id(@current_user, admission_id)
    render json: response
  end

  def update_admission
    response = @service.update_admission(@current_user, admission_id, admission_params)
    render json: response
  end

  def list_current_admissions
    response = @service.list_current_admissions(@current_user, building_id, pagination_params, search_params)
    render json: response
  end

  def search
    response = @service.search_admissions(@current_user, search_params)
    render json: response
  end


  private

    def set_service
      @service ||= Management::AdmissionService
    end

    def admission_id
      params.permit(:admission_id)[:admission_id]
    end

    def building_id
      cookies[:_ipm_sb]
    end

    def pagination_params
      params.permit(:page, :records_per_page)
    end

    def admission_params
      params.permit(:admit_timestamp, :discharge_timestamp, :doctor_name,:purpose,:comment, :bed_id, :guardian_name, :guardian_phone)
    end

    def patient_params
      params.permit(:name, :phone, :gender, :dob)
    end

    def search_params
      params.permit(:query)
    end
end
