/**
	* Booking Page JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

// Prepare page manager, form validator, and variables
var bookingPageManager = new pageManager('#page-container');
var validator = new formValidator();
var serviceType;
var siteType;

// Open the switch to the form page when done loading
$(window).on("load", function() {
  bookingPageManager.setPage('service-selection');
});

$(function() {
  // Service Selection
  $("#service-selection a").click(function(event) {
    // Remember the service type
    serviceType = $(this).attr("service-type");
    // Change Page
    if(serviceType == "setup") {
      siteType = null;
      bookingPageManager.setPage("setup-form");
    } else if (serviceType == "upgrade" || serviceType == "repair") {
      bookingPageManager.setPage("site-selection");
    }
  });

  // Site Selection
  $("#site-selection a").click(function(event) {
    // Remember the site type
    siteType = $(this).attr("site-type");
    // Change page
    if(serviceType == "upgrade") {
      bookingPageManager.setPage("upgrade-form");
    } else if (serviceType == "repair") {
      bookingPageManager.setPage("repair-form");
    }
  });

  // Submit action
  $("form").submit(function(event) {
    // Prevent the usual form submit action
    event.preventDefault();
    // Check the validity of the form fields
    if (validateForm($(this))) {
      // Prepare the form date
      var bookingInfo = getFormData($(this));
      bookingInfo["service-type"] = serviceType;
      if (siteType) {
        bookingInfo["site-type"] = siteType;
      }
      // Submit the data
      submitData("/book/submit", bookingInfo);
    }
  });

  $("form .validated").change(function() {
    // On a form input change, validate the new value
    validate($(this));
  });
});

function validateForm(form) {
  // Check all the form fields and return the validation result
  var formIsValid = true;
  $(form).find(".validated").each(function(){
    if (!validate($(this))) {
      formIsValid = false;
    }
  });
  return formIsValid;
}

function validate(field) {
  // Check the field and display the result in an alert
  if (validator.validateField(field)) {
    field.removeClass("invalid");
    return true;
  } else {
    field.addClass("invalid");
    return false;
  }
}

function getFormData(form) {
  // Get the form data data and add it to an associative array
  var formArray = {};
  var serializedForm = form.serializeArray();
  for (var i = 0; i < serializedForm.length; i++) {
    formArray[serializedForm[i]['name']] = serializedForm[i]['value'];
  }
  return formArray;
}

function submitData(url, data) {
  // Switch to the loading page
  bookingPageManager.setPage('loading');
  // Make an AJAX call and display the results
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json;charset=UTF-8',
    success: function(response) {
      $('#result').html(response);
      bookingPageManager.setPage('result');
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      $('#result').html("Error: " + errorThrown);
      bookingPageManager.setPage('result');
    }
  });
}
