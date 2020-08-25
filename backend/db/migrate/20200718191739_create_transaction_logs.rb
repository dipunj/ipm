class CreateTransactionLogs < ActiveRecord::Migration[6.0]
  def up
    create_table :transaction_logs, id: :uuid do |t|

      t.boolean    :is_deleted
      t.boolean    :is_credit
      t.column     :payment_mode        , 'VARCHAR(30)'
      t.column     :currency            , 'VARCHAR(4)'
      t.column     :value               , 'NUMERIC(100,2)'
      t.boolean    :is_settled
      t.text       :purpose
      t.references :admission           , type: :uuid, foreign_key: true, null: false
      t.references :updated_by    , type: :uuid, foreign_key: { to_table: :users }, null: false


      t.references :transaction        , type: :uuid, foreign_key: { to_table: :transactions }, null: false
      t.datetime   :created_at          , null: false
    end
  end
end
