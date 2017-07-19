# Tech Support Site

## About
This is a basic website for freelance tech support using Flask with Flask Mail to email me bookings, prompting the user to provide useful information and only allowing them to submit if they enter the required information.

## Making Changes

### Template files
Jinja2 is used in this project for templating. In order to use syntax highlighting in Atom on these files, the template files are named with the extension `.html.j2`. To enable Jinja2 highlighting on these files in Atom, the [atom-jinja2](https://atom.io/packages/atom-jinja2) package will need to be installed.

### Bootstrap
A customised version of Bootstrap featuring only common CSS has been used for this project to reduce load times. To make use of Bootstrap components or jQuery plugins, a new version will need to be downloaded.

## Setup

### Deploying the Site on a DigitalOcean Droplet
For other projects, instances of Tech-Support-Site can be replaced with an appropriate project name.  
*Reference: https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps*

###### Preparing the Droplet/Server

1. Create an Ubuntu droplet or set up a machine with Ubuntu Server.

2. Open the console or an SSH terminal to connect to the droplet.

3. Update the package list:  
`sudo apt-get update`

3. Install Apache2, mod_wsgi, Python, and pip, on the droplet:  
`sudo apt-get install apache2 libapache2-mod-wsgi python-dev python-pip`

4. Enable mod_wsgi:  
`sudo a2enmod wsgi`

###### Uploading the App

1. Using FileZilla or another SFTP client, navigate to the `/var/www` directory.

2. Create a `Tech-Support-Site` folder, and then a `FlaskApp` folder within that.

3. In `/var/www/Tech-Support-Site/FlaskApp`, add the `__init__.py` file and any other files for your app.

###### Setting up the Virtual Environment

1. Install virtualenv:  
`sudo pip install virtualenv`

2. Whilst in `/var/www/Tech-Support-Site/FlaskApp`, create the virtual environment:  
`sudo virtualenv venv`

3. Activate the virtual environment:  
`source venv/bin/activate`

4. Install the dependencies for the app:  
`sudo pip install flask`  
`sudo pip install flask_mail`

###### Setting up the Virtual Host

1. Using SFTP or the terminal, navigate to  `/var/www/Tech-Support-Site` and create `tech-support-site.wsgi`.

2. Edit the file and add the following, replacing the secret key with a secret random string of characters:  
```
#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/Tech-Support-Site/")
from FlaskApp import app as application
application.secret_key = 'SECRET KEY'
```

3. Using SFTP or the terminal, navigate to `/etc/apache2/sites-available` and create `Tech-Support-Site.conf`.

4. Edit the file and add the following, replacing the server name with the Droplet IP or URL:
```
<VirtualHost *:80>
  ServerName SERVER-IP OR URL
  ServerAdmin admin@mywebsite.com
	WSGIScriptAlias / /var/www/Tech-Support-Site/tech-support-site.wsgi
	<Directory /var/www/Tech-Support-Site/FlaskApp/>
		Order allow,deny
		Allow from all
	</Directory>
	Alias /static /var/www/Tech-Support-Site/FlaskApp/static
	<Directory /var/www/Tech-Support-Site/FlaskApp/static/>
		Order allow,deny
		Allow from all
	</Directory>
	ErrorLog ${APACHE_LOG_DIR}/error.log
	LogLevel warn
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

5. Using the terminal, enable the virtual host:  
`sudo a2ensite FlaskApp`

6. Finally, restart Apache and the app should be live:  
`sudo service apache2 restart`  
