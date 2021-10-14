loadedCatalog.finally(() => {
	const allCarousels = $('.carousel-wrap');

		$(document).ready(function(){
	for (let carousel of allCarousels) {
		//number of slides
		const totalSlides = $('ul li', carousel).length;
		//get the slide width
		const sliderWidth = $(carousel).width();
		//current position
		let pos = 0;

		// Carousel



			/*****************
			 BUILD THE SLIDER
			*****************/
			//set width to be 'x' times the number of slides
			$('ul.carousel', carousel).width(sliderWidth*totalSlides);

				//next slide
			$('#next', carousel).click(function(){
				slideRight();
			});

			//previous slide
			$('#previous', carousel).click(function(){
				slideLeft();
			});



			/*************************
			 //*> OPTIONAL SETTINGS
			************************/
			//automatic slider
			// var autoSlider = setInterval(slideRight, 3000);

			//for each slide
			$.each($('ul li', carousel), function() {
				//set its color
				// var c = $(this).attr("data-color");
				// $(this).css("background",c);

				//create a pagination
				var li = document.createElement('li');
				$('#pagination-wrap ul', carousel).append(li);
			});

			//counter
			// countSlides();

			//pagination
			pagination();

			//hide/show controls/btns when hover
			//pause automatic slide when hover
			// $(carousel).hover(
			//   function(){ $(this).addClass('active'); clearInterval(autoSlider); },
			//   function(){ $(this).removeClass('active'); autoSlider = setInterval(slideRight, 3000); }
			// );

			$(carousel).hover(
				function(){ $(this).addClass('active'); },
				function(){ $(this).removeClass('active'); }
			);






		/***********
		 SLIDE LEFT
		************/
		function slideLeft(){
			pos--;
			if(pos==-1){ pos = totalSlides-1; }
			$('ul.carousel', carousel).css('left', -(sliderWidth*pos));

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
			$('ul.carousel', carousel).css('left', -(sliderWidth*pos));

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
			$('#pagination-wrap ul li', carousel).removeClass('active');
			$('#pagination-wrap ul li:eq('+pos+')', carousel).addClass('active');
		}
	}
	});//DOCUMENT READY
});