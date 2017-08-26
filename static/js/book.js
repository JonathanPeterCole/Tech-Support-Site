/**
	* Booking Page JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

// Prepare the page Manager and service type variable
var bookingPageManager = new pageManager('#page-container');
var serviceType;

// Open the switch to the form page when done loading
$(window).on("load", function() {
  bookingPageManager.setPage('services');
});

$(function() {
  // Service Selection
  $("#services a").click(function(event) {
    serviceType = $(this).attr('service-type');
    bookingPageManager.setPage($(this).attr('target-page'));
  });

  // Submit action
  $("form").submit(function(event) {
    // Prevent the usual form submit action
    event.preventDefault();
    // Prepare the form date
    var bookingInfo = getFormData($(this));
    bookingInfo['service-type'] = serviceType;
    // Submit the data
    submitData('/book/submit', bookingInfo);
  });
});

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
