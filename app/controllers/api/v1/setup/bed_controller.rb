class Api::V1::Setup::BedController < Api::V1::AuthorisationController

  before_action :set_service

  def create
    response = @service.create_new_bed(ward_id,bed_params)
    render json: response
  end

  def read
    response = @service.fetch_bed_by_id(bed_id)
    render json: response
  end

  def update
    response = @service.update_existing_bed(bed_id, bed_params)
    render json: response
  end

  def delete
    response = @service.delete_existing_bed(bed_id)
    render json: response
  end

  def search
    response = @service.find_bed(building_id, ward_id, bed_params)
    render json: response
  end

  def list_all
    response = @service.fetch_all_beds(filter_params)
    render json: response
  end


  private
    def set_service
      @service ||= Setup::BedService
    end

    def bed_params
      params.permit(:code)
    end

    def bed_id
      params.permit(:id)[:id]
    end

    def ward_id
      params.permit(:ward_id)[:ward_id]
    end

    def building_id
      params.permit(:building_id)[:building_id]
    end

    def filter_params
      params.permit(:ward_id, :floor, :branch_code, :city, :postal_code)
    end
end
