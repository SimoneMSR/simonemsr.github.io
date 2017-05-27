	function randomBetween(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	function get(element,childName){
		return element.select("#" + childName).get(0);
	}

	function select(element,query){
		return element.select(query).get(0);
	}

	function moveElementWithPath(element,path , percent){
		var target = path.length ? path : path.target();
		var length = target.length();
		return path.during(function(pos, morph, eased){
			if(!element.stopMoveElementWithPath){
				var m = target.matrixify()
				var p = new SVG.Point(target.pointAt(percent * length)).transform(m)
				element.move(p.x, p.y);
			}

		});
	}

	function moveElementWithPath2(element,path , percent,duration){
		var target = path.length ? path : path.target();
		var length = target.length();
		return element.animate(duration).
			during(function(pos, morph, eased){
			path.during(function(pos, morph, eased){
			if(!element.stopMoveElementWithPath){
				var m = target.matrixify()
				var p = new SVG.Point(target.pointAt(percent * length)).transform(m)
				element.move(p.x, p.y);
			}

		});
		});

	}

	function moveElementAlongPath(element,path , duration, offset){
		path = path.length ? path : path.target();
		var length = path.length();
		return element.animate(duration).during(function(pos, morph, eased){
			if(!element.stopMoveElementAlongPath){
				var m = path.matrixify()
				var p = new SVG.Point(path.pointAt(eased * length)).transform(m);
				if(offset){
					p.x += offset.x;
					p.y += offset.y;
				}
				element.move(p.x, p.y ) //300,509.2 if using own matrix or -75.77745, -325,9505 using parent
			}
		});
	}

	function moveElementRandomlyAlongPath(element,path , duration, maxPercentShift, offset){
		var length = path.length();
		return element.animate(duration).during(function(pos, morph, eased){
			var shift = Math.random()*maxPercentShift;
			var m = path.matrixify();
			var destination = pos + shift * length;
			if(destination> length)
				destination=0;
			var p = new SVG.Point(path.pointAt(destination)).transform(m);
			if(offset){
				p.x += offset.x;
				p.y += offset.y;
			}
			element.move(p.x, p.y ) //300,509.2 if using own matrix or -75.77745, -325,9505 using parent
		});
	}

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

	function beLike(element,path){
		return element.plot(path.array().toString());
	}

	function getAbsoluteMatrix(element){
		if(element.parent().node != undefined)
			return element.matrixify().multiply(getAbsoluteMatrix(element.parent()));
		else
			return element.matrixify(); 
	}