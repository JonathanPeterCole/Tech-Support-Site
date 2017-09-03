# Key Arrays
keys = {
    "setup": ["service-type", "name", "email", "phone", "pc-model", "accessory", "win-ver", "message"],
    "upgrade": ["service-type", "site-type", "name", "email", "phone", "pc-model", "win-ver", "upgrade-type", "message"],
    "repair": ["service-type", "site-type", "name", "email", "phone", "pc-model", "win-ver", "error", "message"]
}

def validate(received_data):
    # Check that the received data contains the correct keys
    if "service-type" in received_data and received_data["service-type"] in keys:
        return match_dict_keys(received_data, keys.get(received_data["service-type"]))
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
