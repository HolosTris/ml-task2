$(function() {
  let dateFormat = "dd.mm.yy";
  const options = {
    shortYearCutoff: 20,
    dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
    monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
    monthNamesShort: [ "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек" ],
  }

  if(location.pathname == "/main.html") dateFormat = "dd M";

  $(".rangepicker").datepicker({
    minDate: 0,
    maxDate: "+1y",
    beforeShow: (location.pathname == "/main.html")? null : function (input, inst ) {
      const text1 = $("#input1").text().split(".");
      const text2 = $("#input2").text().split(".");
      if (!Date.parse([text1[2], text1[1], text1[0]].join("."))
        || !Date.parse([text2[2], text2[1], text2[0]].join("."))) {
        $("#input1").text("");
        $("#input2").text("");
      }
    },
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
      const date1 = $.datepicker.parseDate(dateFormat, $("#input1").text(), options);
      const date2 = $.datepicker.parseDate(dateFormat, $("#input2").text(), options);
      const selectedDate = $.datepicker.parseDate(dateFormat, dateText, options);
      if (!date1 || date2) {
        $("#input1").text(dateText);
        $("#input2").text("");
      } else if (selectedDate < date1) {
          $("#input2").text($("#input1").text());
          $("#input1").text(dateText);
      } else {
          $("#input2").text(dateText);
      }

      if ($("#input") != null) {
        $("#input").val($("#input1").text() + " - " + $("#input2").text());
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
      var date1 = $.datepicker.parseDate(dateFormat, $("#input1").text(), options);
      var date2 = $.datepicker.parseDate(dateFormat, $("#input2").text(), options);
      var isHighlight = date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2));
      var isFirst = (date1 && (date.getTime() == date1.getTime())) || (date2 && (date.getTime() == date2.getTime()));
      // var classes = isHighlight ? "dp-highlight" : "";
      return [true, (isHighlight ? "dp-highlight" : "") + (isFirst ? " dp-first" : "")];
      // return [true, isFirst ? "dp-first" : ""];
  }
});