var blurb_page = 0;
var page_name;

function blurb_feed_change_page(page) {
 
  $.ajax({
    url: "/home/change_page",
    data: { 'blurb_page' : page, 'page_name' : page_name },
    success: function (result) {
      $("#endless-scroll").html(result);
      $("#endless-scroll").attr("id", "scroll-page-" + page); 
    }
  });
  
  return;

}

function scrollListener() {
 
  var endless_scroll = $("#endless-scroll");

  if(!endless_scroll.length) {
    return;
  }

  var element_top = endless_scroll.offset().top;
  var scroll_top = $(window).scrollTop();
  var scroll_bottom = scroll_top + $(window).height();

  if (element_top > scroll_top && element_top < scroll_bottom) {
    blurb_page++;
    blurb_feed_change_page(blurb_page);
  }

  setTimeout(scrollListener, 500); 

}

$(document).on('click', function(event) {
  
  if (!$(event.target).closest('#personal-name').length) {

    var personal_dropdown = $("#personal-dropdown");
    var personal_arrow = $("#personal-arrow");

    personal_dropdown.css("visibility", "hidden");
    personal_dropdown.css("margin-top", "-200px"); // HACK

    personal_arrow.removeClass("nav-arrow-up");
    personal_arrow.addClass("nav-arrow-down");

  } 

  if (!$(event.target).closest('#explore-name').length) {

    var explore_dropdown = $("#explore-dropdown");
    var explore_arrow = $("#explore-arrow");

    explore_dropdown.css("visibility", "hidden");
    explore_dropdown.css("margin-top", "-200px"); // HACK

    explore_arrow.removeClass("nav-arrow-up");
    explore_arrow.addClass("nav-arrow-down");
 
  }

});

function searchFocusListener() {


  $("#search_people_content").focusin( function() {
    $("#mag-glass-icon").css("color", "#AB0000");
  }).focusout( function() {
    $("#mag-glass-icon").css("color", "#979797");
  });

}

function navMenuDropdownListener() {

  var personal_arrow = $("#personal-arrow");
  var personal_button = $("#personal-name");
  var personal_dropdown = $("#personal-dropdown");  

  var explore_arrow = $("#explore-arrow");
  var explore_button= $("#explore-name");
  var explore_dropdown = $("#explore-dropdown");  

  personal_button.click(function() {
    personal_dropdown.css("visibility", "visible"); 
    personal_dropdown.css("margin-top", "0px"); // HACK
    personal_arrow.removeClass("nav-arrow-down");
    personal_arrow.addClass("nav-arrow-up");
  });

  explore_button.click(function() {
    explore_dropdown.css("visibility", "visible"); 
    explore_dropdown.css("margin-top", "0px"); // HACK
    explore_arrow.removeClass("nav-arrow-down");
    explore_arrow.addClass("nav-arrow-up");
  });

}

function initPage() {
  blurb_page = 0;

  scrollListener();
  navMenuDropdownListener();
  searchFocusListener();
}

$(document).ready(function () {
  initPage();
});


$(document).on("page:load", function() {
  initPage();
});

$(document).on("click", "#mag-glass", function() {
  $("#search_people_content").focus();
});

/* Blurb Edit Functionality */

var curr_edit_count = 0

$(document).on("click", ".blurb-edit", function () {

  var blurb_elem = $(this).parent().parent().children("#content");

  var blurb_text = blurb_elem.children("a").html().toString();

  blurb_elem.html("<div class='edit-blurb-container'><form action='/users/edit_blurb' accept-charset='UTF-8' method='post'><div class='blurb-edit-input-container'><input id='edit-" + curr_edit_count.toString() + "' type='text' class='edit-blurb-form'></div><input type='submit' value='submit' class='edit-blurb-submit'><input type='button' value='cancel' class='edit-blurb-cancel'></form></div>");

  var edit_elem = $("#edit-" + curr_edit_count++);

  edit_elem.focus();
  edit_elem.val(blurb_text);

});

$(document).on("click", ".edit-blurb-cancel", function() {
  var blurb_text = $(this).parent().children(".blurb-edit-input-container").children('.edit-blurb-form').val();

  $(this).parent().parent().parent().html("<a>" + blurb_text + "</a>");

  curr_edit_count--;
});


