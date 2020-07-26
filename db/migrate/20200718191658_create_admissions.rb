class CreateAdmissions < ActiveRecord::Migration[6.0]
  def up
    create_table :admissions, id: :uuid do |t|

      t.datetime   :admit_timestamp          , null: false
      t.datetime   :discharge_timestamp

      t.boolean    :is_discharged
      t.column     :doctor_name              , 'VARCHAR(255)', null: false
      t.column     :purpose                  , 'VARCHAR(255)'
      t.column     :comment                  , 'VARCHAR(255)'

      t.column     :guardian_name            , 'VARCHAR(255)', null: false
      t.column     :guardian_phone           , 'VARCHAR(15)'

      t.references :bed                   , type: :uuid, foreign_key: true, null: false
      t.references :patient               , type: :uuid, foreign_key: true, null: false
      t.references :created_by            , type: :uuid, foreign_key: { to_table: :users }, null: false
      t.references :last_updated_by       , type: :uuid, foreign_key: { to_table: :users }, null: false

      t.timestamps
    end

    add_index :admissions, [:patient_id, :admit_timestamp], unique: true
  end

  def down
    drop_table :admissions
  end
end
