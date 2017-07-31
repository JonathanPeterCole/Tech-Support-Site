/**
	* Main JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

// Variables
var header_height = 64;
var scroll_position = 0;

// Event listeners
$(document).ready(function() {
  // Set Header class incase user has already scrolled
  setHeaderClass();

  // On Scroll Event
  $(window).scroll(function() {
    setHeaderClass();
  });

  // Collapse header on mobile
  $(window).scroll(function() {
    var new_position = $(window).scrollTop();
    if ((new_position > header_height) && (new_position > scroll_position)) {
      $("header").addClass("collapsed");
    } else {
      $("header").removeClass("collapsed");
    }
    scroll_position = new_position;
  });

  // Hamburger Click Event
  $(".hamburger").click(function(event) {
    toggleMobileNav();
  });

  // Navbar Button Event
  $(".scroll-btn").click(function(event) {
    event.preventDefault();
    // Get the target and offset
    var target = $(this).attr("href");
    var offset = $(target).offset().top - header_height;
    // Ensure the offset is within the page limits
    if (offset < 0) {
      offset = 0;
    } else if (offset > $(document).height() - $(window).height()) {
      offset = $(document).height() - $(window).height()
    }
    // Scroll to the target and close the mobile nav menu if it's open
    if ($(".navbar-list").hasClass("open")) {
      // Set the scroll position variable to prevent the navbar being hidden
      scroll_position = offset;
      $('html,body').animate({scrollTop: offset}, 0);
      toggleMobileNav();
    } else {
      $('html,body').animate({scrollTop: offset}, 300);
    }
  });

  // On Load Event
  $(window).on("load", function() {
    // Fade in elements with the .fade-in-onload class
    $(".fade-in").css("opacity", "100");
  });
});

// Functions
function setHeaderClass() {
  // If the the user is not at the top of the page, add the on-scroll class,
  // otherwise remove it
  if ($(window).scrollTop() > 0) {
    $("header").addClass("on-scroll");
  } else {
    $("header").removeClass('on-scroll');
  }
}

function toggleMobileNav() {
  // Toggle the navbar-list open class and the body no-scroll class together
  $(".navbar-list").toggleClass("open");
  $("body").toggleClass("no-scroll");
}
