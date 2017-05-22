var self = this.sun = {
	elements : {},
		groups : {}
};



window.onload = function () {
	self.draw = SVG('drawing');
	drawBackground()
	.then(function(){
		//drawAlghe();
		//loadSVG('/assets/sun.svg',initSVGFile);
		animaAlghe();
	});


	function initSVGFile() {
		self.elements.sun = SVG.get("sun");
		self.elements.sun.addTo(self.elements.background);
		var svg_flip = SVG.get("#layer3");
		svg_flip.hide();
		self.ray_path_ids= [/*"use3850", 
		"use3976",*/
		"use3978"
		,"use3980"
		,"use3982"
		,"use3984"
		,"use3986"
		,"use3988"
		,"use3990"
		,"use3992"
		,"use3994"
		,"use3996"];
		self.flipped_ray_path_ids =[/*"use3850-3",
		"use3976-6", */
		"use3978-0"
		,"use3980-6"
		,"use3982-2"
		,"use3984-6"
		,"use3986-1"
		,"use3988-8"
		,"use3990-7"
		,"use3992-9"
		,"use3994-2"
		,"use3996-0"];
		self.ray_square_ids = idsLike(self.elements.sun.node,/^path[0-9]*$/).sort();
		self.flipped_ray_square_ids = idsLike(self.elements.sun.node, /^path[0-9]*\-/).sort();
		self.groups = idsLike(self.elements.sun.node,/^g[0-9]*/);

		animateSquares();
		animateRays();
		var square = self.elements.sun.select("#" + self.ray_square_ids[0]).get(0);
		square.show();
		moveElementWithPath(square, self.elements.animated_ray,1);


		for (index in self.groups){
			var drag = SVG.get("#" +self.groups[index]).draggable();
			drag.on('dragmove', function(event){
				var foundFish = findNearestElement(event.detail.p)
				if(foundFish)
					foundFish.fill('#f06');

			});
			drag.on('dragstart',function (event){
				event.srcElement.style.visibility="none";
			} );

		}
		document.addEventListener('dragenter', function (event){
			var e=event;
		});
		var cerchio = SVG.get("#cerchio");
		cerchio.animate(1000, '<>', 0).rotate(25).loop(true,true);
	}

	function animateRays(){
		for( index in self.ray_path_ids){
			var path = self.elements.sun.select("#" + self.ray_path_ids[index]).get(0);
			var path_flip = self.elements.sun.select("#" + self.flipped_ray_path_ids[index]).get(0);
			self.elements.animated_ray = path.animate(1000, '<>', 0).plot(path_flip.array().toString()).loop(true,true);
		}
	}

	function animaAlghe(){
		self.groups.alga1 = get(self.elements.background,"alga1");
		self.groups.alga2 = get(self.elements.background,"alga2");
		evolveGroup(self.groups.alga1,false);
		evolveGroup(self.groups.alga2,false);
		moveElementAlongPath(self.groups.alga1,
			get(self.elements.background,"path9217"),
			1000000,
			{ x : 300, y : -509.2}).loop();
	}

	function evolveGroup(element,backwards){
		var frames=[];
		element.each(function (i,child){
			frames.push(this);
		});
		var alga = element.animation == undefined ? frames[0].clone() : element.animation;
		element.animation = alga;
		for (let frame of frames){
			frame.hide();
		}
		alga.show();
		var i= backwards ? frames.length-1 : 0;
		var random_limit = Math.min(frames.length-1,Math.floor(Math.random()*frames.length));
		while(i>=0 && (!backwards&&i<= random_limit || backwards)){
			alga = alga.animate(3000).plot(frames[i].array().toString());
			i = backwards ? i-1 : i+1;
		}
		alga.afterAll(function(){
			setTimeout(function(){
				evolveGroup(element,!backwards);
			},0)

		});
	}

	function drawBackground(){

		return new Promise(function(resolve, reject) {
		  // do a thing, possibly async, then…

		  loadSVG('corallo.svg',function(svg){
		  	self.elements.background = SVG.get('background');
		  	//self.elements.background.back();
		  	self.elements.pesce1=SVG.get('pesce1');

		  	self.elements.pesce1.node.addEventListener("mouseover", function (){
		  		console.log("here's me");
		  	})
		  	self.elements.pesce1.findable = true;
		  	self.elements.pesce2=SVG.get('pesce2');
		  	self.elements.pesce2.findable = true;
		  	self.elementsGroups = {};
		  	self.elementsGroups.bolle1=SVG.get('bolle1');
		  	self.elementsGroups.bolle2=SVG.get('bolle2');
		  	self.elementsGroups.bolle3=SVG.get('bolle3');
		  	self.elementsGroups.bolle4=SVG.get('bolle4');
		  	self.elementsGroups.bolle5=SVG.get('bolle5');
		  	self.elementsGroups.bolle6=SVG.get('bolle6');
		  	self.elementsGroups.bolle1.hide();
		  	self.elementsGroups.bolle2.hide();
		  	self.elementsGroups.bolle3.hide();
		  	self.elementsGroups.bolle4.hide();
		  	self.elementsGroups.bolle5.hide();
		  	self.elementsGroups.bolle6.hide();
		  	self.elements.pesce1.node.attributes.removeNamedItem('style');
		  	self.elements.pesce2.node.attributes.removeNamedItem('style');
		  	showRandomBubbles();
		  	resolve();
		  });
		});
	}

	function showRandomBubbles(){
		setTimeout(function(){showRandomBubble(2000,4000)},1000);
		setTimeout(function(){showRandomBubble(2000,4000)},1000);
		setTimeout(function(){showRandomBubble(500,10000)},500);
	}

	function showRandomBubble(minInterval,maxInterval){
		var keys=Object.keys(self.elementsGroups);
		var randomBubbleGroup= self.elementsGroups[keys[Math.floor(Math.random()*keys.length)]];
		var randomBubble = randomBubbleGroup.node.children[Math.floor(Math.random()*randomBubbleGroup.node.children.length)];
		var path = self.draw.path(SVG.get(randomBubble.id).array().toString());
		path.animate(randomBetween(500,1000)).move(path.cx(),0).after(function(){
			this.remove();
			setTimeout(showRandomBubble,randomBetween(minInterval,maxInterval));
		});
	}

	function animateSquares(){
		for(index in self.ray_square_ids){
			var path = self.elements.sun.select("#" + self.ray_square_ids[index]).get(0);
			var path_flip = self.elements.sun.select("#" + self.flipped_ray_square_ids[index]).get(0);
			path.animateSquarePath = path_flip;
			path.becomeLike = becomeLike;
			//path.becomeLike();
			path.hide();
			path.node.addEventListener('mouseover',function(e){
				e.preventDefault();
				e.target.style['fill']=getRandomColor();
				e.target.classList.remove('rotate');
				void e.target.offsetWidth;
				//setTimeout(function(){
					e.target.classList.add('rotate');
					
				//});
			});
		}
	}

	function becomeLike(_this,thisElement){
		var i =0;
		if(this.animateSquarePath != undefined)
			return this.animate(1000, '<>', 0).plot(this.animateSquarePath.array().toString()).loop(true,true);
	}

	function getRandomColor(){
		return "#"+((1<<24)*Math.random()|0).toString(16);
	}



	function findNearestElement(point){
		var distance=1000000;
		var found =null;
		var transform = self.elements.pesce1.parent().transform();
		for(var element of Object.keys(self.elements)){
			element=self.elements[element];
			if(element.findable){
				var last_distance=Math.sqrt(Math.pow(point.x-element.cx()+transform.x,2)+Math.pow(point.y-element.cy()+transform.y,2));
				//console.log(last_distance + "from " + element.node.id + " " + point.x + " " + point.y + " " + element.cx() + " "+ element.cy());
				if(last_distance<distance && last_distance<10){
					distance = last_distance;
					found = element;
				}
			}

		}
		return found;
	}



}
