/**
	* Main JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

// Document Ready Functions
$(document).ready(function() {
  // On Scroll
  $(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
      $("header").addClass("on-scroll");
    } else {
      $("header").removeClass('on-scroll');
    }
  });

  // Navbar Buttons
  $(".scroll-btn").click(function() {
    event.preventDefault();
    // Get the target
    var target = $(this).attr("href");
    // Get the offset
    var offset = $(target).offset().top - 70;
    // Ensure the offset is within the page limits
    if (offset < 0) {
      offset = 0;
    }
    if (offset > $(document).height() - $(window).height()) {
      offset = $(document).height() - $(window).height()
    }
    // Scroll to the target
    $('html,body').animate({scrollTop: offset}, 300);
  });

  // On Load
  $(window).on("load", function() {
    // Fade in elements with the .fade-in-onload class
    $(".fade-in").css("opacity", "100");
  });
});
