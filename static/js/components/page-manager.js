/**
	* Page Management JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

function pageManager(pageContainer) {
  // Set the pageContainer div
  var pageContainer = pageContainer;

  // Change the page
  this.setPage = function(targetPageID) {
    // Get the target page div
    var targetPage = $(pageContainer + ' > #' + targetPageID);
    var currentPage = $(pageContainer + ' > .display');

    // Change the pages
    currentPage.removeClass('display');
    targetPage.addClass('display');
    currentPage = targetPage;
  }
}
