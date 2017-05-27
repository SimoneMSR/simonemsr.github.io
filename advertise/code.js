window.onload = init;
self = window.advertise = {
	elements : {},
	groups : {
		linee : {},
		cerchi : {}
	}
};

function init(){
	self.draw= SVG('drawing');
	SvgUtils.loadSVG("./assets/pack.svg", drawPack);
}

function drawPack(){
	var nomi_elementi= ['portachiavi', 'pack', 'documenti', 'beauty' , 'bagno', 'respiratore' ,'scarpe'];
	nomi_elementi= ['portachiavi', 'pack', 'documenti'];
	self.svg = SVG.get("svg2").size('50%','50%').move('25%','25%');
	self.groups.ellissi = {};
	for(let el of nomi_elementi){
		self.elements[el] = SVG.get(el).attr({'opacity' :0 });
		self.groups.ellissi[el] = SVG.get("ellisse-" + el);
		self.elements[el].originalPosition = {x:self.groups.ellissi[el].cx(), y : self.groups.ellissi[el].cy()};
	}
	for(let el of Object.keys(self.elements)){
		el = self.elements[el];
		el.finalPosition = {x:el.cx(), y:el.cy()};
		el.move(-el.cx() + el.originalPosition.x,-el.cy()+el.originalPosition.y);
	}
	openAll();
}

function openAll(){
	openSingle(self.elements.portachiavi)
	.afterAll(function(){
		openSingle(self.elements.documenti)
		.afterAll(function(){
			openSingle(self.elements.pack)
			.afterAll(function(){
				setTimeout(closeAll,1000)
			});
		})
	})
}

function closeAll(){
	closeSingle(self.elements.pack)
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
	var originPoint = {x :self.groups.ellissi[element.id()].x(), y : self.groups.ellissi[element.id()].y()};
	self.groups.linee[element.id()] = self.draw.line(originPoint.x, originPoint.y, element.finalPosition.x, element.finalPosition.y)
	.stroke({ color: '#f90000', width: 7, linecap: 'round' }).addTo(self.svg)
	.after(element);
	
	return element
	.delay(100)
	.animate(20)
	.attr({'opacity' :1 })
	.animate(200)
	.move(-element.originalPosition.x+element.cx(), -element.originalPosition.y+element.cy())
	.after(function(){
		self.groups.cerchi[element.id()] = self.draw.circle(120)
		.addTo(self.svg)
		.after(element);
		self.groups.cerchi[element.id()].center(element.finalPosition.x - self.groups.cerchi[element.id()].x(), element.finalPosition.y -self.groups.cerchi[element.id()].y()).fill( 'white' );
	});
}

function closeSingle(element){
	self.groups.linee[element.id()].remove();
	self.groups.cerchi[element.id()].remove();
	return element
	.animate(200)
	.move(element.originalPosition.x - element.cx(),element.originalPosition.y - element.cy())
	.afterAll(function(){
		this.attr({'opacity' :0 });
	})
}