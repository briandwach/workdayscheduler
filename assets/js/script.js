var currentDayEl = $('#currentDay');

// https://www.freecodecamp.org/news/format-dates-with-ordinal-number-suffixes-javascript/
function checkOrdinal(number) {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  };
};

// Checks current day and renders/updates every second
function checkTime() {
  var currentDay = dayjs();

  var ordinal = checkOrdinal(Number(currentDay.format('D')));
  console.log(ordinal);
  // REMOVE EVERYTHING AFTER ORDINAL BEFORE PROJECT IS FINISHED
  currentDayEl.text(currentDay.format('dddd, MMMM D') + ordinal + currentDay.format(' h:mm:ss a'));

  setInterval(function () {
    currentDay = dayjs();

    ordinal = checkOrdinal(Number(currentDay.format('D')));
    // REMOVE EVERYTHING AFTER ORDINAL BEFORE PROJECT IS FINISHED
    currentDayEl.text(currentDay.format('dddd, MMMM D') + ordinal + currentDay.format(' h:mm:ss a'));
  }, 1000);
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
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  // Call funcion to render current day and update check/update every second
  checkTime();
});
