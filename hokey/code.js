(function(window, document, undefined){

	var centroMazza = { x : 850, y : 500};
	var anim;
	var container;
	var mazza, guanto;
	window.onload = run;
	function run(){
		anim = document.getElementById("gesu_ciuffo");
		container = document.getElementById("container");
		mazza = document.getElementById("h1_mazza");
		guanto = document.getElementById("h1_guanto");
		container.onmousemove = handleMouseMove;
		anim.addEventListener("animationiteration", AnimationListener, false);
		anim.addEventListener("mouseover", ciuffoMouseIn, false);
		anim.addEventListener("mouseout", ciuffoMouseOut, false);
		anim.onC
	}

	function AnimationListener(){
		anim.style.transitionDuration = Math.random() + 's';
		//anim.style.animationIterationCount = 1;
	}

	function ciuffoMouseIn(){
		anim.classList.remove('animate-over');
	}

	function ciuffoMouseOut(){
		anim.classList.add('animate-over');
	}

	function handleMouseMove(event) {
		var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
        	eventDoc = (event.target && event.target.ownerDocument) || document;
        	doc = eventDoc.documentElement;
        	body = eventDoc.body;

        	event.pageX = event.clientX +
        	(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        	(doc && doc.clientLeft || body && body.clientLeft || 0);
        	event.pageY = event.clientY +
        	(doc && doc.scrollTop  || body && body.scrollTop  || 0) -
        	(doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
        console.log( event.pageX +"/"+ event.pageY);
        var h=event.pageY-centroMazza.y;
        var l=event.pageX-centroMazza.x;
        var d= Math.sqrt(h*h + l*l);
        var deg=Math.asin(h/d) * 90 +30;
        if(event.pageX<centroMazza.x && event.pageY>centroMazza.y)
        	deg+=90;
        mazza.style.transform = 'rotate(' + deg + 'deg)';
        guanto.style.transform = 'rotate(' + deg/10 + 'deg)';
        if(deg>45){
        	guanto.style.transform = guanto.style.transform + "scaleX(-1) translateX(-100%)";
        }
    }

})(window, document, undefined);