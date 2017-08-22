/**
	* Page Management JS for my site, requires jQuery 3
  * @author JonathanPeterCole@gmail.com
**/

function pageManager(pageContainer) {
  // Set starting variables
  this.pageContainer = pageContainer;
  // Change the page
  this.setPage = function(targetPageID) {
    // Loop through the pages in the container
    $(this.pageContainer + " .page").each(function() {
      // If the page ID matches, display it, otherwise hide it
      if ($(this).attr('id') == targetPageID) {
        $(this).addClass('display');
      } else {
        $(this).removeClass('display');
      }
    });
  }
}
