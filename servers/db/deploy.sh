./build.sh

docker push tango222/db

ssh -i "~/.ssh/key441.pem" ec2-user@info441api.all-live.me < ./update.sh