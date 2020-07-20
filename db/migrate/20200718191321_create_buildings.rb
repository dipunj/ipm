class CreateBuildings < ActiveRecord::Migration[6.0]
  def up
    create_table :buildings, id: :uuid do |t|

      # branch code
      t.column :code               , 'VARCHAR(255)', null: false
      # first line of address
      t.column :name_line          , 'VARCHAR(255)', null: false
      # second line of address
      t.column :address_line       , 'VARCHAR(255)', null: false
      # street name
      t.column :locality           , 'VARCHAR(255)'
      # city/district
      t.column :city               , 'VARCHAR(255)', null: false
      # state/province/region
      t.column :administrative_area, 'VARCHAR(255)', null: false
      t.column :postal_code        , 'VARCHAR(10)' , null: false
      # ISO code
      t.column :country            , 'VARCHAR(3)'  , null: false

      t.timestamps
    end

    add_index :buildings, [:code], :unique => true
  end

  def down
    drop_table :buildings
  end
end
