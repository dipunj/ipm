class CreateBeds < ActiveRecord::Migration[5.0]
  def up
    create_table :beds, id: :uuid do |t|
      t.column :name    , 'VARCHAR(50)', null: false
      t.references :ward, type: :uuid, foreign_key: true
      t.timestamps
    end

    add_index :beds, [:ward_id, :name], unique: true
  end

  def down
    drop_table :beds
  end
end
