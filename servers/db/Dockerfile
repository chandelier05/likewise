# Dockerfile: this will define your new Docker image. Use the name of your RDBMSs base image in the
# FROM statement, and then COPY your schema.sql into the appropriate location within the image's file system.
FROM mysql
COPY schema.sql /docker-entrypoint-initdb.d/schema.sql