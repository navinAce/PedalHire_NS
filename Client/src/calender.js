  import React, { useState } from "react";

  function Calendarsearch({ id, onDateChange, identifier }) {
    const [maxDate, setMaxDate] = useState(getMaxDate());
    const minDate = getToday(); // Get today's date in the format yyyy-mm-dd

    // Function to get today's date in the format yyyy-mm-dd
    function getToday() {
      const today = new Date();
      let yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Add one because getMonth returns zero-based month
      let dd = today.getDate();

      if (mm < 10) {
        mm = "0" + mm;
      }
      if (dd < 10) {
        dd = "0" + dd;
      }

      return `${yyyy}-${mm}-${dd}`;
    }

    // Function to get the date three months from today in the format yyyy-mm-dd
    function getMaxDate() {
      const today = new Date();
      const futureDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
      return futureDate.toISOString().split("T")[0];
    }

    // Call the onDateChange function and pass the selected date and identifier as arguments
    function handleDateChange(event) {
      const selectedDate = event.target.value;
      if (onDateChange) {
        onDateChange(selectedDate, identifier);
      }
    }

    return (
      <input
        type="date"
        min={minDate}
        max={maxDate}
        id={id}
        name={id}
        placeholder="to"
        onChange={handleDateChange}
      />
    );
  }

  export { Calendarsearch };