class CreateTransactions < ActiveRecord::Migration[6.0]
  def up
    create_table :transactions, id: :uuid do |t|

      t.boolean    :is_credit                             , null: false
      t.column     :payment_mode        , 'VARCHAR(30)'   , null: false
      t.column     :value               , 'NUMERIC(100,2)', null: false
      t.text       :purpose
      t.references :reverses_transaction, type: :uuid, foreign_key: { to_table: :transactions }
      t.references :admission           , type: :uuid, foreign_key: true, null: false
      t.references :created_by          , type: :uuid, foreign_key: { to_table: :users }

      t.datetime :created_at, null: false
    end
  end

  def down
    drop_table :transactions
  end
end
