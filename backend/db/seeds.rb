# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


## system admin user

admin_params = {
	name: 'System Admin',
	account_type: AccountTypes::ADMIN,
	login_id: 'admin',
	password: 'admin',
	password_confirmation: 'admin'
}

## FIRST BUILDLING

building_list = [
	{
		branch_code:"0001",
		name_line:"First Hospital",
		address_line: "Bisrat Road",
		city: "shahjahanpur",
		administrative_area:"uttar pradesh",
		postal_code:"242001",
		country:"IN"
	} ,
	{
		branch_code:"0002",
		name_line:"Second Hospital",
		address_line: "Hazratganj",
		city: "Lucknow",
		administrative_area:"Uttar Pradesh",
		postal_code:"226001",
		country:"IN"
	}
]

ward_list = [
	{
		floor: 1,
		ward_type: 'Private',
		ward_number: 1
	},
	{
		floor: 2,
		ward_type: 'Private',
		ward_number: 2
	},
	{
		floor: 1,
		ward_type: 'luxury',
		ward_number: 1
	}
]

bed_list = [
	{
		name: 'B1'
	},
	{
		name: 'B2'
	}
]

dummy_patients = [
	{
		patient_params: {
			name: 'Thor',
			phone: '0123456789',
			gender: 'male',
			age: 28
		},
		admission_params: {
			doctor_name: 'Dr. Strange',
			purpose: 'Lost an eye, during a fight with sister',
			comment: 'voltmeter reading is high on Thor',
			guardian_name: 'hulk',
			guardian_phone: '0000255005'
		}
	},
	{
		patient_params: {
			name: 'Tony Stark',
			phone: '0255000000',
			gender: 'male',
			age: 27
		},
		admission_params: {
			doctor_name: 'multiple',
			purpose: 'Heart Surgery',
			guardian_name: 'Pepper Potts',
			guardian_phone: '1594872630'
		}
	},
	{
		patient_params: {
			name: 'Clint Barton',
			phone: '1234567888',
			gender: 'male',
			age: 32
		},
		admission_params: {
			doctor_name: 'Dr. Banner',
			purpose: "Thor's brother hypnotised him using a blue cube, feels a like shit",
			guardian_name: 'Natasha Romanoff',
			guardian_phone: nil,
		}
	}
]

dummy_transactions = [
	{
		is_credit: true,
		is_settled: true,
		payment_mode: 'fund_transfer',
		currency: 'INR',
		value: 11000000000.25,
		purpose: 'Security Deposit'
	},
	{
		is_credit: true,
		is_settled: true,
		payment_mode: 'cash',
		currency: 'INR',
		value: 2000,
		purpose: 'Consultancy Fee'
	},
	{
		is_credit: true,
		is_settled: false,
		payment_mode: 'card',
		currency: 'INR',
		value: '3000',
		purpose: 'Anti-insanity injection vile'
	}
]

admin_hash = Setup::UserService.create_new_user(admin_params)
admin = User.find_by(id: admin_hash[:response][:data][:id])
building_ids = []
ward_ids = []
bed_ids = []
admission_ids = []
patient_ids = []

building_list.each { |building_params|
	building = Setup::BuildingService.create_new_building(building_params)
	building_ids << building[:response][:data][:id]

	ward_list.each { |ward_params|
		ward = Setup::WardService.create_new_ward(building[:response][:data][:id], ward_params)
		ward_ids << ward[:response][:data][:id]

		bed_list.each { |bed_params|
			bed = Setup::BedService.create_new_bed(ward[:response][:data][:id], bed_params)
			bed_ids << bed[:response][:data][:id]
		}
	}
}

admin.buildings << Building.all

dummy_patients.each_with_index do |params, idx|
	params[:admission_params].merge!({bed_id: bed_ids[idx]})
	admission = Management::AdmissionService.initiate_new_admission(admin, params[:admission_params], params[:patient_params])
	admission_ids << admission[:response][:data]["id"]
end

dummy_transactions.each do |txn|
	admission_ids.each { |admission_id|
		transactions = Management::TransactionService.create_new_transaction(admin, admission_id, txn)
	}
end