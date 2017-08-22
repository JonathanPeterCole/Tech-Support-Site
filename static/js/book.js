/**
	* Booking Page JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

$(function() {
  // Prepare the page Manager
  var bookingPageManager = new pageManager('#page-container');
  // Submit action
  $("#booking-form").submit(function(event) {
    // Prevent the usual form submit action
    event.preventDefault();
    // Make an AJAX call
    $.ajax({
      data: $(this).serialize(),
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      success: function(response) {
        $('#result').html(response);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('#result').html("Error: " + errorThrown);
      }
    });
    // Switch to the results page
    bookingPageManager.setPage('result');
  });
});
