/**
	* Main JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

// Event listeners
$(document).ready(function() {
  // Set Header class incase user has already scrolled
  setHeaderClass();

  // On Scroll Event
  $(window).scroll(function() {
    setHeaderClass();
  });

  // Navbar Button Event
  $(".scroll-btn").click(function(event) {
    event.preventDefault();
    // Get the target and offset
    var target = $(this).attr("href");
    var offset = $(target).offset().top - 70;
    // Ensure the offset is within the page limits
    if (offset < 0) {
      offset = 0;
    } else if (offset > $(document).height() - $(window).height()) {
      offset = $(document).height() - $(window).height()
    }
    // Scroll to the target
    $('html,body').animate({scrollTop: offset}, 300);
  });

  // On Load Event
  $(window).on("load", function() {
    // Fade in elements with the .fade-in-onload class
    $(".fade-in").css("opacity", "100");
  });
});

// Functions
function setHeaderClass() {
  // The the user is not at the top of the page, add the on-scroll class,
  // otherwise remove it
  if ($(window).scrollTop() > 0) {
    $("header").addClass("on-scroll");
  } else {
    $("header").removeClass('on-scroll');
  }
}
