class CreateVisitors < ActiveRecord::Migration[6.0]
  def up
    create_table :visitors, id: :uuid do |t|
      t.column :name                 , 'VARCHAR(255)', null: false
      t.column :phone                , 'VARCHAR(15)' , null: false
      t.column :relation_with_patient, 'VARCHAR(100)'

      t.timestamps
    end
  end

  def down
    drop_table :visitors
  end
end
