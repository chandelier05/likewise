export TLSCERT=/etc/letsencrypt/live/info441api.all-live.me/fullchain.pem
export TLSKEY=/etc/letsencrypt/live/info441api.all-live.me/privkey.pem
export MYSQL_ROOT_PASSWORD="wetnoodle"

docker rm -f mysqldemo

docker pull tango222/db

docker run \
    -d \
    -e ADDR=:3306 \
    -p 3306:3306 \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
    -e TLSCERT=$TLSCERT \
    -e TLSKEY=$TLSKEY \
    -e MYSQL_DATABASE=mysqldemo \
    --name mysqldemo \
    tango222/db
exit