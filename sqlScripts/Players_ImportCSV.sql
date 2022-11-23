\copy "Players"("DVV_ID", "First_Name", "Last_Name", "Club", "createdAt")
FROM '~/repos/1_private/beachStats/src/db/data/players_export.csv'
DELIMITER ','
CSV HEADER;