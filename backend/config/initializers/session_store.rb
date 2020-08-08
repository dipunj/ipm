Rails.application.config.session_store :cookie_store,
									   key: '_ipm_api',
									   expires: 1.hours,
									   domain: 'localhost'