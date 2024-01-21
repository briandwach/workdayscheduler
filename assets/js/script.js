// Define global variables that traverse the DOM
var currentDay = dayjs();
var currentDayEl = $('#currentDay');
var btnEl = $(".btn");
var confirmationEl = $('#confirmation');

// Defining other global variables
var confirmTimer = undefined;


// Checks current day and renders/updates every second
function checkTime() {
  var ordinal = checkOrdinal(Number(currentDay.format('D')));

  
  currentDayEl.text(currentDay.format('dddd, MMMM D') + ordinal);

  setInterval(function () {
    // Every second currentDay is updated to pull current time
    currentDay = dayjs();

    ordinal = checkOrdinal(Number(currentDay.format('D')));
    
    currentDayEl.text(currentDay.format('dddd, MMMM D') + ordinal);

    if (currentDay.format('mm') === ('00')) {
      checkTense();
    };

  }, 1000);
};


// https://www.freecodecamp.org/news/format-dates-with-ordinal-number-suffixes-javascript/
function checkOrdinal(number) {
  if (number > 3 && number < 21) return 'th';
  switch (number % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  };
};


function checkTense() {
  for (var t = 9; t <= 17; t++) {
    var hour = ('#hour-' + t);
    var hourEl = $(hour);
    hourEl.removeClass('past').removeClass('present').removeClass('future');

    if (Number(currentDay.format('H')) > t) {
      hourEl.addClass('past');
    } else if (Number(currentDay.format('H')) === t) {
      hourEl.addClass('present');
    } else {
      hourEl.addClass('future');
    };
  };
};

function loadEvents() {
  for (var t = 9; t <= 17; t++) {
    var hour = ('hour-' + t);
    var description = localStorage.getItem(hour);

    var loadEventEl = $('#' + hour);
    loadEventEl.children('textarea').val(description);
  };
};

function saveEvent() {
  var eventHour = $(this).parent().attr('id');
  
  var eventDescription = $(this).siblings('textarea').val();
  eventDescription = eventDescription.trim();

  if (eventDescription !== localStorage.getItem(eventHour)) {
  localStorage.setItem(eventHour, eventDescription);

  $(this).siblings('textarea').val(eventDescription);

  saveConfirmation();
  };
};

function saveConfirmation() {
  clearTimeout(confirmTimer);
  confirmationEl.css('display', 'none');

  setTimeout(function() {
  confirmationEl.css('display', 'block');
  }, 100);

  confirmTimer = setTimeout(function () {
    confirmationEl.css('display', 'none');
  }, 3000);
};

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  confirmationEl.css('display', 'none');

  btnEl.on('click', saveEvent);


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  // Call function to render current day and update check/update every second
  checkTime();

  // Call function to apply styles to past, present, and future hours
  checkTense();

  // Call function to render descriptions for any previously saved events
  loadEvents();
});