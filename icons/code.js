var self = this;
self.elements={};

function idsLike(element,pattern){
	var nodes= element.querySelectorAll('*'),
	L= nodes.length, A= [], temp;
	while(L){
		var temp= nodes[--L].id || '';
		if(pattern.test(temp)) 
			A.push(temp);
	}
	return A;
}

function loadSVG(filename,callback){
	var client = new XMLHttpRequest();
	client.open('GET', filename);
	client.setRequestHeader("Content-Type", "image/svg+xml");
	client.addEventListener("load", function(event) {
		var svg = self.draw.svg(client.responseText);
		if(callback)
			callback(svg);
	});
	client.send();
}

window.onload = function () {
	self.draw = SVG('drawing');
	loadSVG('/assets/slack.svg',initSVGFile);
	function initSVGFile() {
		self.elements.linee={};
		self.elements.punti={};
		SVG.get("linee").hide();
		SVG.get("giallo-0").hide();
		self.elements.linee=SVG.get("linee");
		self.elements.linee.gialla = SVG.get("linea-gialla");
		self.elements.linee.verde = SVG.get("linea-verde");
		self.elements.linee.celeste = SVG.get("linea-celeste");
		self.elements.linee.fucsia = SVG.get("linea-fucsia");
		self.elements.punti.gruppo=SVG.get("punti");
		self.elements.punti.gialla = SVG.get("giallo");
		self.elements.punti.verde = SVG.get("verde");
		self.elements.punti.celeste = SVG.get("celeste");
		self.elements.punti.fucsia = SVG.get("fucsia");
		self.elements.punti.gruppo.animate(600,'>', 1000).rotate(360).animate(500,'>').rotate(270)
			.afterAll(function(){
				self.elements.punti.gialla.animate(1000,'<>',0).plot(SVG.get("giallo-0").array().toString()).move(0,0);
			});
	}

	function animateRays(){
		for( index in self.ray_path_ids){
			var path = self.elements.sun.select("#" + self.ray_path_ids[index]).get(0);
			path.hide();
			//var path_flip = SVG.get("#" + flipped_ray_path_ids[index]);
			//path.animate(1000, '<>', 0).plot(path_flip.array().toString()).loop(true,true);
		}
	}


	function becomeLike(_this,thisElement){
		var i =0;
		if(this.animateSquarePath != undefined)
			this.animate(1000, '<>', 0).plot(this.animateSquarePath.array().toString()).loop(true,true);
	}

}