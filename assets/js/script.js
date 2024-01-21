// Define global variables that traverse the DOM
var currentDay = dayjs();
var currentDayEl = $('#currentDay');


// Checks current day and renders/updates every second
function checkTime() {
  var ordinal = checkOrdinal(Number(currentDay.format('D')));
  
  // REMOVE EVERYTHING AFTER ORDINAL BEFORE PROJECT IS FINISHED
  currentDayEl.text(currentDay.format('dddd, MMMM D') + ordinal + currentDay.format(' h:mm:ss a'));

  setInterval(function () {
    // Every second currentDay is updated to pull current time
    currentDay = dayjs();

    ordinal = checkOrdinal(Number(currentDay.format('D')));
    // REMOVE EVERYTHING AFTER ORDINAL BEFORE PROJECT IS FINISHED
    currentDayEl.text(currentDay.format('dddd, MMMM D') + ordinal + currentDay.format(' h:mm:ss a'));

    if (currentDay.format('mm') === ('01')) {
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


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  

  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  

  // Call function to render current day and update check/update every second
  checkTime();

  // Call function to apply styles to past, present, and future hours
  checkTense();
});
