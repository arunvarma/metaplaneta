/*
 * landing.js
 * Controls front-end portion of landing page.
 * Author: Arun Varma
 * Date: July 16, 2015
 */

$(document).ready(function() {
  // .
  var frontPageHider = $('#front_page_hider');
  var aboutPageHider = $('#about_page_hider');
  var whoPageHider = $('#who_page_hider');

  // .
  frontPageHider.css('opacity', '0');

  // On click of Front page scroll button, scroll down to About page.
  $('#scroll_down_link_p1').click(function() {
    $('html, body').animate({
        scrollTop: $('#about_page_wrapper').offset().top
    }, 800);

    return false;
  });

  // On click of About page scroll button, scroll down to Who page.
  $('#scroll_down_link_p2').click(function() {
    $('html, body').animate({
        scrollTop: $('#who_page_wrapper').offset().top
    }, 800);

    return false;
  });

  // On English link click, display English site text.
  $('#english_choose_link').click(function() {
    // Hide Japanese text and show English text.
    $('.japanese_text').css('display', 'none');
    $('.english_text').css('display', 'block');

    return false;
  });

  // On Japanese link click, display Japanese site text.
  $('#japanese_choose_link').click(function() {
    // Hide English text and show Japanese text.
    $('.english_text').css('display', 'none');
    $('.japanese_text').css('display', 'block');

    return false;
  });

  // Fade each page according to scroll position.
  $(document).scroll(function() {
    var curScrollPos = $(document).scrollTop();
    pageFadeOnScroll(frontPageHider, curScrollPos);
    pageFadeOnScroll(aboutPageHider, curScrollPos);
    pageFadeOnScroll(whoPageHider, curScrollPos);
  });
});

/*
 * Fades given page hider based on current scrolling position.
 */
function pageFadeOnScroll(pageHider, curScrollPos) {
  var pageHeight = pageHider.height();
  var pageTop = pageHider.offset().top;
  var pageBottom = pageTop + pageHeight;
  var windowBottom = curScrollPos + $(window).height();

  // .
  if (curScrollPos > pageBottom || windowBottom < pageTop) {
    return;
  }

  // Calculate offset of current scroll position from top of page.
  var posOffset = Math.abs(curScrollPos - pageTop);
  var opacityVal = Math.min(posOffset / pageHeight, 1);

  // Alter opacity value according to position offset.
  pageHider.css('opacity', opacityVal);
}
