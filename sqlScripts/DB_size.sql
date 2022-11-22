-- all databases size
SELECT datname, pg_size_pretty(pg_database_size(oid)) FROM pg_database ORDER  BY 1;

