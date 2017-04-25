var self = this;
self.elements={};
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

function loadSVG(filename,callback){
	var client = new XMLHttpRequest();
	client.open('GET', filename);
	client.setRequestHeader("Content-Type", "image/svg+xml");
	client.addEventListener("load", function(event) {
		self.draw.svg(client.responseText);
		if(callback)
			callback();
	});
	client.send();
}

window.onload = function () {
	self.draw = SVG('drawing');
	drawBackground();
	loadSVG('assets/sun.svg',function(svg) {
		var svg_flip = SVG.get("#layer3");
		svg_flip.hide();
		self.ray_path_ids= ["use3850", 
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
		self.flipped_ray_path_ids =["use3850-3"
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
		self.ray_square_ids = idsLike(/^path[0-9]*$/).sort();
		self.flipped_ray_square_ids = idsLike(/^path[0-9]*\-/).sort();
		self.groups = idsLike(/^g[0-9]*/);

		animateSquares();
		animateRays();


		for (index in self.groups){
			SVG.get("#" +self.groups[index]).draggable()
			.on('dragmove', function(event){
				if(findNearestElement(event.detail.p)==self.elements.pesce2)
					SVG.get(this.node.id).stop();

			});
		}

		var circle = SVG.get("#cerchio");
		circle.animate(1000, '<>', 0).rotate(25).loop(true,true);
	});

	function animateRays(){
		for( index in self.ray_path_ids){
			var path = SVG.get("#" + self.ray_path_ids[index]);
			path.hide();
			//var path_flip = SVG.get("#" + flipped_ray_path_ids[index]);
			//path.animate(1000, '<>', 0).plot(path_flip.array().toString()).loop(true,true);
		}
	}

	function drawBackground(){
		//var image = draw.image('/assets/coralli.gif');
		loadSVG('corallo.svg',function(svg){
			SVG.get('background').back();
			self.elements.pesce1=SVG.get('pesce1');
			self.elements.pesce2=SVG.get('pesce2');
		});
	}

	function animateSquares(){
		for(index in self.ray_square_ids){
			var path = SVG.get("#" + self.ray_square_ids[index]);
			var path_flip = SVG.get("#" + self.flipped_ray_square_ids[index]);
			path.animateSquarePath = path_flip;
			path.becomeLike = becomeLike;
			path.becomeLike();
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
		this.animate(1000, '<>', 0).plot(this.animateSquarePath.array().toString()).loop(true,true);
	}

	function getRandomColor(){
		return "#"+((1<<24)*Math.random()|0).toString(16);
	}

	function moveElementAlongPath(element,path){
		var length = path.length();
		var end = path.pointAt(length-1);
		var i=1;
		var animatedElement = element.animate(1000, '-').move(end.x,end.y);
		animatedElement.duringAllRecursive = function(at){
			this.once(at,function(pos,eased){
				console.log(pos);
				var point = path.pointAt(i);
				animatedElement._target.move(point.x,point.y);
				i++;
				animatedElement.duringAllRecursive(Math.max(at+1/length,pos+0.001));
			},true);
		}
		animatedElement.duringAllRecursive(0.01);
	}

	function findNearestElement(point){
		var distance=1000000;
		var found =null;
		for(var element of Object.keys(self.elements)){
			element=self.elements[element];
			var last_distance=Math.sqrt((point.x-element.cx())^2+(point.y-element.cy())^2);
			if(last_distance<distance){
				distance = last_distance;
				found = element;
			}
		}
		return found;
	}

}