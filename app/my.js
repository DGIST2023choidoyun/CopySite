function ArrangeTitle()	{
	// const letters = document.querySelectorAll('.gallery-title');
	// letters.forEach((letter,	index) => {
	//	   setTimeout(() => {
	//		   const xx = index	* 40;
	//		   letter.classList.add('ani');
	//		   letter.style.left = `${xx}px`;
	//	   }, index	* 30);
	// });
	const titleContainer = document.querySelector('.title-container');
	const norms	= document.querySelector('.title-norm');
	const word = "GALLERY";
	let	xx = 0
	word.split('').forEach((char, index) => {
			const span = document.createElement('span');
			span.textContent = char;
			span.classList.add('gallery-title');
			titleContainer.appendChild(span);

			// let	ix = span.getBoundingClientRect().width;
			// console.log(ix);

			// span.style.left	= `${xx}px`;
			// xx += ix

			// setTimeout(() => {
			// 	ReplayCSSAnimation(span, 'reveal', 0.9, 0, 'cubic-bezier(.25,.75,.5,1)', 'forwards');
			// }, index * 20);
			ReplayCSSAnimation(span, 'reveal', 0.5, index * 0.05, 'cubic-bezier(.25,.75,.5,1)', 'forwards');

		});
}
function ArrangeArtworks() {
	const picture =	json.picture;
	const background = document.querySelector('.background');
	const dragzone = document.querySelector('.drag-zone');
	const boxWrapper = document.querySelector('.display-box-wrapper');
	const box =	document.querySelector('.display-box');
	const bgsz = background.getBoundingClientRect();
	const bar =	document.querySelector('.bar');
	const infoTexts = document.querySelectorAll('.display-box-info');

	InitBar();

	// dragzone.style.width	= bgsz.width * 0.6 * picture.length;

	for	(let index = 0; index <	picture.length;	index++) {
	//for (let index = 0; index	< 1; index++) {
		const span = document.createElement('span');
		const image	= new Image();
		span.appendChild(image);
		dragzone.appendChild(span);

		images.push(span);

		span.classList.add('artwork-wrapper');
		image.classList.add('artwork');

		image.src =	`${picture[index].path}`;
		
		
		image.style.animation =	'weaken-right 0s forwards';
		if (index == 0)
			image.style.animation =	'highlight 0s forwards';

		image.addEventListener('click',	(event)	=> {
			if (dragzoneClicked) {
				if (index <	curArtworkIndex)
					SwipeLeft(document.querySelector('.background').getBoundingClientRect().width *	0.472);
				else if (index > curArtworkIndex)
					SwipeRight(document.querySelector('.background').getBoundingClientRect().width * 0.472);
			}
		});
	}

	AdjustScreen();

	infoTexts[0].textContent = picture[0].title;
	infoTexts[1].textContent = `${picture[0].year}`;
	infoTexts[2].textContent = picture[0].medium;
	infoTexts[3].textContent = `${picture[0].height} x ${picture[0].width} cm`;

}

function SwipeRight() {
	const bar = document.querySelector('.bar');
	const staticBarLeft = Number(bar.style.left.slice(0, -2));
	const curLeft = bar.getBoundingClientRect().left - document.querySelector('.bar-container').getBoundingClientRect().left;
	const barW = bar.getBoundingClientRect().width;

	bar.style.left = `${staticBarLeft + barW}px`;
	bar.style.transform	= `translateX(${curLeft - staticBarLeft - barW}px)`;
	ReplayCSSAnimation(bar,	'swipe', 0.2, 0, 'ease', 'forwards');

	images.forEach((image, index) => {
		const child	= image.children[0];

		const staticImgLeft	= image.style.left;
		const imgLeft =	image.getBoundingClientRect().left;

		//if (index != curArtworkIndex) {
			image.style.left = `calc(${staticImgLeft} - ${offsetDesktop})`;
			image.style.transform =	`translateX(calc(${imgLeft}px - ${staticImgLeft} + ${offsetDesktop}))`;
		//}

		if (index == curArtworkIndex) {
			//image.style.left = `calc(${staticImgLeft} - ${weightedOffsetDesktop})`;
			//image.style.transform =	`translateX(calc(${imgLeft}px - ${staticImgLeft} + ${weightedOffsetDesktop}))`;
		
			ReplayCSSAnimation(child, 'weaken-left', 0.2, 0, 'cubic-bezier(.25,.75,.5,1)',	'forwards');
		}
		else if (index == curArtworkIndex +	1) {

			ReplayCSSAnimation(child, 'highlight-right', 0.2, 0, 'cubic-bezier(.25,.75,.5,1)',	'forwards');
		}

		ReplayCSSAnimation(image, 'swipe', 0.8, 0,	'ease',	'forwards');
	});

	curArtworkIndex++;

	Adjust();
}
function SwipeLeft() {
	const bar = document.querySelector('.bar');
	const staticBarLeft = Number(bar.style.left.slice(0, -2));
	const curLeft = bar.getBoundingClientRect().left - document.querySelector('.bar-container').getBoundingClientRect().left;
	const barW = bar.getBoundingClientRect().width;

	bar.style.left = `${staticBarLeft - barW}px`;
	bar.style.transform	= `translateX(${staticBarLeft - curLeft + barW}px)`;
	ReplayCSSAnimation(bar,	'swipe', 0.2, 0, 'ease', 'forwards');

	images.forEach((image, index) => {
		const child	= image.children[0];

		const staticImgLeft	= image.style.left;
		const imgLeft =	image.getBoundingClientRect().left;

		//if (index != curArtworkIndex - 1) {
			image.style.left = `calc(${staticImgLeft} + ${offsetDesktop})`;
			image.style.transform =	`translateX(calc(${imgLeft}px - ${staticImgLeft} - ${offsetDesktop}))`;
		//}

		if (index == curArtworkIndex) {
			
			ReplayCSSAnimation(child, 'weaken-right', 0.2, 0, 'cubic-bezier(.25,.75,.5,1)', 'forwards');
		}
		else if (index == curArtworkIndex -	1) {
			//image.style.left = `calc(${staticImgLeft} + ${weightedOffsetDesktop})`;
			//image.style.transform =	`translateX(calc(${imgLeft}px - ${staticImgLeft} - ${weightedOffsetDesktop}))`;

			ReplayCSSAnimation(child, 'highlight-left',	0.2, 0, 'cubic-bezier(.25,.75,.5,1)', 'forwards');
		}

		ReplayCSSAnimation(image, 'swipe', 0.8, 0, 'ease', 'forwards');
	});

	curArtworkIndex--;

	Adjust();
}
function Adjust() {
	AdjustInfo();
	AdjustPinkBox();

}
function AdjustPinkBox() {
	const box =	document.querySelector('.display-box');
	// const prevW = boxWrapper.getBoundingClientRect().width;

	InitPinkBoxWrapper();
	document.documentElement.style.setProperty('--startWidth', `${box.getBoundingClientRect().width}px`);
	document.documentElement.style.setProperty('--endWidth', `${document.querySelector('.display-box-wrapper').getBoundingClientRect().width}px`);

	ReplayCSSAnimation(box, 'expand', 0.2, 0, 'linear', 'forwards');

	// ReplayJsAnimation(box,
	// 	[
	// 		{
	// 			width: `${box.getBoundingClientRect().width}px`
	// 		},
	// 		{
	// 			width: `${w}px`
	// 		}
	// 	],
	// 	{
	// 		duration: 200,
	// 		iterations:	1,
	// 		easing:	'linear',
	// 		// easing: 'cubic-bezier(.25,.75,.5,1)',
	// 		fill: 'forwards'
	// 	});
}
function AdjustInfo() {
	const infoTexts = document.querySelectorAll('.display-box-info');

	const artwork = json.picture[curArtworkIndex];
	let filtered = Object.fromEntries(
			Object.entries(artwork).filter(([key, value]) => value !== -1)
		);
	
	delete filtered.path;
	delete filtered.artist;
	filtered['size'] = `${filtered.height} x ${filtered.width} cm`;
	if (Object.keys(filtered).includes('year'))
		filtered['year'] = filtered['year'].toString();
	delete filtered.width;
	delete filtered.height;
	
	let contents = [];
	for (let i = 0; i < infoTexts.length; i++) {
		contents.push(infoTexts[i].textContent);
	}
	const filteredValues = Object.values(filtered);
	for (let i = 0; i < filteredValues.length; i++) {
		if (!contents.includes(filteredValues[i]))
			ReplayCSSAnimation(infoTexts[i], 'reveal', 0.5, 0.3, 'ease', 'forwards');
		infoTexts[i].textContent = filteredValues[i];

	}
	for (let i = filteredValues.length; i < infoTexts.length; i++) {
		infoTexts[i].textContent = '';
	}

}

function AdjustScreen() {

	InitImagesTransform();
	InitPinkBoxWrapper();
	InitBar();

	document.documentElement.style.setProperty('--endWidth', `${document.querySelector('.display-box-wrapper').getBoundingClientRect().width}px`);

	ReplayCSSAnimation(document.querySelector('.display-box'), 'expand', 0, 0, 'linear', 'forwards');
}

function InitPinkBoxWrapper() {
	const boxWrapper = document.querySelector('.display-box-wrapper');
	const bgw = document.querySelector('.background').getBoundingClientRect().width;
	const curImgSz = images[curArtworkIndex].getBoundingClientRect();
	const w = json.picture[curArtworkIndex].width / json.picture[curArtworkIndex].height * curImgSz.height;
	
	boxWrapper.style.width = `calc(2.2vw + ${w}px)`;

	boxWrapper.style.left = `${bgw * 0.499 - boxWrapper.getBoundingClientRect().width * 0.5}px`;
}

function InitImagesTransform() {
	const bgw = document.querySelector('.background').getBoundingClientRect().width;

	images.forEach((image, index) => {
		image.style.width = `${json.picture[index].width / json.picture[index].height * image.getBoundingClientRect().height}px`;

		const w = image.getBoundingClientRect().width;

		image.style.left = `${bgw * 0.499 + (index - curArtworkIndex) * window.innerWidth * 0.4755 - w * 0.5}px`;

	});
	
}

function InitBar() {
	document.querySelector('.bar').style.width	= `${document.querySelector('.bar-container').getBoundingClientRect().width	/ json.picture.length}px`;
}

// document.addEventListener("DOMContentLoaded",
//	function() {
//		const storageRef = storage.ref();
//		//alert(storageRef);
//		const fileRef =	storageRef.child('o/pic.json');
//		//alert(fileRef);
//		const url =	fileRef.getDownloadURL();
//		//alert(url);//err

//		// fetch(url)
//		//	.then(response => response.json())
//		//	.then(json => {
//			const json = fetchJsonFile('pic.json');
//				alert(json);//err

//				const background = document.querySelector('.background');
//				alert(123);
//				const picture =	json.picture;

//				// for (let	index =	0; index < picture.length; index++)	{
//				//	const span = document.createElement('span')
//				//	span.classList.add('')

//				// }
//				const span = document.createElement('span');
//				const leftOffset = background.getBoundingClientRect().width	//*	0.5	- picture[0].width * 0.5;


//				span.src = fetchImageFile('1.png');
//				alert(999);
//				span.textContent = 'das';
//				//span.width = `${100}px`;
//				span.classList.add('artwork');
//				//span.style.left	= `${leftOffset}px`;


//				background.appendChild(span);
//			});

//	//}
// //);

// async function fetchJsonFile(filePath) {
//	const storageRef = storage.ref();
//	const fileRef =	storageRef.child(filePath);

//	try	{
//		const url =	await fileRef.getDownloadURL();

//		   // 파일 다운로드
//		   const response =	await fetch(url);
//		   const data =	await response.json();

//		return data;
//	}
//	catch (error)	{
//	  console.error("Error fetching	JSON file:", error);
//	}
// }
// async function fetchImageFile(filePath) {
//	const storageRef = storage.ref();
//	const fileRef =	storageRef.child(filePath);

//	try	{
//		const url =	await fileRef.getDownloadURL();

//		const response = await fetch(url);
//		const blob = await response.blob();
//		const imageURL = URL.createObjectURL(blob);
//		return imageURL;
//	}
//	catch (error)	{
//	  console.error("Error fetching	JSON file:", error);
//	}
// }
