class CreateWards < ActiveRecord::Migration[5.0]
  def change
    create_table :wards, id: :uuid do |t|

      t.column :floor               , 'VARCHAR(5)',  null: false
      t.column :ward_type           , 'VARCHAR(30)'
      t.column :ward_number         , 'VARCHAR(10)'

      # fall back if the above three are not supplied by user
      # human readable nickname for the room
      t.column :name                , 'VARCHAR(50)', null: false

      t.references :building, type: :uuid, foreign_key: true

      t.timestamps
    end

    add_index :wards, [:building_id, :ward_type, :ward_number], unique: true
  end

  def down
    drop_table :wards
  end
end
