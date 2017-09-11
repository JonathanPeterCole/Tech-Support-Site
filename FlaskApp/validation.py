# -*- coding: utf-8 -*-
import re

# Key Arrays
keys = {
    "setup": ["service-type", "name", "email", "phone", "pc-model", "accessory", "win-ver", "message"],
    "upgrade": ["service-type", "site-type", "name", "email", "phone", "pc-model", "win-ver", "upgrade-type", "message"],
    "repair": ["service-type", "site-type", "name", "email", "phone", "pc-model", "win-ver", "error", "message"]
}

# Regex
defaultExpression = re.compile("^[a-z0-9 ,.'@:()?!#+=£%&*_\/\-\"]{0,50}$", re.IGNORECASE)
expressions = {
    "name": re.compile("^[a-z ,.'\-]{1,50}$", re.IGNORECASE),
    "email": re.compile("^[a-z0-9!#$%&'*+\-/=?^_`{|}~]{1,50}@[a-z0-9\-]{1,50}\.[a-z0-9.\-]{1,50}[a-z0-9]$", re.IGNORECASE),
    "phone": re.compile("^(0|\+44|44)[0-9]{10}$|^$"),
    "message": re.compile("^(?=.*[a-z])[a-z0-9 ,.'@:()?!#+=£%&*_\/\-\"\r\n]{1,5000}$", re.IGNORECASE)
}

def validate(received_data):
    # Check that the received data contains the correct keys
    if "service-type" in received_data and received_data["service-type"] in keys:
        if match_dict_keys(received_data, keys.get(received_data["service-type"])):
            valid = True
            for key, value in received_data.items():
                # Get the expression
                regex = defaultExpression
                if key in expressions.keys():
                    regex = expressions.get(key)
                # Check the value against the expression
                if not regex.match(value):
                    valid = False
            # Return the result
            return valid
    return False

def match_dict_keys(dictionary, required_keys):
    match = True
    # Check that the keys exist
    for key in required_keys:
        if key not in dictionary:
            match = False
    # Check that the length is correct
    if len(dictionary) != len(required_keys):
        match = False
    return match
