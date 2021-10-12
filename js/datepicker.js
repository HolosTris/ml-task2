$(function() {
  const dateFormat = "dd M";
  const options = {
    shortYearCutoff: 20,
    dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
    monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
    monthNamesShort: [ "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек" ],
  }

  $(".rangepicker").datepicker({
    minDate: 0,
    maxDate: "+1y",
    beforeShowDay: showHighlites,
    dateFormat: dateFormat,
    defaultDate: "+1d",
    // changeMonth: true,
    // numberOfMonths: 1,
    showButtonPanel: true,
    // // altField: "#actualDate",
    showOtherMonths: true,
    // // selectOtherMonths: true,
    firstDay: 1,
    monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
    monthNamesShort: [ "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек" ],
    dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
    currentText: "Очистить",
    closeText: "Применить",
    prevText: "",
    nextText: "",
    onSelect: function(dateText, inst) {

      const date1 = $.datepicker.parseDate(dateFormat, $("#input1").val(), options);
      const date2 = $.datepicker.parseDate(dateFormat, $("#input2").val(), options);
      const selectedDate = $.datepicker.parseDate(dateFormat, dateText, options);

      if (!date1 || date2) {
        $("#input1").val(dateText);
        $("#input2").val("");
      } else if (selectedDate < date1) {
          $("#input2").val($("#input1").val());
          $("#input1").val(dateText);
      } else {
          $("#input2").val(dateText);
      }

      if ($("#input") != null) {
        $("#input").val($("#input1").val() + " - " + $("#input2").val());
      }

      $(this).data('datepicker').inline = true;
      $(this).datepicker();
    },
    onClose: function() {
      // Since we went inline as soon as the date input was clicked
      // (to leave the datepicker up for both dates selection),
      // turn inline back off again so date input click will once again
      // display the datepicker
      $(this).data('datepicker').inline = false;
    },
  });

  $("#ui-datepicker-div").css("display", "none");

  function showHighlites(date) {
      var date1 = $.datepicker.parseDate(dateFormat, $("#input1").val(), options);
      var date2 = $.datepicker.parseDate(dateFormat, $("#input2").val(), options);
      var isHighlight = date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2));
      var isFirst = (date1 && (date.getTime() == date1.getTime())) || (date2 && (date.getTime() == date2.getTime()));
      // var classes = isHighlight ? "dp-highlight" : "";
      return [true, (isHighlight ? "dp-highlight" : "") + (isFirst ? " dp-first" : "")];
      // return [true, isFirst ? "dp-first" : ""];
  }
});