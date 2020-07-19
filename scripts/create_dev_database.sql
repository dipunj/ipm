DROP DATABASE IF EXISTS ipm_development;
DO $$
BEGIN
    CREATE USER ipm_user WITH PASSWORD 'ipm_password';
    EXCEPTION WHEN DUPLICATE_OBJECT THEN
    RAISE NOTICE 'ipm_user already exists. Not creating it.';
END
$$;

CREATE DATABASE ipm_development WITH OWNER = ipm_user;
