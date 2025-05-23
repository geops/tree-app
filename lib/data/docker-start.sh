rm -rf export/*
docker-compose up -d --build
sleep 10 # wait for database to be running
node ./ecogram/process.mjs
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/import_data.sql'
docker-compose exec db sh -c 'bash /data/spatial/1-import.sh'
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/export_projections.sql'
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/export_types.sql'
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/lu_export_types.sql'
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/bl_export_types.sql'
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/so_export_types.sql'
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/export_vegetation.sql'
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/export_recommendations.sql'
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/export_locations.sql'
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/export_ecograms.sql'
docker-compose exec db sh -c 'psql -U postgres -d tree -a -f /data/sql/export_spatial.sql'
# docker-compose exec db sh -c "pg_dump tree -t '*\_export' -U postgres > /data/export/tree.dump"
docker-compose exec db sh -c "pg_dump tree -n export -U postgres > /data/export/tree.dump"
docker-compose exec db sh -c "sed 's/export\.//' -i ./pg2sqlite/tree.dump" # Very hacky but unfortunately necessary https://github.com/caiiiycuk/postgresql-to-sqlite?tab=readme-ov-file#tips
docker-compose exec db sh -c 'java -jar pg2sqlite-1.1.1.jar -d ./pg2sqlite/tree.dump -o ./pg2sqlite/tree.sqlite -f true'
cp export/tree.sqlite ../../public/data/tree.sqlite