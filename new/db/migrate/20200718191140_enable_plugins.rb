class EnablePlugins < ActiveRecord::Migration[5.0]
  def up
    enable_extension 'uuid-ossp'
    # enable_extension 'pgcrypto'
  end
end
