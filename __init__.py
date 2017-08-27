import os
from flask import Flask, redirect, request, render_template, send_from_directory
from flask_mail import Mail, Message

app = Flask (__name__)
ALLOWED_EXTENSIONS = set(['txt', 'png', 'jpg', 'jpeg'])
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
    # Put the data into a string and return it
    result = "";
    for key, value in json_data.items():
        result += key + ": " + value + "<br>"
    return result

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
