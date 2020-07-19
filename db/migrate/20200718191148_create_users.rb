class CreateUsers < ActiveRecord::Migration[6.0]
  def up
    create_table :users, id: :uuid do |t|
      t.column :name        , 'VARCHAR(50)',  null: false
      t.column :account_type, 'VARCHAR(50)',  null: false
      t.column :image_url   , 'VARCHAR(255)'
      t.string :password    , 'VARCHAR(255)', null: false

      t.timestamps
    end
  end

  def down
    drop_table :users
  end
end
