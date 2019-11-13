docker-compose up -d --build
sleep 9 # wait for database to be running
docker run --network=data_default --rm -v `pwd`/sql:/flyway/sql boxfuse/flyway:5-alpine -url=jdbc:postgresql://db:5432/tree -user=postgres migrate
docker-compose exec db sh -c 'bash /data/spatial/1-import.sh'
docker-compose exec db sh -c 'psql -U postgres -d tree -c "SELECT export_projections()"'
yarn run prettier --write data/**.json