# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Setup::UserService.create_new_user({
									   display_name: 'System Admin',
									   account_type: AccountTypes::ADMIN,
									   login_id: 'admin',
									   password: 'admin',
									   password_confirmation: 'admin'
								   })