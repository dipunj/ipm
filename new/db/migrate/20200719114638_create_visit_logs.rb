class CreateVisitLogs < ActiveRecord::Migration[5.0]
  def up
    create_join_table :admissions, :visitors, table_name: :visitor_logs, id: :uuid, column_options: {type: :uuid} do |t|
      t.datetime :entry_timestamp
      t.datetime :exit_timestamp
    end

    add_index :visitor_logs, [:visitor_id, :admission_id, :entry_timestamp], unique: true, name: 'unique_visits'
  end
end
