# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_19_114638) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "admission_logs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "admission_id", null: false
    t.datetime "admit_timestamp", null: false
    t.datetime "discharge_timestamp"
    t.boolean "is_discharged"
    t.string "doctor_name", limit: 255, null: false
    t.string "purpose", limit: 255
    t.string "comment", limit: 255
    t.string "guardian_name", limit: 255, null: false
    t.string "guardian_phone", limit: 15, null: false
    t.uuid "bed_id", null: false
    t.uuid "patient_id", null: false
    t.uuid "created_by_id", null: false
    t.uuid "last_updated_by_id", null: false
    t.datetime "created_at", null: false
    t.index ["admission_id"], name: "index_admission_logs_on_admission_id"
    t.index ["bed_id"], name: "index_admission_logs_on_bed_id"
    t.index ["created_by_id"], name: "index_admission_logs_on_created_by_id"
    t.index ["last_updated_by_id"], name: "index_admission_logs_on_last_updated_by_id"
    t.index ["patient_id"], name: "index_admission_logs_on_patient_id"
  end

  create_table "admissions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "admit_timestamp", null: false
    t.datetime "discharge_timestamp"
    t.boolean "is_discharged"
    t.string "doctor_name", limit: 255, null: false
    t.string "purpose", limit: 255
    t.string "comment", limit: 255
    t.string "guardian_name", limit: 255, null: false
    t.string "guardian_phone", limit: 15
    t.uuid "bed_id", null: false
    t.uuid "patient_id", null: false
    t.uuid "created_by_id", null: false
    t.uuid "last_updated_by_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bed_id"], name: "index_admissions_on_bed_id"
    t.index ["created_by_id"], name: "index_admissions_on_created_by_id"
    t.index ["last_updated_by_id"], name: "index_admissions_on_last_updated_by_id"
    t.index ["patient_id", "admit_timestamp"], name: "index_admissions_on_patient_id_and_admit_timestamp", unique: true
    t.index ["patient_id"], name: "index_admissions_on_patient_id"
  end

  create_table "beds", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.uuid "ward_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ward_id", "name"], name: "index_beds_on_ward_id_and_name", unique: true
    t.index ["ward_id"], name: "index_beds_on_ward_id"
  end

  create_table "buildings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "branch_code", limit: 255, null: false
    t.string "name_line", limit: 255, null: false
    t.string "address_line", limit: 255, null: false
    t.string "locality", limit: 255
    t.string "city", limit: 255, null: false
    t.string "administrative_area", limit: 255, null: false
    t.string "postal_code", limit: 10, null: false
    t.string "country", limit: 3, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["branch_code"], name: "index_buildings_on_branch_code", unique: true
  end

  create_table "buildings_users", id: false, force: :cascade do |t|
    t.uuid "building_id", null: false
    t.uuid "user_id", null: false
  end

  create_table "patients", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", limit: 255, null: false
    t.string "phone", limit: 15, null: false
    t.string "gender", limit: 10
    t.datetime "dob"
    t.serial "visit_count", limit: 2, null: false
    t.decimal "amount_due", precision: 100, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name", "phone"], name: "index_patients_on_name_and_phone", unique: true
  end

  create_table "transactions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.boolean "is_credit", null: false
    t.string "payment_mode", limit: 30, null: false
    t.string "currency", limit: 4, null: false
    t.decimal "value", precision: 100, scale: 2, null: false
    t.boolean "is_settled"
    t.text "purpose"
    t.uuid "reverses_transaction_id"
    t.uuid "admission_id", null: false
    t.uuid "created_by_id"
    t.datetime "created_at", null: false
    t.index ["admission_id"], name: "index_transactions_on_admission_id"
    t.index ["created_by_id"], name: "index_transactions_on_created_by_id"
    t.index ["reverses_transaction_id"], name: "index_transactions_on_reverses_transaction_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.string "account_type", limit: 50, null: false
    t.string "image_url", limit: 255
    t.string "login_id", limit: 255, null: false
    t.string "password_digest", limit: 255, null: false
    t.boolean "is_active", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["login_id"], name: "index_users_on_login_id", unique: true
  end

  create_table "visitor_logs", id: false, force: :cascade do |t|
    t.uuid "admission_id", null: false
    t.uuid "visitor_id", null: false
    t.datetime "entry_timestamp"
    t.datetime "exit_timestamp"
    t.index ["visitor_id", "admission_id", "entry_timestamp"], name: "unique_visits", unique: true
  end

  create_table "visitors", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", limit: 255, null: false
    t.string "phone", limit: 15, null: false
    t.string "relation_with_patient", limit: 100
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name", "phone", "relation_with_patient"], name: "index_visitors_on_name_and_phone_and_relation_with_patient", unique: true
  end

  create_table "wards", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "floor", limit: 5, null: false
    t.string "ward_type", limit: 30
    t.string "ward_number", limit: 10
    t.string "name", limit: 50, null: false
    t.uuid "building_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["building_id", "ward_type", "ward_number"], name: "index_wards_on_building_id_and_ward_type_and_ward_number", unique: true
    t.index ["building_id"], name: "index_wards_on_building_id"
  end

  add_foreign_key "admission_logs", "admissions"
  add_foreign_key "admission_logs", "beds"
  add_foreign_key "admission_logs", "patients"
  add_foreign_key "admission_logs", "users", column: "created_by_id"
  add_foreign_key "admission_logs", "users", column: "last_updated_by_id"
  add_foreign_key "admissions", "beds"
  add_foreign_key "admissions", "patients"
  add_foreign_key "admissions", "users", column: "created_by_id"
  add_foreign_key "admissions", "users", column: "last_updated_by_id"
  add_foreign_key "beds", "wards"
  add_foreign_key "transactions", "admissions"
  add_foreign_key "transactions", "transactions", column: "reverses_transaction_id"
  add_foreign_key "transactions", "users", column: "created_by_id"
  add_foreign_key "wards", "buildings"
end
