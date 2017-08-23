/**
	* Page Management JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

function pageManager(pageContainer) {
  // Set starting variables
  var pageContainer = pageContainer;

  // Change the page
  this.setPage = function(targetPageID) {
    // Create variables to hold the current and target divs
    var currentPage;
    var targetPage;
    // Loop through the pages in the container
    $(pageContainer + ' .page').each(function() {
      // If the page ID matches, display it, otherwise hide it
      if($(this).attr('id') == targetPageID) {
        targetPage = $(this);
      } else if ($(this).hasClass('display')) {
        currentPage = $(this);
      }
    });
    // Change the pages
    switchPages(currentPage, targetPage);
  }

  // Switch page visibility
  function switchPages(currentPage, targetPage) {
    currentPage.fadeOut(200, function() {
      currentPage.removeClass('display');
      targetPage.fadeIn(200, function() {
        targetPage.addClass('display');
      });
    });
  }
}
