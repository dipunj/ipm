Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :management do
        get 'visitor/create'
        get 'visitor/read'
        get 'visitor/update'
        get 'visitor/delete'

        get 'transaction/create'
        get 'transaction/read'
        get 'transaction/update'
        get 'transaction/delete'

        get 'admission/create'
        get 'admission/read'
        get 'admission/update'
        get 'admission/delete'
	  end
	  namespace :setup do
        post 'building/create' => 'building#create'
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
