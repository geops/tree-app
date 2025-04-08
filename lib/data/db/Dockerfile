# Start from the official PostgreSQL image, which includes PostgreSQL
FROM postgres:15

ENV POSTGIS_MAJOR 3

# Install JRE and PostGIS
RUN apt-get update && \
    apt-get install -y openjdk-17-jre postgis postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR && \
    rm -rf /var/lib/apt/lists/*

# Set up a default database with PostGIS enabled
ENV POSTGRES_DB=tree
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

RUN apt-get update \
      && apt-cache showpkg postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR \
      && apt-get install -y --no-install-recommends \
      postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR \
      postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR-scripts \
      postgis wget p7zip-full rename gdal-bin \
      && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./initdb-postgis.sh /docker-entrypoint-initdb.d/postgis.sh

# # Define a default command for the container
# CMD ["postgres"]

# Set the working directory
WORKDIR /treeapp

RUN wget https://github.com/caiiiycuk/postgresql-to-sqlite/releases/download/v1.1.1/pg2sqlite-1.1.1.jar

COPY . /treeapp

