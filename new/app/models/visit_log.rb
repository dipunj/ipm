class VisitLog < ApplicationRecord
	belongs_to :admission
	belongs_to :visitor

	validates :visitor_id, uniqueness: { scope: [:admission_id, :entry_timestamp] }
end
