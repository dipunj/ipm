class CreateAdmissionLogs < ActiveRecord::Migration[6.0]
  def up
    create_table :admission_logs, id: :uuid do |t|
      t.references :admission, type: :uuid, foreign_key: true, null: false

      t.datetime   :admit_timestamp          , null: false
      t.datetime   :discharge_timestamp

      t.boolean    :is_discharged
      t.column     :doctor_name              , 'VARCHAR(255)', null: false
      t.column     :purpose                  , 'VARCHAR(255)'
      t.column     :comment                  , 'VARCHAR(255)'

      t.column     :patient_name             , 'VARCHAR(255)', null: false
      t.column     :patient_age              , 'VARCHAR(255)', null: false
      t.column     :patient_phone            , 'VARCHAR(255)', null: false
      t.column     :patient_gender           , 'VARCHAR(255)', null: false
      t.column     :guardian_name            , 'VARCHAR(255)', null: false
      t.column     :guardian_phone           , 'VARCHAR(15)' , null: false

      t.references :bed                   , type: :uuid, foreign_key: true, null: false
      t.references :patient               , type: :uuid, foreign_key: true, null: false
      t.references :created_by            , type: :uuid, foreign_key: { to_table: :users }, null: false
      t.references :last_updated_by       , type: :uuid, foreign_key: { to_table: :users }, null: false

      # represents the time at which a log entry was created
      t.datetime :created_at, null: false
    end
  end
end
