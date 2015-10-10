# Setup

@Mac

Add route to local docker host VM to allow you to access content within the docker machines you create that will exist on the `172.17.x.x` subnet

```
sudo route -n add 172.17.0.0/16 `docker-machine ip default`
```

# @Mac - setup AWS tools locally

```bash
# Requires Python
# Run as sudo
pip install awscli
```
# @Mac - Connect to device

```bash
 ssh -i ~/Dropbox/aws1.pem ec2-user@ec2-52-30-36-18.eu-west-1.compute.amazonaws.com
```

# @EC2 device
```bash
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
exit
```

Re-login to capture user group settings

# @EC2
```bash
docker info
```
