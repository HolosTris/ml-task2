loadedCatalog.finally(() => {
	const allCarousels = catalog.querySelectorAll(".carousel-wrap");

	for (let carousel of allCarousels) {
		const carouselCanvas = carousel.querySelector("ul.carousel");
		//number of slides
		const totalSlides = carousel.querySelectorAll("ul li").length;
		//get the slide width
		const sliderWidth = carousel.clientWidth;
		//current position
		let pos = 0;

		// Carousel
		carouselCanvas.style.width = sliderWidth * totalSlides + "px";

		//next slide
		carousel.querySelector("#next").onclick = () => {
			slideRight();
		};

		//previous slide
		carousel.querySelector("#previous").onclick = () => {
			slideLeft();
		};

		//swiping slides
		let prevX;
		carouselCanvas.onpointerdown = function(ev) {
			prevX = ev.clientX;
			this.setPointerCapture(ev.pointerId);
		}
		carouselCanvas.onpointerup = function(ev) {
			if (ev.clientX - prevX < 0) slideRight();
			else if (ev.clientX - prevX > 0) slideLeft();
		}

		carousel.querySelectorAll("ul li").forEach(() => {
			//create a pagination
			const li = document.createElement("li");
			carousel.querySelector("#pagination-wrap ul").append(li);
		});

		//counter
		// countSlides();

		//pagination
		pagination();

		//hide/show controls/btns when hover

		carousel.onmouseover = function() { this.classList.add("active"); }
		carousel.onmouseout = function() { this.classList.remove("active"); }

		//pause automatic slide when hover
		// let autoSlider = setInterval(slideRight, 3000);

		// carousel.addEventListener("mouseover", function() {
		// 	clearInterval(autoSlider);
		// })
		// carousel.addEventListener("mouseout", function() {
		// 	autoSlider = setInterval(slideRight, 3000);
		// })
		
		//SLIDE LEFT
		function slideLeft(){
			pos--;
			if(pos==-1){ pos = totalSlides-1; }
			carouselCanvas.style.left = -(sliderWidth*pos) + "px";

			// countSlides();
			pagination();
		}
		
		//SLIDE RIGHT
		function slideRight(){
			pos++;
			if(pos==totalSlides){ pos = 0; }
			carouselCanvas.style.left = -(sliderWidth*pos) + "px";

			//*> optional
			// countSlides();
			pagination();
		}

		 //*> OPTIONAL SETTINGS
		// function countSlides(){
		// 	carousel.querySelector("#counter").innerHTML = pos+1 + " / " + totalSlides;
		// }

		function pagination(){
			carousel.querySelectorAll("#pagination-wrap ul li").forEach(li => li.classList.remove("active"));
			carousel.querySelectorAll("#pagination-wrap ul li")[pos].classList.add("active");
		}
	}
});
// }