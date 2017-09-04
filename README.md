# Tech Support Site

## About
This is a basic website for freelance tech support using Flask with Flask Mail to email me bookings, prompting the user to provide useful information and only allowing them to submit if they enter the required information.

## Making Changes

### Template files
Jinja2 is used in this project for templating. In order to use syntax highlighting in Atom on these files, the template files are named with the extension `.html.j2`. To enable Jinja2 highlighting on these files in Atom, the [atom-jinja2](https://atom.io/packages/atom-jinja2) package will need to be installed.

### Bootstrap
A customised version of Bootstrap featuring only common CSS has been used for this project to reduce load times. To make use of Bootstrap components or jQuery plugins, a new version will need to be downloaded.

### Icons
The icons, including the favicon for this site, were generated using [Real Favicon Generator](https://realfavicongenerator.net/).

## Setup

### Configuring the Site
In this example, I'm using Gmail for the mail server. However, free email services like Gmail usually have restrictions in place to limit the frequency at which the account can be used the send emails, so it's recommended that you setup your own mail server or pay for a service without restrictions. If you do want to use Gmail though and you have two step authentication, you can set up an app password which you can use for Flask-Mail.

###### Creating the Config File

1. In the same folder as `__init__.py`, create a file named config.py.

2. In the config.py file, add the following:
```
import os

class BaseConfig(object):
    # Flask
    DEBUG = False
    ALLOWED_EXTENSIONS = set(['txt', 'png', 'jpg', 'jpeg'])

    # Flask Mail
    MAIL_SERVER = "Email Server"
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = "Mail Account Username"
    MAIL_PASSWORD = "Mail Account Password"
    MAIL_DEFAULT_SENDER = "Default Sending Address"

    # App Settings
    BOOKING_EMAIL_TARGET = "Your Bookings Email"

    # Recaptcha
    RECAPTCHA_SITE_KEY = "Your Site Key"
    RECAPTCHA_SECRET_KEY = "Your Secret Key"
    RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
```

3. Under `# Flask Mail`, replacing the variables with the appropriate configuration for the mail server you are using. In this example I'm using environment variables to keep the account credentials separate from the app, I cover how to set an environment variable on Ubuntu below.
```
# Flask Mail
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 465
MAIL_USE_SSL = True
MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
MAIL_DEFAULT_SENDER = os.environ.get('MAIL_USERNAME')
```

4. Under `# App Settings`, change the `BOOKING_EMAIL_TARGET` variable to the email you would like your emails to be sent to.
```
# App Settings
BOOKING_EMAIL_TARGET = "Bookings@email.com"
```

5. Get your reCAPTCHA API keys from Google by going [here](https://www.google.com/recaptcha/admin) and clicking `Get reCAPTCHA`.

6. Under `# Recaptcha`, edit the `RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` variables to match the ones generated by Google.
```
# Recaptcha
RECAPTCHA_SITE_KEY = "Your Site Key"
RECAPTCHA_SECRET_KEY = "Your Secret Key"
RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
```
7. Save your edited config file.

###### Setting an Environment Variable on Ubuntu

1. Navigate to `/etc/`.

2. Edit the environment file and add your environment variables as new lines, like so:
```
MAIL_USERNAME="username123@mail.com"
MAIL_PASSWORD="password123"
```

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

3. In `/var/www/Tech-Support-Site/FlaskApp`, add the `__init__.py` file and any other files for the app.

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

### Connecting a Domain
These instructions continue on from the work done in 'Deploying the Site on a DigitalOcean Droplet'.

###### Setup with the Domain Registrar

1. Register a domain.

2. Set the custom name servers to the following:  
```
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com
```

###### Setup Digital Ocean

1. Go to the DigitalOcean dashboard.

2. Under the Networking tab, add the domain.

###### Setup Apache

1. Using SFTP or the terminal, navigate to `/etc/apache2/sites-available` and open `Tech-Support-Site.conf` for editing.

2. On the second line of the file, replace the server IP with the new domain, including `www.`, like so:  
```
<VirtualHost *:80>
  ServerName www.mydomain.co.uk
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

3. In the same file, add the following, replacing mydomain.co.uk with the domain:  
```
<VirtualHost *:80>
    ServerName mydomain.co.uk
    Redirect permanent / https://www.mydomain.co.uk/
</VirtualHost>
```

4. Restart Apache:  
`sudo service apache2 restart`

5. Test the site by going to the domain. Make sure you try it with and without `www.` to ensure it redirects properly.

### Setting up Apache for HTTPS with Certbot and Let's Encrypt
These instructions continue on from the work done in 'Deploying the Site on a DigitalOcean Droplet' and 'Connecting a Domain'.

###### Installing Certbot

1. Add the certbot repository:  
`sudo add-apt-repository ppa:certbot/certbot`

2. Update the package list:  
`sudo apt-get update`

3. Install certbot:  
`sudo apt-get install python-certbot-apache`  

###### Setup Certbot

1. Obtain and install certificates:  
`sudo certbot --apache`

2. Fill in the information as prompted.

3. Certbot will do everything else for you, so once it's finished, the site should be set up to use HTTPS.

###### Renewing Certificates

1. Just run the renew command:  
`certbot renew`

###### Automating Certificate Renewal with Cron

1. Open the crontab file:  
`sudo crontab -e`

2. Add the following line, which will renew the certificate at 12:00 every day:  
`00 12 * * * /usr/bin/certbot renew --quiet`

3. Save the file.
