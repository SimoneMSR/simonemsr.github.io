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
	loadSVG('./assets/slack.svg',initSVGFile);
	function initSVGFile() {
		self.elements.linee={};
		self.elements.punti={};
		SVG.get("layer1").scale(0.5);
		var m = new SVG.Matrix(SVG.get("layer1").node.getCTM());
		SVG.get("linee").hide();
		self.elements.linee.gruppo=SVG.get("linee");
		self.elements.linee.gialla = SVG.get("linea-gialla");
		self.elements.linee.verde = SVG.get("linea-verde");
		self.elements.linee.celeste = SVG.get("linea-celeste");
		self.elements.linee.fucsia = SVG.get("linea-fucsia");
		self.elements.punti.gruppo=SVG.get("punti");
		self.elements.punti.gialla = SVG.get("giallo").clone();
		self.elements.punti.verde = SVG.get("verde").clone();
		self.elements.punti.celeste = SVG.get("celeste").clone();
		self.elements.punti.fucsia = SVG.get("fucsia").clone();
		SVG.get("giallo").hide();
		SVG.get("verde").hide();
		SVG.get("celeste").hide();
		SVG.get("fucsia").hide();
		ruotaPunti();

	}

	function ruotaPunti(){
		beLike(self.elements.punti.fucsia.animate(800),SVG.get("fucsia"));
		beLike(self.elements.punti.gialla.animate(800),SVG.get("giallo"));
		beLike(self.elements.punti.verde.animate(800),SVG.get("verde"));
		beLike(self.elements.punti.celeste.animate(800),SVG.get("celeste"))
			.afterAll(function(){
				self.elements.punti.gruppo.animate(1000,'>',300).rotate(360).animate(900,'>').rotate(270)
				.afterAll(function(){
					estendiPunti(800)
					.afterAll(function (){
						setTimeout(ruotaPunti,0);
					});

				});
			});

	}



	function estendiPunti(speed){
		self.elements.punti.fucsia.animate(speed,'>',0).plot(self.elements.linee.fucsia.array().toString());
		self.elements.punti.gialla.animate(speed,'>',0).plot(self.elements.linee.gialla.array().toString());
		self.elements.punti.verde.animate(speed,'>',0).plot(self.elements.linee.verde.array().toString());
		return self.elements.punti.celeste.animate(speed,'>',0).plot(self.elements.linee.celeste.array().toString());
	}
}