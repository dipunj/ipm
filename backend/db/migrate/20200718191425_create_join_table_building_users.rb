class CreateJoinTableBuildingUsers < ActiveRecord::Migration[6.0]
  def up
    create_join_table :buildings, :users, column_options: {type: :uuid}
    add_index :buildings_users, [:building_id, :user_id], :unique => true
  end

  def down
    drop_join_table :buildings, :users
  end
end
