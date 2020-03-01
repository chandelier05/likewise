 export MYSQL_ROOT_PASSWORD="wetnoodle"

 docker rm -f mysqldemo 
 docker network create mynetwork

 docker build -t tango222/db . 

 docker run -d \
 -p 3306:3306 \
 --network mynetwork \
 --name mysqldemo \
 -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
 -e MYSQL_DATABASE=mysqldemo \
 tango222/db
