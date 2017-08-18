/**
	* Main JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

//  ------------------------------------------------------------------------
//  Global Variables
//  ------------------------------------------------------------------------

var header_height = 64;
var scroll_position = 0;

//  ------------------------------------------------------------------------
//  Fade In On Load
//  ------------------------------------------------------------------------

$(window).on("load", function() {
  // Fade in elements with the .fade-in-onload class
  $(".fade-in").css("opacity", "100");
});

//  ------------------------------------------------------------------------
//  Header On Scroll
//  ------------------------------------------------------------------------

$(function() {
  // Set Header class incase user has already scrolled
  setHeaderClass();
  // On Scroll Event
  $(window).scroll(function() {
    // Set header background opacity
    setHeaderClass();
    // Show or Hide the header on mobile
    var new_position = $(window).scrollTop();
    if ((new_position > header_height) && (new_position > scroll_position)) {
      $("header").addClass("collapsed");
    } else {
      $("header").removeClass("collapsed");
    }
    scroll_position = new_position;
  });
});

function setHeaderClass() {
  // If the the user is not at the top of the page, add the on-scroll class,
  // otherwise remove it
  if ($(window).scrollTop() > 0) {
    $("header").addClass("on-scroll");
  } else {
    $("header").removeClass('on-scroll');
  }
}

//  ------------------------------------------------------------------------
//  Mobile Navigation
//  ------------------------------------------------------------------------

$(function() {
  // Hamburger Click Event
  $(".hamburger").click(function(event) {
    toggleMobileNav();
  });
});

function toggleMobileNav() {
  // Toggle the navbar-list open class and the body no-scroll class together
  $(".navbar-list").toggleClass("open");
  $("body").toggleClass("no-scroll");
}

//  ------------------------------------------------------------------------
//  Anchor Links
//  ------------------------------------------------------------------------

$(function() {
  // If the page loaded with an anchor, scroll to the correct part of the page
  var url = window.location.href;
  var anchor_index = url.indexOf('#')
  if (anchor_index > 0) {
    var anchor = url.substring(anchor_index);
    scrollToAnchor(anchor, 0);
  }
  // Navbar Button Event
  $("a").click(function(event) {
    // Get the current and target locations and split them
    var current_location = $(location).attr('href').split('#');
    var target_location = $(this).prop("href").split('#');

    // Get the split URLs and Anchors
    current_url = current_location[0];
    target_url = target_location[0];
    current_anchor = current_location[1];
    target_anchor = target_location[1];

    // Check if the target has an anchor and the URLs match
    if (target_anchor != "#" && current_url == target_url) {
      // Prevent the default link action
      event.preventDefault();
      // Scroll to the anchor and close the mobile nav menu if it's open
      if ($(".navbar-list").hasClass("open")) {
        scrollToAnchor("#" + target_anchor, 0)
        toggleMobileNav();
      } else {
        scrollToAnchor("#" + target_anchor, 300)
      }
    }
  });
});

function scrollToAnchor(anchor, animation) {
  // Get the offset
  var offset = $(anchor).offset().top - header_height;
  // Ensure the offset is within the page limits
  if (offset < 0) {
    offset = 0;
  } else if (offset > $(document).height() - $(window).height()) {
    offset = $(document).height() - $(window).height()
  }
  // Set the scroll position variable to prevent the navbar being hidden
  scroll_position = offset;
  // Scroll to the target and close the mobile nav menu if it's open
  $('html,body').animate({scrollTop: offset}, animation);
}
