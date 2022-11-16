# GUIDE:
# https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04

# install nginx
sudo apt install nginx

# list the application configurations that ufw knows how to work with (ufw = uncomplicated firewall)
sudo ufw app list

# allo http traffic AND ssh connections
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'
sudo ufw allow 'OpenSSH'

# check ufw status
sudo ufw status

# if inactive?
sudo ufw enable

# check ufw status
sudo ufw status

# prints: 

# Status: active
#
# To                         Action      From
# --                         ------      ----
# OpenSSH                    ALLOW       Anywhere                  
# OpenSSH (v6)               ALLOW       Anywhere (v6)             
# Nginx HTTP                 ALLOW       Anywhere                  
# Nginx HTTPS                ALLOW       Anywhere                  
# Nginx HTTP (v6)            ALLOW       Anywhere (v6)             
# Nginx HTTPS (v6)           ALLOW       Anywhere (v6)    

# check nginx web server -> should be already active
systemctl status nginx

# visit page http://167.99.135.251/ 
# -> see nginx default page

# enable nginx to startup when system boots
sudo systemctl enable nginx

# test nginx files for syntax errors
sudo nginx -t

# restart nginx 
sudo systemctl restart nginx
