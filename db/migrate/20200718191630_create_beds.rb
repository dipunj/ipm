class CreateBeds < ActiveRecord::Migration[6.0]
  def up
    create_table :beds, id: :uuid do |t|
      t.column :code, 'VARCHAR(50)', null: false
      t.references :ward, type: :uuid, foreign_key: true
      t.timestamps
    end
  end

  def down
    drop_table :beds
  end
end
