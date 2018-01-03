var sel = ''; // selection 
var highlighted = false; // highlight check
var menuOn = false; // tools menu status
var animating = false; // animation lock

var HICOLOR = "yellow";

var saveNode = null;

var dirtyText = {};


// mouse over resource -> addhighlightlistener
// highlighted -> turn off highlight addEventListener
// if mousedown not on toggle -> turn off menu, turn on highlight listener



$(function() {

	$("#resource").hover(function() {
		// console.log(saveNode);
	});

	$(document).mouseup(function() {
		onHighlight();
		// hideTools();
	});


	var offsetLeft = $('#resource').offsetLeft;


	$("#resource-container").scroll(function() {
		if (menuOn == true && animating == false) {
			animating = true;
			hideTools();
			releaseSelection();
			animating = false;
		}
	});


});


/***************************************************/
/* Highlighting */
/***************************************************/

function onHighlight(e) {
    sel = document.getSelection();
    if (sel) {
    	if (menuOn) {
    		hideTools();
    	}
    	loadTools(sel);
    	menuOn = true;
    	highlighted = true;
    } 
    // document.getElementById('input').value = t;
}

// function highlightText() {
// 	// Get Selection
//     sel = window.getSelection();
//     if (sel.rangeCount && sel.getRangeAt) {
//         range = sel.getRangeAt(0);
//     }
//     // Set design mode to on
//     document.designMode = "on";
//     if (range) {
//     	console.log(range);
//         sel.removeAllRanges();
//         sel.addRange(range);
//     }
//     // Colorize text
//     document.execCommand("hiliteColor", false, HICOLOR);
//     // Set design mode to off
//     document.designMode = "off";
//     releaseSelection();
// }

function getChildNumber(node) {
	return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}

function getChild(num) {
	return 
}

function highlightText(page, start, end) {
	var page = $('#resource').get(page);
	console.log()
}

function removeHighlight() {

}

function highlightText() {
	sel = window.getSelection();
	if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
   	document.designMode = "on";
    if (range) {
    	console.log(range.endOffset);
    	var index = $(range.startContainer.parentNode).index();
    	var start = range.startContainer.parentNode;
    	var startDiv = getChildNumber(start); // save 
    	var startOffset = range.startOffset; // save

    	var endOffset = range.endOffset; // save
    	var end = range.endContainer.parentNode; 
    	var endDiv = getChildNumber(end); // save
    	

    	var pageNum = getChildNumber(sel.anchorNode.parentNode.offsetParent.offsetParent); // save



    	

    	$start = $(start);

    	if (startDiv == endDiv) {
    		console.log(startOffset);
    		console.log(endOffset)
    		$start.html($start.html().slice(0, startOffset) + '<span class=\"highlight\">' 
    				+ $start.html().slice(startOffset, endOffset) + '</span>' + $start.html().slice(endOffset) );
    	} else {
    		console.log($start.html().slice(0, startOffset) + '<span class=\"highlight\">' + $start.html().slice(startOffset) + '</span>');
    		$start.html($start.html().slice(0, startOffset) + '<span class=\"highlight\">' + $start.html().slice(startOffset) + '</span>');
    		$start = $start.next();
	    	for (var i = startDiv + 1; i < endDiv; i++) {
	    		startOffset = 1;
	    		$start.html('<span class=\"highlight\">' + $start.html() + '</span>');
	    		$start = $start.next();
	    	}	
    		$end = $(end);
    		$end.html('<span class=\"highlight\">' + $end.html().slice(0, endOffset) + '</span>' + $end.html().slice(endOffset));
    	}

    }

    // Colorize text
    // document.execCommand("hiliteColor", false, HICOLOR);
    // Set design mode to off
    releaseSelection();
}

function releaseSelection() {
	if (window.getSelection) {
	  if (window.getSelection().empty) {  // Chrome
	    window.getSelection().empty();
	  } else if (window.getSelection().removeAllRanges) {  // Firefox
	    window.getSelection().removeAllRanges();
	  }
	} else if (document.selection) {  // IE?
	  document.selection.empty();
	}
}




/***************************************************/
/* Tools */
/***************************************************/

function hideTools() {
	$(".tools-menu").remove();
	menuOn = false;
}

function moveTools() {

}

function loadTools(sel) {
	if (sel.toString() == "") return;
	if (sel.anchorNode == undefined || sel.anchorNode.parentNode == undefined 
		|| sel.anchorNode.parentNode.offsetParent == undefined
		|| sel.anchorNode.parentNode.offsetParent.offsetParent == undefined) {
		return;
	}
	var page = sel.anchorNode.parentNode.offsetParent.offsetParent;
	var menu = document.createElement("div");
	menu.setAttribute("class", "tools-menu");


	// div create: highlight / icon
	var highlight = document.createElement("div");
	highlight.setAttribute("class", "tools-button");
	highlight.setAttribute("id", "highlightButton");
	var highlightIMG = document.createElement("img");
	highlightIMG.setAttribute("src", "plus.png");
	highlightIMG.setAttribute("class", "tools-icon tools-highlight white");

	// highlight tool event handler
	highlight.onmouseup = function(e) {
		highlightText();
		hideTools();
		e.stopPropagation();
	}
	
	highlight.append(highlightIMG);


	// div create: comment / icon
	var comment = document.createElement("div");
	comment.setAttribute("class", "tools-button");
	comment.setAttribute("id", "commentButton");
	var commentIMG = document.createElement("img");
	commentIMG.setAttribute("src", "comment.png");
	commentIMG.setAttribute("class", "tools-icon tools-comment white");
	
	comment.append(commentIMG);

	// div append: highlight -> menu ; comment -> menu; menu -> page
	menu.append(highlight);
	// menu.append(comment);
	page.append(menu);	


	var top = parseInt(sel.anchorNode.parentElement.style.top.slice(0, -2)) + "px";
	var left = 0;
	menu.setAttribute("style", "top: "+top+"; left: "+left+";");
	
}


/***************************************************/
/* Commenting */
/***************************************************/

function saveHighlight(div) {

}

function onHover() {
	
}

function commentPos(sel) {
	// find location of comment on nav, given selection
}

function loadComment() {
	// comment data:
	// - comment id 
	// - resource id
	// - question title
	// - question content 
	// - selection data
	// - time stamp
	// - discussion 
	// 

	// div number 
	// offset first
	// num divs
	// offset last

	// render comment
	
}




