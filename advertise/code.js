window.onload = init;
self = window.advertise = {
	elements : {}
};

function init(){
	self.draw= SVG('drawing');
	loadSVG("./assets/pack.svg", drawPack);
}

function drawPack(){
	self.elements.svg = SVG.get("svg2").size('50%','50%').dmove('25%','25%');
	self.elements.documenti = SVG.get("documenti").hide();
	self.elements.piccolo_pack = SVG.get("piccolo-pack").hide();
	self.elements.portachiavi  = SVG.get("portachiavi").hide();
	self.elements.ellissi = {};
	self.elements.ellissi.piccolo_pack = SVG.get("ellipse-piccolo-pack");
	self.elements.piccolo_pack.originalPosition=[self.elements.piccolo_pack.x(),self.elements.piccolo_pack.y()];
	var m = SVG.get("layer1").matrixify().inverse().extract();
	self.elements.piccolo_pack.move(-20,120);
	animatePack();
}

function animatePack(){
	self.elements.piccolo_pack
	.show().animate()
	.move(self.elements.piccolo_pack.originalPosition[0], self.elements.piccolo_pack.originalPosition[1]);
}