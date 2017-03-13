(function(window, document, undefined){

	window.onload = run;
	function run(){
		var anim = document.getElementById("gesu_ciuffo");
		anim.addEventListener("animationiteration", AnimationListener, false);
	}

	function AnimationListener(){
		var anim = document.getElementById("gesu_ciuffo");
		anim.style.transitionDuration = Math.random() + 's';
		//anim.style.animationIterationCount = 1;
	}

})(window, document, undefined);