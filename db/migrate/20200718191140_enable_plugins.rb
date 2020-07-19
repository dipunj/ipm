class EnablePlugins < ActiveRecord::Migration[6.0]
  def up
    enable_extension 'pgcrypto'
  end
end
