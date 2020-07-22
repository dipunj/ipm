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
        post       'building/create'       => 'building#create'
		get        'building/read'         => 'building#read'
		post       'building/update'       => 'building#update'
		post       'building/delete'       => 'building#delete'
		get        'building/list'         => 'building#list_all'
		get        'building/search'       => 'building#search'


        post       'ward/create'           => 'ward#create'
        get        'ward/read'             => 'ward#read'
        post       'ward/update'           => 'ward#update'
        post       'ward/delete'           => 'ward#delete'
        get        'ward/list'             => 'ward#list_all'
        get        'ward/search'           => 'ward#search'


		post       'bed/create'           => 'bed#create'
		get        'bed/read'             => 'bed#read'
		post       'bed/update'           => 'bed#update'
		post       'bed/delete'           => 'bed#delete'
		get        'bed/list'             => 'bed#list_all'
		get        'bed/search'           => 'bed#search'


		post       'user/create'           => 'user#create'
		get        'user/read'             => 'user#read'
		post       'user/update'           => 'user#update'
		post       'user/delete'           => 'user#delete'
		get        'user/list'             => 'user#list_all'
		get        'user/search'           => 'user#search'
	  end
	  namespace :session do
		  post     'auth/login'            => 'auth#login'
		  post     'auth/logout'           => 'auth#logout'
		  post     'auth/reset'            => 'auth#change_password'
	  end
	end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
