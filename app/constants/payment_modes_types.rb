class PaymentModeTypes
	include Ruby::Enum

	define :CASH          , "cash"
	define :CARD          , "card"
	define :MOBILE        , "mobile"
	define :FUND_TRANSFER , "fund_transfer"
	define :CHEQUE        , "cheque"
	define :OTHER         , "other"
end