def validate(received_data):
    # Check that the received data contains the correct keys
    if "service-type" in received_data:
        if (received_data["service-type"] == "setup"):
            return match_dict_keys(received_data, ["service-type", "name", "email", "phone", "pc-model", "accessory", "win-ver", "message"])
        elif (received_data["service-type"] == "upgrade"):
            return match_dict_keys(received_data, ["service-type", "site-type", "name", "email", "phone", "pc-model", "win-ver", "upgrade-type", "message"])
        elif (received_data["service-type"] == "repair"):
            return match_dict_keys(received_data, ["service-type", "site-type", "name", "email", "phone", "pc-model", "win-ver", "error", "message"])
    return False

def match_dict_keys(dictionary, keys):
    match = True
    # Check that the keys exist
    for key in keys:
        if key not in dictionary:
            match = False
    # Check that the length is correct
    if len(dictionary) != len(keys):
        match = False
    return match
