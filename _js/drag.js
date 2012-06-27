// JavaScript Document

var drag = {
	
	init: function() {
		
		drag._startX = 0;
		drag._startY = 0;
		drag._offsetX = 0;		
		drag._offsetY = 0;
		drag._dragElement;
		
		Core.addEventListener(document, "mousedown", drag.OnMouseDown);
		Core.addEventListener(document, "mouseup", drag.OnMouseUp);
	},
	
	OnMouseDown: function(event)
	{
		if(!event) event = window.event; 
		var target = event.target != null ? event.target : event.srcElement;
		if ((event.button == 1 && window.event != null || 
			event.button == 0) && Core.hasClass(target, 'drag'))
		{
			drag._startX = event.clientX;
			drag._startY = event.clientY;
			drag._offsetX = Core.extractNumber(target.style.left);
			drag._offsetY = Core.extractNumber(target.style.top);
			drag._dragElement = target;
			Core.addEventListener(document, "mousemove", drag.OnMouseMove);
			document.body.focus();
			Core.addEventListener(document, "selectstart", drag.pd);
			Core.addEventListener(target , "dragstart", drag.pd);
			Core.preventDefault(event);
		}
		
	},
	
	OnMouseMove: function(event)
	{
		if(!event) event = window.event; 
		drag._dragElement.style.left = (drag._offsetX + event.clientX - drag._startX) + 'px';
		drag._dragElement.style.top = (drag._offsetY + event.clientY - drag._startY) + 'px';
	},
	
	OnMouseUp: function(event)
	{
		if (drag._dragElement != null)
		{
			Core.removeEventListener(document, "mousemove", drag.OnMouseMove);
			Core.removeEventListener(document, "selectstart", drag.pd);
			Core.removeEventListener(drag._dragElement , "dragstart", drag.pd);
			drag._dragElement = null;
		}
	},
	
	pd: function(event) {
		Core.preventDefault(event);
	}
};



Core.start(drag);