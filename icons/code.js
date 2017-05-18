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
	//drawEasingTests();
	loadSVG('./assets/stripes.svg');
	loadSVG('./assets/slack.svg',drawSlack);

	function drawSlack() {
		self.elements.linee={};
		self.elements.punti={};
		SVG.get("layer1").scale(0.5);
		SVG.get("linee").hide();
		initializeElements();
		SVG.get("giallo").hide();
		SVG.get("verde").hide();
		SVG.get("celeste").hide();
		SVG.get("fucsia").hide();
		ruotaPunti();

	}

	function initializeElements(){
		self.elements.linee.gruppo = SVG.get("linee");
		self.elements.linee.gialla = SVG.get("linea-gialla");
		self.elements.linee.verde = SVG.get("linea-verde");
		self.elements.linee.celeste = SVG.get("linea-celeste");
		self.elements.linee.fucsia = SVG.get("linea-fucsia");
		self.elements.punti.gruppo = SVG.get("punti");
		self.elements.punti.gialla = SVG.get("giallo").clone();
		self.elements.punti.verde = SVG.get("verde").clone();
		self.elements.punti.celeste = SVG.get("celeste").clone();
		self.elements.punti.fucsia = SVG.get("fucsia").clone();
		self.elements.punti.centro = {};
		self.elements.punti.centro.gialla = SVG.get("giallo-1").hide();
		self.elements.punti.centro.verde = SVG.get("verde-1").hide();
		self.elements.punti.centro.fucsia = SVG.get("fucsia-1").hide();
		self.elements.punti.centro.celeste = SVG.get("celeste-1").hide();
		
	}

	function drawEasingTests(){
		SVG.easing['elastic2'] = function(pos) {
			if(pos == !!pos)
				console.log(pos );

			if (pos == !!pos) return pos
				return Math.pow(2, -5 * pos) * Math.sin((pos - 0.075) * (2 * Math.PI) / .3) + 1
		}
		SVG.easing['elastic2'] = function(pos) {
			var frequency = 0.3;
			var frequencyOut=0.1;
			if(pos == !!pos)
				console.log(pos );

			if (pos == !!pos) return pos;
			if(pos<0.75)
				return Math.pow(1.7, -5 * pos) * Math.sin((pos - 0.075) * (2 * Math.PI) / frequency) + 1;
			return Math.pow(1.7, -5 * pos) * Math.sin((pos - 0.075) * (2 * Math.PI) / frequencyOut) + 1;
		}
		var easingFunctions = ['bounce', 'sinInOut', 'quadIn','quadOut','quadInOut','cubicIn','cubicOut','cubicInOut','quartIn','quartOut','quartInOut','quintIn','quintOut','quintInOut','sineIn','sineOut','sineInOut','expoIn','expoOut','expoInOut','circIn','circOut','circInOut','backIn','backOut','backInOut','swingFromTo','swingFrom','swingTo','bounce','bounceOut','elastic']
		easingFunctions = ['swingTo','bounce','bounceOut','elastic','elastic2','bounceOut2'];
		var size = 40;
		var i=0;
		self.elements.easing = self.draw.group();
		for(;i<easingFunctions.length;i++){
			var elem = self.elements.easing.rect(size,size).fill('pink').move(10*size,i*size+5);
			elem.monty_index = i;
			elem.click(function (){
				this.animate(1000,easingFunctions[this.monty_index]).move(20*size,this.monty_index*size+5)
				.delay(500).animate(1).move(10*size,this.monty_index*size+5);
			});
		}
	}

	function initializeElements2(){
		var size=100;
		var width=20 ;
		self.elements.linee.gruppo = self.draw.group();
		self.elements.linee.gruppo.lineSize = function(x1,y1,x2,y2,size){
			return this.line(x1*size, y1*size,x2*size,y2*size);
		}
		self.elements.linee.gialla = self.elements.linee.gruppo.lineSize(1, 0, 1,3,size).stroke({ width: width }).toPath(true);
		self.elements.linee.verde = self.elements.linee.gruppo.lineSize(2, 0, 2,3,size).stroke({ width: width }).toPath(true);
		self.elements.linee.fucsia = self.elements.linee.gruppo.lineSize(0, 2, 3,2,size).stroke({ width: width }).toPath(true);
		self.elements.linee.celeste = self.elements.linee.gruppo.lineSize(0, 1, 3,1,size).stroke({ width: width }).toPath(true);
		self.elements.linee.gruppo.hide();
		self.elements.punti.gruppo = self.draw.group();
		self.elements.punti.gruppo.pointSize = function(x1,y1,size){
			return this.circle(width).move(x1*size,y1*size);
		}
		self.elements.punti.gialla = self.elements.punti.gruppo.pointSize(1,0,size).toPath(true).attr('id','giallo').clone();
		self.elements.punti.verde = self.elements.punti.gruppo.pointSize(2,3,size).toPath(true).attr('id','verde').clone();
		self.elements.punti.celeste = self.elements.punti.gruppo.pointSize(0,2,size).toPath(true).attr('id','celeste').clone();
		self.elements.punti.fucsia = self.elements.punti.gruppo.pointSize(3,1,size).toPath(true).attr('id','fucsia').clone();
	}

	function ruotaPunti(){
		beLike(self.elements.punti.fucsia.animate(300,'>'),SVG.get("fucsia"));
		beLike(self.elements.punti.gialla.animate(300,'>'),SVG.get("giallo"));
		beLike(self.elements.punti.verde.animate(300,'>'),SVG.get("verde"));
		beLike(self.elements.punti.celeste.animate(300,'>'),SVG.get("celeste"))
		.afterAll(function(){
			self.elements.punti.gruppo.animate(1000,'>').rotate(360)
			.once(0.3,function(){
				
				//appiattisciPunti(17.5);
			})
			.after(function(){
				//appiattisciPunti(-17.5);
			})
			.animate(600,'>').rotate(270)
			.once(0.3, function(){
				goToCenter();
			})
			.afterAll(function(){
				goToPerifery()
				.after(function(){
					estendiPunti(800)
					.after(function (){
						setTimeout(ruotaPunti,0);
					});

				})
			})


		});

	}

	function goToCenter(){
		beLike(self.elements.punti.fucsia.animate(800,'>'),self.elements.punti.centro.fucsia);
		beLike(self.elements.punti.verde.animate(800,'>'),self.elements.punti.centro.verde);
		beLike(self.elements.punti.gialla.animate(800,'>'),self.elements.punti.centro.gialla);
		beLike(self.elements.punti.celeste.animate(800,'>'),self.elements.punti.centro.celeste);
	}

	function goToPerifery(){
		beLike(self.elements.punti.fucsia.animate(800,'>'),SVG.get("fucsia"));
		beLike(self.elements.punti.gialla.animate(800,'>'),SVG.get("giallo"));
		beLike(self.elements.punti.celeste.animate(800,'>'),SVG.get("celeste"));
		return beLike(self.elements.punti.verde.animate(800,'>'),SVG.get("verde"));
	}



	function estendiPunti(speed){
		self.elements.punti.fucsia.animate(speed,'>',0).plot(self.elements.linee.fucsia.array().toString());
		self.elements.punti.gialla.animate(speed,'>',0).plot(self.elements.linee.gialla.array().toString());
		self.elements.punti.verde.animate(speed,'>',0).plot(self.elements.linee.verde.array().toString());
		return self.elements.punti.celeste.animate(speed,'>',0).plot(self.elements.linee.celeste.array().toString());
	}

	function appiattisciPunti(number){
		//self.elements.punti.fucsia.animate(100,'>').transform({ skewX: number },true);
		self.elements.punti.verde.animate(100,'>').transform({ skewX: number }, true);
		self.elements.punti.gialla.animate(100,'>').transform({ skewX: number }, true);
		//self.elements.punti.celeste.animate(100,'>').transform({ skewX: number }, true);

	}

	function estendiPunti2(speed){
		return self.elements.punti.fucsia.animate(speed,'>',0).transform({ skewX: 37.5 }, true)
	}
}