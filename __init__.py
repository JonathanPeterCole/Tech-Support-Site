import os, validation
from flask import Flask, redirect, request, render_template, send_from_directory, abort
from flask_mail import Mail, Message

app = Flask (__name__)
app.config.from_object("config.BaseConfig")
mail = Mail(app)

@app.route("/")
def index():
    return render_template('index.html.j2')

@app.route("/book")
def book():
    return render_template('book.html.j2')

@app.route("/book/submit", methods = ['POST'])
def submit_booking():
    # Get the form data
    json_data = request.get_json()
    # Validate the received data
    if json_data and validation.validate(json_data):
        if send_booking_mail(json_data):
            return "success"
    # Validation failed or the email could not be sent, so return "error"
    return "error"

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

@app.after_request
def add_header(response):
    # Disable cache
    # Reference: https://stackoverflow.com/questions/34066804/disabling-caching-in-flask
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers['Cache-Control'] = 'public, max-age=0'
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

if __name__ == "__main__":
    app.run()
