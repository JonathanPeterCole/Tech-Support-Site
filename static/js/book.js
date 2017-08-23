/**
	* Booking Page JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

$(function() {
  // Prepare the page Manager
  var bookingPageManager = new pageManager('#page-container');

  // Open the switch to the form page when done loading
  $(window).on("load", function() {
    bookingPageManager.setPage('form');
  });

  // Submit action
  $("#booking-form").submit(function(event) {
    // Prevent the usual form submit action
    event.preventDefault();
    // Switch to the loading page
    bookingPageManager.setPage('loading');
    // Make an AJAX call and display the results
    $.ajax({
      data: $(this).serialize(),
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      success: function(response) {
        $('#result').html(response);
        bookingPageManager.setPage('result');
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('#result').html("Error: " + errorThrown);
        bookingPageManager.setPage('result');
      }
    });
  });
});
