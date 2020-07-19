class CreateTransactions < ActiveRecord::Migration[6.0]
  def up
    create_table :transactions, id: :uuid do |t|

      t.column :category           , 'VARCHAR(20)'   , null: false
      t.column :mode               , 'VARCHAR(30)'   , null: false
      t.column :value              , 'NUMERIC(100,2)', null: false

      t.references :admission      , type: :uuid, foreign_key: true, null: false
      t.references :created_by     , type: :uuid, foreign_key: { to_table: :users }
      t.references :last_updated_by, type: :uuid, foreign_key: { to_table: :users }

      t.timestamps
    end
  end

  def down
    drop_table :transactions
  end
end
