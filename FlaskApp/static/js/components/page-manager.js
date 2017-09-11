/**
	* Page Management JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

function pageManager(pageContainer) {
  // Set the pageContainer div
  var pageContainer = pageContainer;
  var pageHistory = [];

  // Change the page
  this.setPage = function(targetPageID, addToHistory) {
    // Get the target page div
    var targetPage = $(pageContainer + ' > #' + targetPageID);
    var currentPage = $(pageContainer + ' > .display');
    // Add the current page to the page history
    if (addToHistory) {
      pageHistory.push(currentPage.attr("id"));
    }
    // Change the pages
    currentPage.removeClass('display');
    currentPage.addClass('hidden');
    targetPage.removeClass('hidden');
    targetPage.addClass('display');
  }

  // Go back
  this.goBack = function() {
    if (pageHistory.length > 0) {
      var topPosition = pageHistory.length - 1;
      var previousPage = pageHistory.splice(topPosition, 1);
      this.setPage(previousPage, false);
    } else {
      console.log("No pages in history");
    }
  }
}
