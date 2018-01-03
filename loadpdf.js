// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = 'http://www.eecs189.org/static/notes/n25.pdf';

// Disable workers to avoid yet another cross-origin issue (workers need
// the URL of the script to be loaded, and dynamically loading a cross-origin
// script does not work).
// PDFJS.disableWorker = true;

// The workerSrc property shall be specified.
PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';


$(function(){
	loadPDF();

});


function loadPDF() {
	PDFJS.getDocument(url)
		.then(function(pdf) {

		    // Get div#container and cache it for later use
		    var container = document.getElementById("resource");

		    // Loop from 1 to total_number_of_pages in PDF document
		    for (var i = 1; i <= pdf.numPages; i++) {

		        // Get desired page
		        pdf.getPage(i).then(function(page) {

		          	var scale = 1.2;
		          	var viewport = page.getViewport(scale);
		          	var div = document.createElement("div");	


		          	// Set id attribute with page-#{pdf_page_number} format
		          	div.setAttribute("id", "page-" + (page.pageIndex + 1));

		          	// This will keep positions of child elements as per our needs
		          	div.setAttribute("style", "position: relative");

		          	// Append div within div#container
		          	container.appendChild(div);

		          	// Create a new Canvas element
		          	var canvas = document.createElement("canvas");

		          	// Append Canvas within div#page-#{pdf_page_number}
		          	div.appendChild(canvas);

		          	canvas.height = viewport.height;
		          	canvas.width = viewport.width;

		          	var context = canvas.getContext('2d');

		          

		          	var renderContext = {
		            	canvasContext: context,
		            	viewport: viewport
		          	};

		          	// Render PDF page
		          	page.render(renderContext)
					  	.then(function() {
					    	// Get text-fragments
					    	return page.getTextContent();
					  	})
					  	.then(function(textContent) {
					    	// Create div which will hold text-fragments
					    	var textLayerDiv = document.createElement("div");

					    	// Set it's class to textLayer which have required CSS styles
					    	textLayerDiv.setAttribute("class", "textLayer");

					    	// Append newly created div in `div#page-#{pdf_page_number}`
					    	div.appendChild(textLayerDiv);

					    	// Create new instance of TextLayerBuilder class
					    	var textLayer = new TextLayerBuilder({
					      	textLayerDiv: textLayerDiv, 
					      	pageIndex: page.pageIndex,
					      	viewport: viewport
					    	});

					    	// Set text-fragments
					    	textLayer.setTextContent(textContent);

					    	// Render text-fragments
					    	textLayer.render();
					    	// setMargins();
					 	});
		        });
		    }
		});
}

function setMargins() {
	$resource = $('#resource-container');
	var pdfMove = $(window).width() - $resource.width() - $resource.offset().left;
	console.log($resource.width());
	var navWidth = pdfMove + document.getElementById('resource-container').offsetLeft;
	document.getElementById('left-nav').setAttribute('style', "width: " + navWidth+"px;");
}


