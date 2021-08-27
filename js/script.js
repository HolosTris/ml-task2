//current position
var pos = 0;
//number of slides
var totalSlides = $('#slider-wrap ul li').length;
//get the slide width
var sliderWidth = $('#slider-wrap').width();

var rangeL = document.getElementById('range-left');
var rangeR = document.getElementById('range-right');

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
