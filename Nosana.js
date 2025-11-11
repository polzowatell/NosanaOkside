Установка Masa node
базовые требования к серверу 2 CPU/4 GB RAM/80 GB HDD

Устанавливаем ubuntu 20.04 LTS Server (в минимальном текстовом режиме)
Обновляем Ubuntu
sudo apt-get update && sudo apt-get upgrade -y

Тут опционально следует тюнинг системы (вынесен ниже по тексту)
Устанавливаем полезные пакеты
sudo apt install apt-transport-https net-tools git mc sysstat atop curl tar wget clang pkg-config libssl-dev jq build-essential make ncdu -y

Создадим пользователя
addgroup p2p 
adduser masa --ingroup p2p --disabled-password --disabled-login --shell /usr/sbin/nologin --gecos ""
Install GO 1.17.5
ver="1.17.5"
cd ~
wget --inet4-only "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> ~/.profile
source ~/.profile
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> /home/masa/.profile
Устанавливаем ноду
sudo su masa -s /bin/bash
cd ~
source ~/.profile

git clone https://github.com/masa-finance/masa-node-v1.0
cd masa-node-v1.0/src
make all
exit
sudo cp /home/masa/masa-node-v1.0/src/build/bin/* /usr/local/bin
Init masa-node
sudo su masa -s /bin/bash
cd ~
source ~/.profile
cd $HOME/masa-node-v1.0
geth --datadir data init ./network/testnet/genesis.json
exit
создаем сервис (сменить my-node на уникальное, не использовать пробел < > |)
sudo -i
NODE_NAME="Измени-имя_ноды"
sudo tee /etc/systemd/system/masad.service > /dev/null <<EOF
[Unit]
Description=MASA
After=network.target
[Service]
Type=simple
User=masa
ExecStart=/usr/local/bin/geth --identity ${NODE_NAME} --datadir /home/masa/masa-node-v1.0/data --bootnodes enode://91a3c3d5e76b0acf05d9abddee959f1bcbc7c91537d2629288a9edd7a3df90acaa46ffba0e0e5d49a20598e0960ac458d76eb8fa92a1d64938c0a3a3d60f8be4@54.158.188.182:21000,enode://571be7fe060b183037db29f8fe08e4fed6e87fbb6e7bc24bc34e562adf09e29e06067be14e8b8f0f2581966f3424325e5093daae2f6afde0b5d334c2cd104c79@142.132.135.228:21000,enode://269ecefca0b4cd09bf959c2029b2c2caf76b34289eb6717d735ce4ca49fbafa91de8182dd701171739a8eaa5d043dcae16aee212fe5fadf9ed8fa6a24a56951c@65.108.72.177:21000 --emitcheckpoints --istanbul.blockperiod 1 --mine --miner.threads 1 --syncmode full --verbosity 4 --networkid 190250 --rpc --rpccorsdomain "*" --rpcvhosts "*" --rpcaddr 127.0.0.1 --rpcport 8545 --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,istanbul --port 30300 
Restart=on-failure
RestartSec=10
LimitNOFILE=4096
Environment="PRIVATE_CONFIG=ignore"
[Install]
WantedBy=multi-user.target
EOF
exit

