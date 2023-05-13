// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: #1 Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(".saveBtn").on("click", function (event) {
    let saveButton = $(event.target);

    if (saveButton.is("button"))
    {
      let parentElement = saveButton.parent();
      let textArea = parentElement.find(".description");
      localStorage.setItem(parentElement.attr("id"), textArea.val());
    }
  });

  // TODO: #2 Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  const WORK_HOURS_PER_DAY =  9;                                /* Work days are typically 9 hours (including lunch)    */
  const WORK_HOUR_OFFSET   =  9;                                /* Work days typically start at 9am                     */
  const DAYJS = dayjs();                                        /* Day.js Object                                        */
  const CURRENT_HOUR = DAYJS.hour();                            /* Current hour                                         */

                                                                /* ============= GENERATE TIME BLOCK DIVS ============= */
  for (let hour = 0; hour < WORK_HOURS_PER_DAY; hour++) 
  {
    let timeBlockContainer  =  $(".container-lg.px-5");
    let timeBlockElement    =  $("<div>");
    let timeBlockID         =    "hour-" + (hour + WORK_HOUR_OFFSET);
    let timeBlockClass      =    "row time-block ";

    
                                                                /* ----------- BUILD TIME BLOCK HOUR LABEL ------------ */
    let timeBlockHourLabelElement = $("<div>", {
      class: "col-2 col-md-1 hour text-center py-3",
      text: DAYJS.hour((hour + WORK_HOUR_OFFSET)).format("h A")
    });


                                                                /* ------------ BUILD TIME BLOCK TEXT AREA ------------ */
    let timeBlockTextAreaElement = $("<textarea>", {
      class: "col-8 col-md-10 description",
      rows: "3"
    });


                                                                /* ----------- BUILD TIME BLOCK SAVE BUTTON ----------- */
    let timeBlockSaveButtonElement = $("<button>", {
      class: "btn saveBtn col-2 col-md-1",
      "aria-label": "save"
    });

                                                                /* Create time block save button icon element           */
    let saveButtonIcon = $("<i>", {
      class: "fas fa-save",
      "aria-hidden": "true"
    });

    timeBlockSaveButtonElement.append(saveButtonIcon);          /* Append save icon to save button element              */


                                                                /* ------------ DETERMINE TIME BLOCK CLASS ------------ */
    if (CURRENT_HOUR > (hour + WORK_HOUR_OFFSET))
    {
      timeBlockClass += "past";                                 /* Assign "past" (gray bckgnd) class to past times      */
    }
    else if (CURRENT_HOUR == (hour + WORK_HOUR_OFFSET))
    {
      timeBlockClass += "present";                              /* Assign "present" (red bckgnd) class to present times */
    }
    else
    {
      timeBlockClass += "future";                               /* Assign "future" (green bckgnd) class to future times */
    }


                                                                /* ------------- BUILD TIME BLOCK ELEMENT ------------- */
    timeBlockElement.attr("id", timeBlockID);                   /* Set time block div ID                                */
    timeBlockElement.attr("class", timeBlockClass);             /* Set time block div class                             */
    timeBlockElement.append(timeBlockHourLabelElement);         /* Append time block hour label to time block           */
    timeBlockElement.append(timeBlockTextAreaElement);          /* Append time block text area to time block            */
    timeBlockElement.append(timeBlockSaveButtonElement);        /* Append time block save button to time block          */
    timeBlockElement.appendTo(timeBlockContainer);              /* Append time block div to container                   */
  }

  // TODO: #3 Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: #4 Add code to display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMM DD, YYYY"));
});
