function SVGSymbol(_paper,elems){
	var svg = paper.project.importSVG(elems[0]);
	svg.onFrame = function() {
		svg.rotate(1);
	}
}

window.onload = function () {
	var self=this;
	var draw = SVG('drawing');
	var client = new XMLHttpRequest();
	client.open('GET', 'http://localhost:8000/circle.svg');
	client.setRequestHeader("Content-Type", "image/svg+xml");
	client.addEventListener("load", function(event) {
		var svg = draw.svg(client.responseText);
		var svg_flip = SVG.get("#layer3");
		svg_flip.hide();
		var path_ids= ["use3850", 
		"use3976"
		,"use3978"
		,"use3980"
		,"use3982"
		,"use3984"
		,"use3986"
		,"use3988"
		,"use3990"
		,"use3992"
		,"use3994"
		,"use3996"];
		var flippet_path_ids =["use3850-3"
		,"use3976-6"
		,"use3978-0"
		,"use3980-6"
		,"use3982-2"
		,"use3984-6"
		,"use3986-1"
		,"use3988-8"
		,"use3990-7"
		,"use3992-9"
		,"use3994-2"
		,"use3996-0"];

		for( index in path_ids){
			var path = SVG.get("#" + path_ids[index]);
			var path_flip = SVG.get("#" + flippet_path_ids[index]);
			path.animate(3000, '>', 1000).plot(path_flip.array().toString());
		}


		//SVG.get("#use3850").animate(2000, '>', 1000).flip(450);
	});
	client.send();
}