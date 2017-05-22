window.onload = init;
self = window.impagination = {
	elements : {}
};
function init(){
	self.draw = SVG("drawing").move(100,100);
	drawRects();
	animateRects();
	driveRects();
}

function drawRects(){
		self.elements.q1 = self.draw.rect(50,50).toPath(true).attr({"fill" : "#21d43c"});
		self.elements.q2 = self.draw.rect(25,25).move(50,0).toPath(true).attr({"fill" : "#4500ff"});
		self.elements.q3 = self.draw.rect(25,25).move(75,0).toPath(true).attr({"fill" : "#00ffc0"});
}

function animateRects(){
		self.elements.q1 = self.elements.q1.animate(5000).scale(2).loop(true,true);
		//self.elements.q2 = self.elements.q2.animate().loop(true);
		moveElementWithPath2(self.elements.q2,self.elements.q1,0.25,1000);
		moveElementAlongPath(self.elements.q3,self.elements.q2,3000).loop();
		//self.elements.q3.loop();
}

function driveRects(){
	self.elements.q1.target().click(function(){
		self.elements.q3.stopMoveElementAlongPath=true;
		moveElementWithPath2(self.elements.q3,self.elements.q2,0.5,1000);
	});
}