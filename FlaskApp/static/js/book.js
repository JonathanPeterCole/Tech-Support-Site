/**
	* Booking Page JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

// Prepare page manager, form validator, and variables
var bookingPageManager = new pageManager('#page-container');
var formPageManager = new pageManager('#form-page-container');
var validator = new formValidator();
var serviceType;
var siteType;

// Open the switch to the form page when done loading
$(window).on("load", function() {
  // Wait an additional second after load to allow fonts to load
  setTimeout(function() {
    bookingPageManager.setPage('service-selection', false);
  }, 1000);
});

$(function() {
  // Service Selection
  $("#service-selection a").click(function(event) {
    // Remember the service type
    serviceType = $(this).attr("service-type");
    // Set the form page
    formPageManager.setPage(serviceType);
    // Change Page
    if(serviceType == "setup") {
      siteType = null;
      bookingPageManager.setPage("form", true);
    } else if (serviceType == "upgrade" || serviceType == "repair") {
      bookingPageManager.setPage("site-selection", true);
    }
  });

  // Site Selection
  $("#site-selection a").click(function(event) {
    // Remember the site type
    siteType = $(this).attr("site-type");
    // Change page
    bookingPageManager.setPage("form", true);
  });

  // Submit action
  $("form").submit(function(event) {
    // Prevent the usual form submit action
    event.preventDefault();
    // Check the validity of the form fields and the reCAPTCHA
    if (validateForm($(this)) && grecaptcha.getResponse().length != 0) {
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

  $("form .validated").on('focus keyup change', function() {
    // Validate the current field
    validate($(this));
  });

  $(".page .back").click(function(event) {
    // Go back
    bookingPageManager.goBack();
    // Reset the error text and hide the page status
    $('.page-controls .page-status .error').html("");
    $('.page-controls .page-status').removeClass("show");
  });
});

function validateForm(form) {
  // Check all the form fields and return the validation result
  var formIsValid = true;
  $(form).find(".validated").not(".hidden .validated").each(function(){
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
  var serializedForm = $(form).find(":input").not(".hidden :input").serializeArray();
  for (var i = 0; i < serializedForm.length; i++) {
    formArray[serializedForm[i]['name']] = serializedForm[i]['value'];
  }
  return formArray;
}

function submitData(url, data) {
  // Switch to the loading page
  bookingPageManager.setPage('loading', true);
  // Make an AJAX call and display the results
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json;charset=UTF-8',
    success: function(response) {
      if (response == "success") {
        bookingPageManager.setPage('result', true);
      } else {
        submitError(response);
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      submitError("Request failed");
    }
  });
}

function submitError(error) {
  if (error) {
    $('.page-controls .page-status .error').html("(" + error + ")");
  } else {
    $('.page-controls .page-status .error').html("");
  }
  $('.page-controls .page-status').addClass("show");
  bookingPageManager.goBack();
}

function enableSubmit(){
  $('form button').prop("disabled", false);
}
