//current position
var pos = 0;
//number of slides
var totalSlides = $('#slider-wrap ul li').length;
//get the slide width
var sliderWidth = $('#slider-wrap').width();

//Range Slider vars
var rangeL = document.getElementById('range-left');
var rangeR = document.getElementById('range-right');

//Range Slider

if (rangeL != null && rangeR != null) {
  rangeL.oninput = function() {
    this.value=Math.min(this.value,this.parentNode.childNodes[5].value-1);
    var value=(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.value)-(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.min);
    var children = this.parentNode.childNodes[1].childNodes;
    children[1].style.width=value+'%';
    children[5].style.left=value+'%';
    children[7].style.left=value+'%';
    // children[11].style.left=value+'%';
    // children[11].childNodes[1].innerHTML=this.value*500;
    document.getElementById('value-left').innerHTML=this.value*500;
  }

  rangeR.oninput = function() {
    this.value=Math.max(this.value,this.parentNode.childNodes[3].value-(-1));
    var value=(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.value)-(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.min);
    var children = this.parentNode.childNodes[1].childNodes;
    children[3].style.width=(100-value)+'%';
    children[5].style.right=(100-value)+'%';
    children[9].style.left=value+'%';
    // children[13].style.left=value+'%';
    // children[13].childNodes[1].innerHTML=this.value*500;
    document.getElementById('value-right').innerHTML=this.value*500;
  }
}

// Carousel

$(document).ready(function(){


	/*****************
	 BUILD THE SLIDER
	*****************/
	//set width to be 'x' times the number of slides
	$('#slider-wrap ul#slider').width(sliderWidth*totalSlides);

    //next slide
	$('#next').click(function(){
		slideRight();
	});

	//previous slide
	$('#previous').click(function(){
		slideLeft();
	});



	/*************************
	 //*> OPTIONAL SETTINGS
	************************/
	//automatic slider
	// var autoSlider = setInterval(slideRight, 3000);

	//for each slide
	$.each($('#slider-wrap ul li'), function() {
	   //set its color
	   // var c = $(this).attr("data-color");
	   // $(this).css("background",c);

	   //create a pagination
	   var li = document.createElement('li');
	   $('#pagination-wrap ul').append(li);
	});

	//counter
	// countSlides();

	//pagination
	pagination();

	//hide/show controls/btns when hover
	//pause automatic slide when hover
	// $('#slider-wrap').hover(
	//   function(){ $(this).addClass('active'); clearInterval(autoSlider); },
	//   function(){ $(this).removeClass('active'); autoSlider = setInterval(slideRight, 3000); }
	// );

	$('#slider-wrap').hover(
	  function(){ $(this).addClass('active'); },
	  function(){ $(this).removeClass('active'); }
	);



});//DOCUMENT READY



/***********
 SLIDE LEFT
************/
function slideLeft(){
	pos--;
	if(pos==-1){ pos = totalSlides-1; }
	$('#slider-wrap ul#slider').css('left', -(sliderWidth*pos));

	//*> optional
	// countSlides();
	pagination();
}


/************
 SLIDE RIGHT
*************/
function slideRight(){
	pos++;
	if(pos==totalSlides){ pos = 0; }
	$('#slider-wrap ul#slider').css('left', -(sliderWidth*pos));

	//*> optional
	// countSlides();
	pagination();
}




/************************
 //*> OPTIONAL SETTINGS
************************/
// function countSlides(){
// 	$('#counter').html(pos+1 + ' / ' + totalSlides);
// }

function pagination(){
	$('#pagination-wrap ul li').removeClass('active');
	$('#pagination-wrap ul li:eq('+pos+')').addClass('active');
}

// Datepicker
$(function() {
  $(".rangepicker").datepicker({
    minDate: 0,
    maxDate: "+1y",
    beforeShowDay: showHighlites,
    onSelect: function(dateText, inst) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
      var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);

      // $.datepicker._defaults.dateFormat = "dd M";

      console.log($("#input1").val());
      console.log($.datepicker._defaults.dateFormat);

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
    nextText: ""
  });
});

function showHighlites(date) {
    var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
    var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
    var isHighlight = date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2));
    var isFirst = (date1 && (date.getTime() == date1.getTime())) || (date2 && (date.getTime() == date2.getTime()));
    // var classes = isHighlight ? "dp-highlight" : "";
    return [true, (isHighlight ? "dp-highlight" : "") + (isFirst ? " dp-first" : "")];
    // return [true, isFirst ? "dp-first" : ""];
}

/** Display Checkin Datepicker and Checkout DatePicker */
// datePicker();
//
// function datePicker() {
//   $(document).ready(function() {
//     $("#datepicker").datepicker({
//       dateFormat: "MM d, yy",
//       minDate: 0,
//       maxDate: "+3M +0D",
//       beforeShowDay: dateRange,
//       onSelect: DRonSelect,
//       // dateFormat: "dd.mm.yy",
//       // defaultDate: "+1d",
//       // minDate: 0,
//       // maxDate: "+1y",
//       // changeMonth: true,
//       // numberOfMonths: 1,
//       // showButtonPanel: true,
//       // // altField: "#actualDate",
//       // showOtherMonths: true,
//       // // selectOtherMonths: true,
//       // firstDay: 1,
//       // monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
//       // monthNamesShort: [ "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек" ],
//       // dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
//       // currentText: "Очистить",
//       // closeText: "Применить",
//       prevText: "",
//       nextText: "",
//       // gotoCurrent: true
//     });
//   });
// }
//
// function dateRange(date) {
//   var date1 = $.datepicker.parseDate("MM d, yy", $("#checkinDate").text());
//   var date2 = $.datepicker.parseDate("MM d, yy", $("#checkoutDate").text());
//   var isHighlight = date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2));
//   $(document).ready(function() {
//     // $("td.dp-highlight").text("Y");
//
//   });
//   return [true, isHighlight ? "dp-highlight" : ""];
// }
//
// function DRonSelect(dateText, inst) {
//   var date1 = $.datepicker.parseDate("MM d, yy", $("#checkinDate").text());
//   var date2 = $.datepicker.parseDate("MM d, yy", $("#checkoutDate").text());
//   if (!date1 || date2) {
//     $("#checkinDate").text(dateText);
//     $("#checkoutDate").text("");
//     $("#Datepicker").datepicker();
//   } else {
//     if ($.datepicker.parseDate("MM d, yy", $("#checkinDate").text()) >=
//       $.datepicker.parseDate("MM d, yy", dateText)) {
//       $("#checkinDate").text(dateText);
//       $("#checkoutDate").text("");
//       $("#Datepicker").datepicker();
//     } else {
//       $("#checkoutDate").text(dateText);
//       $("#Datepicker").datepicker();
//     }
//   }
// }
//
//
//   $( function() {
//     var dateFormat = "dd.mm.yyyy",
//       from = $( "#from" )
//         .datepicker({
//           dateFormat: "dd.mm.yy",
//           defaultDate: "+1d",
//           // minDate: 0,
//           // maxDate: "+1y",
//           // changeMonth: true,
//           numberOfMonths: 1,
//           showButtonPanel: true,
//           altField: "#actualDate",
//           showOtherMonths: true,
//           // selectOtherMonths: true,
//           firstDay: 1,
//           monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
//           monthNamesShort: [ "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек" ],
//           dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
//           currentText: "Очистить",
//           closeText: "Применить",
//           prevText: "",
//           nextText: "",
//           gotoCurrent: true,
//           // hideIfNoPrevNext: true,
//           // appendText: "(dd.mm.yyyy)",
//           // autoSize: true,
//         })
//         .on( "change", function() {
//           to.datepicker( "option", "minDate", getDate( this ) );
//         }),
//       to = $( "#to" ).datepicker({
//         dateFormat: "dd.mm.yy",
//         defaultDate: "+2d",
//         // minDate: 1,
//         // maxDate: "+1y",
//         // changeMonth: true,
//         numberOfMonths: 1,
//         showButtonPanel: true,
//         showOtherMonths: true,
//         firstDay: 1,
//         monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ],
//         monthNamesShort: [ "янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек" ],
//         dayNamesMin: [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ],
//         currentText: "Очистить",
//         closeText: "Применить",
//         prevText: "",
//         nextText: "",
//         gotoCurrent: true,
//       })
//       .on( "change", function() {
//         from.datepicker( "option", "maxDate", getDate( this ) );
//       });
//
//     function getDate( element ) {
//       var date;
//       try {
//         date = $.datepicker.parseDate( dateFormat, element.value );
//       } catch( error ) {
//         date = null;
//       }
//
//       return date;
//     }
//   } );
