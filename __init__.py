import os
from flask import Flask, redirect, request, render_template
from flask_mail import Mail, Message

app = Flask (__name__)
ALLOWED_EXTENSIONS = set(['txt', 'png', 'jpg', 'jpeg'])
mail = Mail(app)

@app.route("/")
def index():
    return render_template('index.html.j2')

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
