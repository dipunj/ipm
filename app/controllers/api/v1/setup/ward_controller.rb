class Api::V1::Setup::WardController < Api::V1::BaseController

  before_action :set_service, :require_escalated_privileges

  def create
    response = @service.create_new_ward(building_id,ward_params)
    render json: response
  end

  def read
    response = @service.fetch_ward_by_id(ward_id)
    render json: response
  end

  def update
    response = @service.update_existing_ward(ward_id, ward_params)
    render json: response
  end

  def delete
    response = @service.delete_existing_ward(ward_id)
    render json: response
  end

  def search
    response = @service.find_ward(building_id, ward_params)
    render json: response
  end

  def list_all
    response = @service.fetch_all_wards(filter_params)
    render json: response
  end

  def list_by_building_id
    response = @service.fetch_for_building_id(building_id)
    render json: response
  end


  private
    def set_service
      @service ||= Setup::WardService
    end

    def ward_params
      params.permit(:floor, :ward_type, :ward_number, :name)
    end

    def ward_id
      params.permit(:id)[:id]
    end

    def building_id
      params.permit(:building_id)[:building_id]
    end

    def filter_params
      params.permit(:building_id, :branch_code, :city, :postal_code)
    end
end
