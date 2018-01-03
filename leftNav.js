// $('nav-close').click(function() {

// }

var leftMargin;
var open = false;
var opening = false;


$(function() {
	leftNav();
	$('#left-nav').click(function() {
		if (opening == false) {
			if (open == false) {
				leftNav('open');
			}
			else if (open == true) {
				leftNav('close');
			}
		}
	});
	$('#left-nav').hover(function() {
		if (open = false && opening == false) {

		}
	});

});

// function setMargins() {
// 	$resource = $('#resource-container');
// 	var pdfMove = $(window).width() - $resource.width() - $resource.offset().left;
// 	console.log($resource.width());
// 	var navWidth = pdfMove + document.getElementById('resource-container').offsetLeft;
// 	document.getElementById('left-nav').setAttribute('style', "width: " + navWidth+"px;");
// }

function leftNav(req) {
	opening = true;

	$resource = $('#resource-container');
	var pdfMove = $(window).width() - $resource.width() - $resource.offset().left;
	switch(req) {
		case 'color':
			return;
		case 'open':
			var navWidth = pdfMove + document.getElementById('resource-container').offsetLeft;
			open = true;
			break;
		case 'close':
			var pdfMove = -pdfMove;
			var navWidth = "15px";
			open = false;
			break;
		default: 
			var pdfMove = 0;
			var navWidth = "15px";
			open = false;
			break;
	}

	$resource.velocity(
		{ translateX: pdfMove+"px" },
		{ duration: 100, 
		  easing: "easeInSine" }
		);

	$('#left-nav').velocity(
		{ width: navWidth},
		{ duration: 100, 
		  easing: "easeInSine" }
		);


	opening = false;
}

function closeLeftNav() {
	opening = true;

}

function openLeftNav() {
	opening = true;
	// resource movement	
	$resource = $('#resource-container');
	var rightMargin = $(window).width() - $resource.width() - $resource.offset().left;
	console.log(rightMargin)
	$resource.velocity(
		{ translateX: rightMargin+"px" },
		{ duration: 200, 
		  easing: "easeInSine" }
		);
	// document.getElementById('resource-container').setAttribute('style', "float: right;");

	// left nav movement
	console.log("hello");
	var newWidth = rightMargin + document.getElementById('resource-container').offsetLeft;
	console.log(newWidth)
	$('#left-nav').velocity(
		{ width: newWidth},
		{ duration: 200, 
		  easing: "easeInSine" }
		);
	opening = false;
	open = true;
}

function centerDiv(divId) {
	var div = document.getElementById(divId);
	var WW = window.screen.width;
	leftMargin = (window.screen.width - div.offsetWidth)/2;
	console.log(margin)
	div.setAttribute("style", "margin-left: "+margin+"px;");
}