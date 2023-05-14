// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () 
{
                                                                /* ==================== CONSTANTS ===================== */
  const WORK_HOURS_PER_DAY =  9;                                /* Work days are typically 9 hours (including lunch)    */
  const WORK_HOUR_OFFSET   =  9;                                /* Work days typically start at 9am                     */
  const DAYJS              =  dayjs();                          /* Day.js Object                                        */
  const CURRENT_HOUR       =  DAYJS.hour();                     /* Current hour                                         */


  $("#currentDay").text(dayjs().format("dddd, MMM DD, YYYY"));  /* Display weekday and date in header of the page       */


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
      rows: "3",
      text: localStorage.getItem(timeBlockID)
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

                                                                /* ================= EVENT LISTENERS ================== */
  $(".saveBtn").on("click", saveScheduledDay);                  /* Attach click event listener to "Save" button & icon  */
});


/**
 * Save text written in text area of time block to local 
 * storage.
 * 
 * @param {*} event 
 */
function saveScheduledDay(event) {
  let saveButton = $(event.target);                             /* Get reference to event target                        */
  let parentElement = saveButton.parent();                      /* Get parent element of event target                   */

  while (parentElement.is(".time-block") == false)              /* Ensure parent element is the time-block              */
  {
    parentElement = parentElement.parent();                     /* Continue moving up DOM tree until time-block found   */
  }

  let textArea = parentElement.find(".description");            /* Save reference to text are of time-block             */

                                                                /* Send text area value to localStorage using...        */
                                                                /* ... time-block id as key.                            */
  localStorage.setItem(parentElement.attr("id"), textArea.val());
}
