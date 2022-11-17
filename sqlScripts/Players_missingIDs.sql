-- https://stackoverflow.com/a/41407876/6421228
SELECT all_ids AS missing_ids
FROM generate_series((SELECT MIN("DVV_ID") FROM public."Players"), (SELECT MAX("DVV_ID") FROM public."Players")) all_ids
EXCEPT 
SELECT "DVV_ID" FROM public."Players" ORDER BY "missing_ids"