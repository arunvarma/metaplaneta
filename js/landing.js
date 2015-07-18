/*
 * landing.js
 * Controls front-end portion of landing page.
 * Author: Arun Varma
 * Date: July 16, 2015
 */

$(document).ready(function() {
  // Correct front page to not be faded.
  $('#front_page_hider').css('opacity', '0');

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

  // On Japanese link click, display Japanese site text.
  $('#japanese_text_chooser').click(function() {
    // Hide English text and show Japanese text.
    $('.english_text').css('display', 'none');
    $('.japanese_text').css('display', 'block');

    return false;
  });

  // On English link click, display English site text.
  $('#english_text_chooser').click(function() {
    // Hide Japanese text and show English text.
    $('.english_text').css('display', 'inline-block');
    $('.japanese_text').css('display', 'none');

    return false;
  });

  // When hovering over person's profile, display their intro.
  $('.person_profile').hover(function() {
    $(this).find('.person_description_wrapper').animate({
      height: '220px'
    }, 500);
    $(this).find('.person_description_intro').fadeIn(400);
  }, function() {
    $(this).find('.person_description_wrapper').animate({
      height: '80px'
    }, 500);
    $(this).find('.person_description_intro').fadeOut(400);
  });

  // Fade each page according to scroll position.
  $(document).scroll(function() {
    var curScrollPos = $(document).scrollTop();
    $('.page_hider').each(function(index, element) {
      pageFadeOnScroll($(this), curScrollPos);
    });
  })
});

/*
 * Fades given page hider based on current scrolling position.
 */
function pageFadeOnScroll(pageHider, curScrollPos) {
  var pageHeight = pageHider.height();
  var pageTop = pageHider.offset().top;
  var pageBottom = pageTop + pageHeight;
  var windowBottom = curScrollPos + $(window).height();

  // Do nothing if the page is not visible.
  if (curScrollPos > pageBottom || windowBottom < pageTop) {
    return;
  }

  // Calculate offset of current scroll position from top of page.
  var posOffset = Math.abs(curScrollPos - pageTop);
  var opacityVal = Math.min(posOffset / pageHeight, 1);

  // Alter opacity value according to position offset.
  pageHider.css('opacity', opacityVal);
}
