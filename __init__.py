import os, requests, validation, config
from flask import Flask, redirect, request, render_template, send_from_directory, escape
from flask_mail import Mail, Message

app = Flask (__name__)
app.config.from_object(config.BaseConfig)
mail = Mail(app)

version = "2.1.1"

@app.route("/")
def index():
    return render_template('index.html.j2')

@app.route("/book")
def book():
    return render_template('book.html.j2', site_key = app.config.get("RECAPTCHA_SITE_KEY"))

@app.route("/book/submit", methods = ['POST'])
def submit_booking():
    # Get the form data
    json_data = request.get_json()
    # Check for data in dictionary
    if not json_data:
        return "Request missing JSON data"
    # Check the reCAPTCHA
    if "g-recaptcha-response" not in json_data.keys():
        return "Recaptcha response missing"
    if not check_recaptcha(json_data.pop("g-recaptcha-response"), request.remote_addr):
        return "Recaptcha check failed"
    # Validate the received data
    if not validation.validate(json_data):
        return "Data validation check failed"
    # Prepare the data
    escape_values(json_data)
    convert_newlines(json_data)
    # Attempt to send the mail
    if not send_booking_mail(json_data):
        return "Send mail error"
    # If this point is reached, everything completed successfully
    return "success"

def check_recaptcha(response, ip):
    # Prepare the recaptcha verification_data
    verification_data = {
        "secret": app.config.get("RECAPTCHA_SECRET_KEY"),
        "response": response,
        "remoteip": ip
    }
    # Make the request
    request = requests.get(
        app.config.get("RECAPTCHA_VERIFY_URL"),
        params = verification_data
    )
    # Check the request results
    if request.json()["success"]:
        return True
    else:
        return False

def convert_newlines(data):
    # Replace all \n's with <br>
    for key, value in data.items():
        data[key] = "<br>".join(value.split("\r"))

def escape_values(data):
    # Escape all the values in the dictionary
    for key, value in data.items():
        data[key] = escape(value)

def send_booking_mail(booking_info):
    # Prepare the body of the message
    mail_body = render_template("emails/new-booking.html.j2", data = booking_info)
    # Prepare the email
    email = Message("New Booking from " + booking_info["name"],
        html = mail_body,
        recipients = [app.config["BOOKING_EMAIL_TARGET"]])
    # Send the email
    try:
        mail.send(email)
    except:
        return False
    return True

@app.route('/robots.txt')
@app.route('/sitemap.xml')
def static_from_root():
    # Get Robots.txt and Sitemap.xml from the static folder
    return send_from_directory(app.static_folder, request.path[1:])

@app.context_processor
def set_variables():
    # Set variables for all templates
    visitor_message = app.config.get("VISITOR_MESSAGE")
    resource_version = "?version=" + version
    if visitor_message:
        return dict(resource_version = resource_version, visitor_message = visitor_message)
    else:
        return dict(resource_version = resource_version)

@app.after_request
def add_header(response):
    # Disable cache
    # Reference: https://stackoverflow.com/questions/34066804/disabling-caching-in-flask
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

if __name__ == "__main__":
    app.run()
