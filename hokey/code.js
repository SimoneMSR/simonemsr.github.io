(function(window, document, undefined){

	window.onload = run;
	function run(){
		var anim = document.getElementById("gesu_ciuffo");
		anim.addEventListener("animationiteration", AnimationListener, false);
		$('#gesu_ciuffo').on('webkitAnimationEnd mozAnimationEnd msAnimationEnd oAnimationEnd animationEnd', function(e) {
			$(this).css({'animation-duration': Math.random() + 1 + 's'},0);
		});
	}

	function AnimationListener(){
		var anim = document.getElementById("gesu_ciuffo");
		anim.style.transitionDuration = Math.random() + 's';
		//anim.style.animationIterationCount = 1;
	}

})(window, document, undefined);