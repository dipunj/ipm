Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :management do
        get 'visitor/create'
        get 'visitor/read'
        get 'visitor/update'
        get 'visitor/delete'

		post 'transaction/create'            => 'transaction#create'
		post 'transaction/modify'            => 'transaction#modify'
		get  'transaction/list'              => 'transaction#list_all_in_admission'

		post 'admission/new'                  => 'admission#create_new_admission'
        get 'admission/find'                  => 'admission#find_admission_by_id'
		get  'admission/logs'                 => 'admission#logs'
		post 'admission/update'               => 'admission#update_admission'
        get 'admission/list'               => 'admission#list_admissions'
		post 'admission/discharge'            => 'admission#discharge'
	  end
	  namespace :setup do
        post       'building/create'       => 'building#create'
		get        'building/structure'    => 'building#find_building_by_id'
		get        'building/find'         => 'building#find'
		post       'building/update'       => 'building#update'
		post       'building/delete'       => 'building#delete'
		get        'building/list'         => 'building#list_all'
		get        'building/search'       => 'building#search'


        post       'ward/create'           => 'ward#create'
        get        'ward/read'             => 'ward#read'
        post       'ward/update'           => 'ward#update'
        post       'ward/delete'           => 'ward#delete'
        get        'ward/list'             => 'ward#list_all'
        get        'ward/list_building'    => 'ward#list_by_building_id'


		post       'bed/create'           => 'bed#create'
		get        'bed/read'             => 'bed#read'
		post       'bed/update'           => 'bed#update'
		post       'bed/delete'           => 'bed#delete'
		get        'bed/list'             => 'bed#list_all'
		get        'bed/search'           => 'bed#search'


		post       'user/create'           => 'user#create'
		get        'user/find'             => 'user#read'
		post       'user/update'           => 'user#update'
		post       'user/delete'           => 'user#delete'
		get        'user/list'             => 'user#list_all'
		get        'user/search'           => 'user#search'

		post       'user/add_building'        => 'user#add_to_building'
		post       'user/remove_building'     => 'user#remove_from_building'
		post       'user/reset'               => 'user#change_other_password'
		post       'user/toggle_state'        => 'user#toggle_account_state'

		post	  'configuration/hard_reset'     => 'configuration#hard_reset'
		post	  'configuration/soft_reset'     => 'configuration#soft_reset'

	  end
	  namespace :session do
		  post     'auth/login'            => 'auth#login'
		  post     'auth/logout'           => 'auth#logout'
		  post     'auth/reset'            => 'auth#change_password'
		  get      'auth/status'           => 'auth#is_logged_in'
		  post     'auth/theme'            => 'auth#toggle_theme'
	  end
	end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
