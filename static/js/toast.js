/**
	* JS for the toast notication on my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

$(function() {
  // Hamburger Click Event
  $("#toast .close-btn").click(function(event) {
    $("#toast").addClass("dismiss");
  });
});
