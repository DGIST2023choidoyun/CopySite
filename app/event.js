

document.addEventListener("DOMContentLoaded",
	function() {
		ArrangeTitle();
		ArrangeArtworks();

		document.querySelector('.drag-zone').addEventListener("mousedown", (event) => {
			dragzoneClicked	= true;
			mtpos =	event.screenX;
			stime =	new	Date();
		});
		

		// console.log(window.innerWidth + ' ' + window.innerHeight); //1440 731+199(931)
	}
);

document.addEventListener("mousemove", (event) => {
	if (dragzoneClicked) {
		// document.body.style.userSelect =	'none';

		let	gap	= event.screenX	- mtpos;

		if ((curArtworkIndex == 0 && gap > 0) || (curArtworkIndex == json.picture.length - 1 && gap	< 0))
			gap	*= 0.36;

		// const offset	= bgsz * 0.5;
		
		images.forEach((image, index) => {
			// const imgLeft = image.getBoundingClientRect().left;

			image.getAnimations().forEach((animation) => animation.cancel());

			// image.style.left	= `${imgLeft + gap - offset	* curArtworkIndex}px`
			image.style.transform =	`translateX(${gap}px)`;
		});

		// console.log(images[0].getBoundingClientRect().left -	images[1].getBoundingClientRect().left);
	}
});
document.body.addEventListener("mouseup", (event) => {
	if (dragzoneClicked) {
		dragzoneClicked	= false;

		etime =	new	Date();

		const gap =	event.screenX -	mtpos;
		let	thres =	document.querySelector('.background').getBoundingClientRect().width * 0.25;
		console.log(document.querySelector('.background').getBoundingClientRect().width);

		if (Math.abs(gap) <	thres)
			thres *= (etime	- stime) / 300;	// For flicking	screen to swipe

		if (gap != 0 && gap < thres && gap > -thres || (curArtworkIndex == 0 && gap > 0) || (curArtworkIndex == json.picture.length - 1 && gap < 0)) {

			images.forEach((image, index) => {

				// image.getAnimations().forEach((animation) => animation.cancel());
				ReplayCSSAnimation(image, 'swipe', 0.7,	0, 'ease', 'forwards');
			});
			
		}
		else if (gap < -thres) { // l2r
			SwipeRight();
		}
		else if (gap > thres) {	// r2l
			SwipeLeft();
		}
	}
});
document.addEventListener('keydown', (event) => {
	
	if (event.key == 'ArrowRight' && curArtworkIndex < images.length - 1) {	// l2r

		SwipeRight();
	}
	else if (event.key == 'ArrowLeft' && curArtworkIndex > 0) {	// r2l

		SwipeLeft();
	}
});


window.addEventListener("resize", function()	{
	AdjustScreen();
});