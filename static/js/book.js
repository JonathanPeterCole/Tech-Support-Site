/**
	* Booking Page JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

$(function() {
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
      }
    });
  });
});
