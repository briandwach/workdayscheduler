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


// Checks the date of the month and returns the correct ordinal
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

// Iterates on each hour and determines styling is past, present, or future
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

// Iterates on each hour and renders any saved events in localstorage
function loadEvents() {
  for (var t = 9; t <= 17; t++) {
    var hour = ('hour-' + t);
    var description = localStorage.getItem(hour);

    var loadEventEl = $('#' + hour);
    loadEventEl.children('textarea').val(description);
  };
};

// Saves event information to localstorage if value differs from what was previously listed
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

// Displays appointment stored confirmation at top of application for a brief period of time
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

// This function iniates once the DOM has completed rendering
$(function () {
  confirmationEl.css('display', 'none');

  btnEl.on('click', saveEvent);

  // Call function to render current day and check/update every second
  checkTime();

  // Call function to apply styles to past, present, and future hours
  checkTense();

  // Call function to render descriptions for any previously saved events
  loadEvents();
});