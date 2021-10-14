// catalog.onreadystatechange = () => {
loadedCatalog.finally(() => {
	const allCarousels = catalog.querySelectorAll(".carousel-wrap");

		// $(document).ready(function(){
	for (let carousel of allCarousels) {
		//number of slides
		const totalSlides = carousel.querySelectorAll("ul li").length;
		//get the slide width
		const sliderWidth = carousel.clientWidth;
		//current position
		let pos = 0;

		// Carousel
		//set width to be "x" times the number of slides
		carousel.querySelector("ul.carousel").style.width = sliderWidth * totalSlides + "px";
		// console.log(carousel.querySelector("ul.carousel").clientWidth);

		//next slide
		carousel.querySelector("#next").onclick = () => {
			slideRight();
		};

		//previous slide
		carousel.querySelector("#previous").onclick = () => {
			slideLeft();
		};




		//for each slide
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
			carousel.querySelector("ul.carousel").style.left = -(sliderWidth*pos) + "px";

			//*> optional
			// countSlides();
			pagination();
		}
		
		//SLIDE RIGHT
		function slideRight(){
			pos++;
			if(pos==totalSlides){ pos = 0; }
			carousel.querySelector("ul.carousel").style.left = -(sliderWidth*pos) + "px";

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