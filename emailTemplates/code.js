var self = window.emailTemplates={
	elements :{}
};
window.onload = init;

function init(){
	var svgDoc = document.getElementsByTagName("object")[0].contentDocument;
	var linkElm = svgDoc.createElementNS("http://www.w3.org/1999/xhtml", "link");
	linkElm.setAttribute("href", "./style.css");
	linkElm.setAttribute("type", "text/css");
	linkElm.setAttribute("rel", "stylesheet");
	svgDoc.getElementById("svg2").appendChild(linkElm);
	var dm = self.elements.draggable = document.getElementById('dragme'); 
	self.elements.title = svgDoc.getElementById('svg-title');
	self.elements.input_title = document.getElementById("title");
	self.elements.button = document.getElementById('set');
	self.elements.subtitle = svgDoc.getElementById("svg-subtitle");
	self.elements.input_subtitle = document.getElementById("subtitle");
	self.elements.footer1 = svgDoc.getElementById("svg-footer1");
	self.elements.input_footer1 = document.getElementById("footer1");
	self.elements.footer2 = svgDoc.getElementById("svg-footer2");
	self.elements.input_footer2 = document.getElementById("footer2");
	dm.addEventListener('dragstart',drag_start,false); 
	document.body.addEventListener('dragover',drag_over,false);
	dm.addEventListener('drop',drop,false);
	initializeText();
	self.elements.button.onclick = buttonOnClick;
}

function drag_start(event) {
	var style = window.getComputedStyle(event.target, null);
	event.dataTransfer.setData("text/plain",
		(parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
} 
function drag_over(event) { 
	event.preventDefault(); 
	return false; 
} 
function drop(event) { 
	var offset = event.dataTransfer.getData("text/plain").split(',');
	var dm = document.getElementById('dragme');
	dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
	dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
	event.preventDefault();
	return false;
} 

function initializeText(){
	self.elements.input_title.value = self.elements.title.innerHTML ;
	self.elements.input_subtitle.value = self.elements.subtitle.innerHTML;
	self.elements.input_footer1.value = self.elements.footer1.innerHTML;
	self.elements.input_footer2.value = self.elements.footer2.innerHTML;
}

function setText(){
	self.elements.title.innerHTML = self.elements.input_title.value ;
	self.elements.subtitle.innerHTML = self.elements.input_subtitle.value ;
	self.elements.footer1.innerHTML = self.elements.input_footer1.value;
	self.elements.footer2.innerHTML = self.elements.input_footer2.value;
}

function buttonOnClick(event){
	event.preventDefault();
	setText();
}