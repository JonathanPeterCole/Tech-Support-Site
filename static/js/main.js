/**
	* Main JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

//  ------------------------------------------------------------------------
//  Global Variables
//  ------------------------------------------------------------------------

var navbarHeight = 64;

//  ------------------------------------------------------------------------
//  Fade In On Load
//  ------------------------------------------------------------------------

$(window).on("load", function() {
  // Fade in elements with the .fade-in-onload class
  $(".fade-in").css("opacity", "100");
});

//  ------------------------------------------------------------------------
//  Banner Parallax
//  ------------------------------------------------------------------------

$(function() {
  // On Scroll Event
  if ($(window).width() > 767) {
    $(window).scroll(function() {
      // Check if the banner is visible
      if ($(window).scrollTop() <= 500) {
        // Get half the scroll distance
        var parallax = $(window).scrollTop()/3;
        // Apply a transform to the banner background
        $(".parallax").css({"transform": "translateY(" + parallax +"px)"})
      }
    });
  }
});

//  ------------------------------------------------------------------------
//  Navbar On Scroll
//  ------------------------------------------------------------------------

$(function() {
  // Set Navbar class incase user has already scrolled
  setNavbarClass();
  // On Scroll Event
  if ($(window).width() > 767) {
    $(window).scroll(function() {
      // Set navbar background opacity
      setNavbarClass();
    });
  }
});

function setNavbarClass() {
  // If the the user is not at the top of the page, add the on-scroll class,
  // otherwise remove it
  if ($(window).scrollTop() > 0) {
    $("nav").addClass("on-scroll");
  } else {
    $("nav").removeClass('on-scroll');
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
  var anchorIndex = url.indexOf('#')
  if (anchorIndex > 0) {
    var anchor = url.substring(anchorIndex);
    scrollToAnchor(anchor, 0);
  }
  // Navbar Button Event
  $("a").click(function(event) {
    // Get the current and target locations and split them
    var currentLocation = $(location).attr('href').split('#');
    var targetLocation = $(this).prop("href").split('#');
    // Get the split URLs and Anchors
    currentUrl = currentLocation[0];
    targetUrl = targetLocation[0];
    currentAnchor = currentLocation[1];
    targetAnchor = targetLocation[1];
    // Check if the target anchor is not empty and the URLs match
    if (targetAnchor && currentUrl == targetUrl) {
      // Prevent the default link action
      event.preventDefault();
      // Scroll to the anchor
      if ($(".navbar-list").hasClass("open")) {
        scrollToAnchor("#" + targetAnchor, 0)
      } else {
        scrollToAnchor("#" + targetAnchor, 300)
      }
    }
    // Close the mobile nav-menu if it's open
    if ($(".navbar-list").hasClass("open")) {
      toggleMobileNav();
    }
  });
});

function scrollToAnchor(anchor, animation) {
  // Get the offset
  var offset = $(anchor).offset().top - navbarHeight;
  // Ensure the offset is within the page limits
  if (offset < 0) {
    offset = 0;
  } else if (offset > $(document).height() - $(window).height()) {
    offset = $(document).height() - $(window).height()
  }
  // Scroll to the target and close the mobile nav menu if it's open
  $('html,body').animate({scrollTop: offset}, animation);
}

//  ------------------------------------------------------------------------
//  Toasts
//  ------------------------------------------------------------------------

$(function() {
  // Hamburger Click Event
  $("#toast .close-btn").click(function(event) {
    $("#toast").addClass("dismiss");
  });
});
