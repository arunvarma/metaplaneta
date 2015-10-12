/*
 * landing.js
 * Controls front-end portion of landing page.
 * Author: Arun Varma
 * Date: July 16, 2015
 */

var english_text_is_on = true;

$(document).ready(function() {
  var curScrollPos = $(document).scrollTop();
  $('.page_hider').each(function(index, element) {
    pageFadeOnScroll($(this), curScrollPos, false);
  });

  var player = $f($('#video_player')[0]);
  var status = $('.status');
  player.addEvent('ready', function() {
    status.text('ready');

    player.addEvent('pause', onPause);
    player.addEvent('finish', onFinish);
    player.addEvent('playProgress', onPlayProgress);
  });

  // On click of Front page scroll button, scroll down to About page.
  $('#scroll_down_link_p1').click(function() {
    $('html, body').animate({
        scrollTop: $('#about_page_wrapper').offset().top
    }, 800);

    return false;
  });

  // On Japanese link click, display Japanese site text.
  $('#japanese_text_chooser').click(function() {
    // Hide English text and show Japanese text.
    $('.english_text').css('display', 'none');
    $('.japanese_text').css('display', 'block');
    $('.person_description_intro.japanese_text').css('display', 'none');
    $('.japanese_text.enter_site').css('display', 'inline-block');

    english_text_is_on = false;
    return false;
  });

  // On English link click, display English site text.
  $('#english_text_chooser').click(function() {
    // Hide Japanese text and show English text.
    $('.english_text').css('display', 'block');
    $('.japanese_text').css('display', 'none');
    $('.person_description_intro.english_text').css('display', 'none');
    $('.english_text.enter_site').css('display', 'inline-block');

    english_text_is_on = true;
    return false;
  });

  // When hovering over person's profile, display their intro.
  $('.person_profile').hover(function() {
    $(this).find('.person_description_wrapper').animate({
      height: '240px'
    }, 500);

    if (english_text_is_on) {
      $(this).find('.person_description_intro.english_text').fadeIn(400);
    }
    else {
      $(this).find('.person_description_intro.japanese_text').fadeIn(400);
    }
  }, function() {
    $(this).find('.person_description_wrapper').animate({
      height: '100px'
    }, 500);
    $(this).find('.person_description_intro').fadeOut(400);
  });

  // Fade each page according to scroll position.
  $(document).scroll(function() {
    var curScrollPos = $(document).scrollTop();
    $('.page_hider').each(function(index, element) {
      pageFadeOnScroll($(this), curScrollPos, null);
    });

    $('#video_player').each(function(index, element) {
      pageFadeOnScroll($(this), curScrollPos, player);
    });
  })
});

/*
 * Fades given page hider based on current scrolling position.
 */
function pageFadeOnScroll(pageHider, curScrollPos, player) {
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
  if (player) {
    pageHider.css('opacity', 1 - opacityVal);

    if (posOffset < 100) {
      player.api('play');
    }
    else {
      player.api('pause');
    }
  }
  else {
    pageHider.css('opacity', opacityVal);
  }
}
