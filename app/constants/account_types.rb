class AccountTypes
	include Ruby::Enum

	define :ADMIN, "admin"       # complete access
	define :MANAGER, "manager"   # only allowed to access everything in the building
	define :OPERATOR, "operator" # only allowed operator access
end
