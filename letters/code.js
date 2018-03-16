(function(){

	function pause(milliseconds) {
		var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

function random(a,b){
	return Math.floor(Math.random() * b) + a ;
}

function words(){
	var message = "i-like-moving-things";
	var body = document.getElementsByClassName("letters-container")[0];
	for(letter of message){
		switch (letter) {
			case '-' : {
				var element = document.createElement("div");
			} break;
			default :  {
				var element = document.createElement("span");
				element.innerHTML="<span></span>";
				element.classList.add("letter");
				if(letter !=' ')
					element.classList.add(letter);
			}
		}
		body.appendChild(element);
	}
}

function animate(time){
	setTimeout(function(){
		var letters = document.getElementsByClassName("letter");
		for(letter of letters){
			//letter = letter.children[0];
			if(Math.random()<0.3){
				if(letter.classList.contains("up")){
					letter.classList.remove("up");
					letter.classList.add("down");
				}else{
					if(letter.classList.contains("down")){
						letter.classList.remove("down");
						letter.classList.add("up");
					}else{
						letter.classList.add("up");
					}
				}				
			}

		}
		animate(random(2000,4000));
	},time)
}
window.onload = function (){
	words();
	animate(1000);
}
})();