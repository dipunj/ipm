class CreateVisitLogs < ActiveRecord::Migration[6.0]
  def up
    create_join_table :admissions, :visitors, table_name: :visitor_logs, id: :uuid, column_options: {type: :uuid} do |t|
      t.datetime :entry_timestamp
      t.datetime :exit_timestamp
    end
  end
end
