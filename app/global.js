//import data from	'./pic.json' assert{ type: "json"} ;

const json = {
	"picture":
	[
		{
			"title"	: "Dream",
			"artist" : "Ha Jung woo",
			"year" : 2010,
			"medium" : "Mixed Media on Plywood",
			"width"	: 65,
			"height" : 88,
			"path" : "./1.png"
		},
		{
			"title"	: "Portrait G",
			"artist" : "Ha Jung woo",
			"year" : 2022,
			"medium" : "Mixed Media on Canvas",
			"width"	: 91,
			"height" : 116.8,
			"path" : "./2.png"
		},
		{
			"title"	: "Work",
			"artist" : "Ha Jung woo",
			"year" : 2018,
			"medium" : "Oil on Canvas",
			"width"	: 76,
			"height" : 101.5,
			"path" : "./3.png"
		},
		{
			"title"	: "Berlin",
			"artist" : "Ha Jung woo",
			"year" : 2012,
			"medium" : "Acrylic, Pen on Canvas",
			"width"	: 139,
			"height" : 178,
			"path" : "./4.png"
		},
		{
			"title"	: "Grapeseed",
			"artist" : "Ha Jung woo",
			"year" : 2019,
			"medium" : "Mixed Media on Canvas",
			"width"	: 45.5,
			"height" : 53.0,
			"path" : "./5.png"
		},
		{
			"title"	: "Untitled",
			"artist" : "Ha Jung woo",
			"year" : 2021,
			"medium" : "Oil on Canvas",
			"width"	: 61,
			"height" : 73,
			"path" : "./6.png"
		},
		{
			"title"	: "Red flower 2",
			"artist" : "Ha Jung woo",
			"year" : 2013,
			"medium" : "Acrylic, Pen on Canvas",
			"width"	: 39,
			"height" : 50,
			"path" : "./7.png"
		},
		{
			"title"	: "Portrait L",
			"artist" : "Ha Jung woo",
			"year" : 2020,
			"medium" : "Mixed Media on Canvas",
			"width"	: 60.6,
			"height" : 72.7,
			"path" : "./8.png"
		},
		{
			"title"	: "Untitled",
			"artist" : "Ha Jung woo",
			"year" : -1,
			"medium" : "Oil on Canvas",
			"width"	: 72.8,
			"height" : 91,
			"path" : "./9.png"
		},
		{
			"title"	: "Untitled",
			"artist" : "Ha Jung woo",
			"year" : 2021,
			"medium" : "Oil on Canvas",
			"width"	: 91,
			"height" : 117,
			"path" : "./10.png"
		},
		{
			"title"	: "Untitled",
			"artist" : "Ha Jung woo",
			"year" : 2021,
			"medium" : "Oil on Canvas",
			"width"	: 61,
			"height" : 73,
			"path" : "./11.png"
		}
	]
};

let images = [];
let mtpos = 0;
let dragzoneClicked = false;
let stime = -1;
let etime;
let curArtworkIndex = 0;
const offsetDesktop = '47.55vw';
//const weightedOffsetDesktop = '54.207vw';