class CreatePatients < ActiveRecord::Migration[6.0]
  def up
    create_table :patients, id: :uuid do |t|
      t.column :name       , 'VARCHAR(255)', null: false
      t.column :phone      , 'VARCHAR(15)', null: false
      t.column :gender     , 'VARCHAR(10)'
      t.column :age        , 'VARCHAR(3)'
      t.column :visit_count, 'SMALLSERIAL'
      t.column :amount_due , 'NUMERIC(100, 2)'

      t.timestamps
    end
  end

  def down
    drop_table :patients
  end
end
