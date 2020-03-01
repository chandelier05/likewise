docker network create mynetwork

docker run -d -p 6379:6379 --name redisServer --network mynetwork redis

