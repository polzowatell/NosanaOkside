ver="1.17.5"
cd ~
wget --inet4-only "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> ~/.profile
source ~/.profile
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> /home/masa/.profile
