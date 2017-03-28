function SVGSymbol(_paper,elems){
	var svg = paper.project.importSVG(elems[0]);
	svg.onFrame = function() {
		svg.rotate(1);
	}
}

window.onload = function () {
	var draw = SVG('drawing');
	var client = new XMLHttpRequest();
	client.open('GET', 'http://localhost:8000/circle.svg');
	client.setRequestHeader("Content-Type", "image/svg+xml");
	client.addEventListener("load", function(event) {
		var svg = draw.svg(client.responseText);
	});
	client.send();
	}