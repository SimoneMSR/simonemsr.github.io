function SVGSymbol(_paper,elems){
	var svg = paper.project.importSVG(elems[0]);
	svg.onFrame = function() {
		svg.rotate(1);
	}
}

function idsLike(pattern){
	var nodes= document.body.getElementsByTagName('*'),
	L= nodes.length, A= [], temp;
	while(L){
		var temp= nodes[--L].id || '';
		if(pattern.test(temp)) 
			A.push(temp);
	}
	return A;
}

function findSquares(){

}

window.onload = function () {
	var self=this;
	var draw = SVG('drawing');
	var client = new XMLHttpRequest();
	client.open('GET', 'sun.svg');
	client.setRequestHeader("Content-Type", "image/svg+xml");
	client.addEventListener("load", function(event) {
		var svg = draw.svg(client.responseText);
		var svg_flip = SVG.get("#layer3");
		svg_flip.hide();
		var ray_path_ids= ["use3850", 
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
		var flipped_ray_path_ids =["use3850-3"
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
		var ray_square_ids = idsLike(/^path[0-9]*$/).sort();
		var flipped_ray_square_ids = idsLike(/^path[0-9]*\-/).sort();
		var group = idsLike(/^g11998/)[0];

		for( index in ray_path_ids){
			var path = SVG.get("#" + ray_path_ids[index]);
			path.hide();
			//var path_flip = SVG.get("#" + flipped_ray_path_ids[index]);
			//path.animate(1000, '<>', 0).plot(path_flip.array().toString()).loop(true,true);
		}

		for(index in ray_square_ids){
			var path = SVG.get("#" + ray_square_ids[index]);
			var path_flip = SVG.get("#" + flipped_ray_square_ids[index]);
			path.animate(1000, '<>', 0).plot(path_flip.array().toString()).loop(true,true);
		}

		var circle = SVG.get("#cerchio");
		circle.animate(1000, '<>', 0).rotate(50).loop(true,true);


		//SVG.get("#use3850").animate(2000, '>', 1000).flip(450);
	});
	client.send();
}