import os
from flask import Flask, redirect, request, render_template
from flask_mail import Mail, Message

app = Flask (__name__)
ALLOWED_EXTENSIONS = set(['txt', 'png', 'jpg', 'jpeg'])
mail = Mail(app)

@app.route("/")
def index():
    return render_template('index.html.j2')

if __name__ == "__main__":
    app.run(debug=True)
