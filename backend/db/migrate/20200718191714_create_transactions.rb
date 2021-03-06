class CreateTransactions < ActiveRecord::Migration[6.0]
  def up
    create_table   :transactions , id: :uuid do |t|

      t.boolean    :is_deleted
      t.boolean    :is_credit                      , null: false
      t.column     :payment_mode , 'VARCHAR(30)'   , null: false
      t.column     :currency     , 'VARCHAR(4)'    , null: false
      t.column     :value        , 'NUMERIC(100,2)', null: false
      t.boolean    :is_settled
      t.text       :purpose
      t.references :admission    , type: :uuid, foreign_key: true, null: false
      t.references :updated_by, type: :uuid, foreign_key: { to_table: :users }, null: false

      t.timestamps
    end


  end

  def down
    drop_table :transactions
  end
end
