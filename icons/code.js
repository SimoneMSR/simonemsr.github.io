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
	loadSVG('./assets/stripes.svg',animateStripes);
	loadSVG('./assets/slack.svg',drawSlack);
	//drawStripes();

	function drawSlack() {
		self.elements.linee={};
		self.elements.punti={};
		SVG.get("layer1").scale(0.5);
		SVG.get("linee").hide();
		initializeElements();
		ruotaPunti();

	}

	function animateStripes(){
		SVG.get("stripes").move(0,0);
		self.elements.stripes ={};
		self.elements.stripes.menu = SVG.get("menu").hide();
		self.elements.stripes.long = SVG.get("lunghi").hide();
		self.elements.stripes.short = SVG.get("corti");
		self.elements.stripes.short_original = SVG.get("corti").clone().hide();
		for(var child of self.elements.stripes.short.children()){
			var delay = randomBetween(1000,2000);
			var duration = randomBetween(3000,5000);
			beLike(child.delay(delay).animate(duration,'swingTo'),select(self.elements.stripes.long,"." + child.node.classList[0])).loop(true,true);
		}
		var stripes_colours = ['azzurro','celeste','fango','verde','cammello'];
		for(let stripe of stripes_colours){
			self.elements.stripes.menu[stripe] = get(self.elements.stripes.menu,stripe);
			self.elements.stripes.short[stripe] = select(self.elements.stripes.short,"."+stripe);
			self.elements.stripes.short[stripe].mouseover(function(){
				self.elements.stripes.short[stripe].finish();
				self.elements.stripes.short[stripe].front();
				beLike(self.elements.stripes.short[stripe].animate(),self.elements.stripes.menu[stripe]);
			});
			self.elements.stripes.short[stripe].mouseout(function(){
				self.elements.stripes.short[stripe].finish();
				beLike(self.elements.stripes.short[stripe].animate(200),select(self.elements.stripes.short_original,"."+stripe))
				.after(function(){
					beLike(self.elements.stripes.short[stripe].animate(randomBetween(3000,5000),'swingTo'),select(self.elements.stripes.long,"." + stripe)).loop(true,true);
				});
			});
		}

	}

	function drawStripes(){
		self.elements.stripes = self.draw.group();
		addLineFunction(self.elements.stripes);
		var length = 10;
		self.elements.stripes.lineSize(1,0,length,0,1).stroke({ width: 2, color : '#92a168' });
		self.elements.stripes.lineSize(1,2,length,2,1).stroke({ width: 3, color : '#959349' });
		self.elements.stripes.lineSize(1,3,length,3,1).stroke({ width: 5, color : '#499559' });
		self.elements.stripes.lineSize(1,5,length,5,1).stroke({ width: 4.5 , color : '#498595'});
		self.elements.stripes.lineSize(1,4.5,length,4.5,1).stroke({ width: 7 , color : '#68a198'});
	}

	function initializeElements(){
		self.elements.linee.gruppo = SVG.get("linee");
		self.elements.linee.gialla = SVG.get("linea-gialla");
		self.elements.linee.verde = SVG.get("linea-verde");
		self.elements.linee.celeste = SVG.get("linea-celeste");
		self.elements.linee.fucsia = SVG.get("linea-fucsia");
		self.elements.punti.gruppo = SVG.get("punti");
		self.elements.punti.gialla = SVG.get("giallo").clone();
		self.elements.punti.verde = get(self.elements.punti.gruppo,"verde").clone();
		self.elements.punti.celeste = get(self.elements.punti.gruppo,"celeste").clone();
		self.elements.punti.fucsia = SVG.get("fucsia").clone();
		self.elements.punti.centro = {};
		self.elements.punti.centro.gialla = SVG.get("giallo-1").hide();
		self.elements.punti.centro.verde = SVG.get("verde-1").hide();
		self.elements.punti.centro.fucsia = SVG.get("fucsia-1").hide();
		self.elements.punti.centro.celeste = SVG.get("celeste-1").hide();
		SVG.get("giallo").hide();
		get(self.elements.punti.gruppo,"verde").hide();
		get(self.elements.punti.gruppo,"celeste").hide();
		SVG.get("fucsia").hide();
		
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

	function addLineFunction(object){
		object.lineSize = function(x1,y1,x2,y2,size){
			return this.line(x1*size, y1*size,x2*size,y2*size);
		}	
	}

	function initializeElements2(){
		var size=100;
		var width=20 ;
		self.elements.linee.gruppo = self.draw.group();
		addLineFunction(self.elements.linee.gruppo);
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
		beLike(self.elements.punti.verde.animate(300,'>'),get(self.elements.punti.gruppo,"verde"));
		beLike(self.elements.punti.celeste.animate(300,'>'),get(self.elements.punti.gruppo,"celeste"))
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
		beLike(self.elements.punti.celeste.animate(800,'>'),get(self.elements.punti.gruppo,"celeste"));
		return beLike(self.elements.punti.verde.animate(800,'>'),get(self.elements.punti.gruppo,"verde"));
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