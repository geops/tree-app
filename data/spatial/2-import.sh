psql -d tree -U postgres -C "TRUNCATE vegetationshhenstufen_1995 RESTART IDENTITY"
shp2pgsql -a -s 2056 "vegetationshoehenstufen_1995/vegetationshoehenstufen_1995.shp" | psql -d tree -U postgres

