class CreateAdmissions < ActiveRecord::Migration[6.0]
  def up
    create_table :admissions, id: :uuid do |t|
      t.datetime   :admit_timestamp      , null: false
      t.datetime   :discharge_timestamp  , null: false
      t.column     :doctor_name          , 'VARCHAR(255)', null: false
      t.column     :purpose              , 'VARCHAR(255)'
      t.column     :comment              , 'VARCHAR(255)'

      t.references :patient, type: :uuid, foreign_key: true, null: false
      t.timestamps
    end
  end

  def down
    drop_table :admissions
  end
end
