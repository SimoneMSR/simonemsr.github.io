window.onload = init;
self = window.advertise = {
	elements : {}
};

function init(){
	self.draw= SVG('drawing');
	loadSVG("./assets/pack.svg", drawPack);
}

function drawPack(){
	self.svg = SVG.get("svg2").size('50%','50%').dmove('25%','25%');
	self.elements.documenti = SVG.get("documenti").hide();
	self.elements.piccolo_pack = SVG.get("piccolo-pack").hide();
	self.elements.portachiavi  = SVG.get("portachiavi").hide();
	self.groups = {};
	self.groups.ellissi = {};
	self.groups.ellissi.piccolo_pack = SVG.get("ellipse-piccolo-pack");
	self.elements.piccolo_pack.originalPosition={x:-80, y:170};
	self.elements.documenti.originalPosition={x:-250, y:170};
	self.elements.portachiavi.originalPosition={x:70, y:30};
	for(let el of Object.keys(self.elements)){
		el = self.elements[el];
		el.finalPosition = {x:el.x(), y:el.y()};
		el.attr({'transform' : ''});
		el.move(el.originalPosition.x,el.originalPosition.y);
	}
	openAll();
}

function openAll(){
	openSingle(self.elements.portachiavi)
	.afterAll(function(){
		openSingle(self.elements.documenti)
		.afterAll(function(){
			openSingle(self.elements.piccolo_pack)
			.afterAll(function(){
				setTimeout(closeAll,1000)
			});
		})
	})
}

function closeAll(){
	closeSingle(self.elements.piccolo_pack)
	.afterAll(function(){
		closeSingle(self.elements.documenti)
		.afterAll(function(){
			closeSingle(self.elements.portachiavi)
			.afterAll(function(){
				setTimeout(openAll,2000)
			});
		})
	})
}

function openSingle(element){
	return element
	.show().animate(200)
	.move(element.finalPosition.x, element.finalPosition.y);
}

function closeSingle(element){
	return element
	.animate(200)
	.move(element.originalPosition.x,element.originalPosition.y)
	.afterAll(element.hide)
}