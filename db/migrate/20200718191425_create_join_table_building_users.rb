class CreateJoinTableBuildingUsers < ActiveRecord::Migration[6.0]
  def up
    create_join_table :buildings, :users, column_options: {type: :uuid}
  end

  def down
    drop_join_table :buildings, :users
  end
end
