class VisitLog < ApplicationRecord
	belongs_to :admission
	belongs_to :visitor
end
