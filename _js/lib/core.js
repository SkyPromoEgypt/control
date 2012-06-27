// JavaScript Document
// This is my Core Javascript Library
// Extracted from Simplay Java
// Eng Mohammed Yehis Abdul Mottalib
// Date : 30th April 2010

function $(eID, tagName, childNodes) {
	if(tagName && tagName != '') {
		return document.getElementById(eID).getElementsByTagName(tagName);
	} else if(childNodes) {
		var childs = [];
		var allChilds = document.getElementById(eID).childNodes;
		for(var i = 0, ii = allChilds.length; i<ii; i++) {
			if(allChilds[i].nodeType == 1) {
				childs[childs.length] = allChilds[i];
			}
		}
		return childs;
	} else {
		return document.getElementById(eID)
	}
};

var Core = {};

// W3C DOM 2 Events model
if (document.addEventListener) {
	Core.addEventListener = function(target, type, listener) {
		target.addEventListener(type, listener, false);
	};
	
	Core.removeEventListener = function(target, type, listener) {
		target.removeEventListener(type, listener, false);
	};
	
	Core.preventDefault = function(event) {
		event.preventDefault();
	};
	
	Core.stopPropagation = function(event) {
		event.stopPropagation();
	};
}

// Internet Explorer Events model
else if (document.attachEvent) {
	Core.addEventListener = function(target, type, listener) {
	// prevent adding the same listener twice, since DOM 2
	// Events ignores duplicates like this
		if (Core._findListener(target, type, listener) != -1)
		return;
		// listener2 calls listener as a method of target in one of
		// two ways, depending on what this version of IE supports,
		// and passes it the global event object as an argument
		var listener2 = function() {
			var event = window.event;
			if (Function.prototype.call) {
				listener.call(target, event);
			} else {
				target._currentListener = listener;
				target._currentListener(event)
				target._currentListener = null;
			}
	};
	
	// add listener2 using IE's attachEvent method
	target.attachEvent("on" + type, listener2);
	// create an object describing this listener so we can
	// clean it up later
	var listenerRecord = {
		target: target,
		type: type,
		listener: listener,
		listener2: listener2
	};
	
	// get a reference to the window object containing target
	var targetDocument = target.document || target;
	var targetWindow = targetDocument.parentWindow;
	// create a unique ID for this listener
	var listenerId = "l" + Core._listenerCounter++;
	// store a record of this listener in the window object
	if (!targetWindow._allListeners)
	targetWindow._allListeners = {};
	targetWindow._allListeners[listenerId] = listenerRecord;
	// store this listener's ID in target
	if (!target._listeners) target._listeners = [];
	target._listeners[target._listeners.length] = listenerId;
	// set up Core._removeAllListeners to clean up all
	// listeners on unload
	if (!targetWindow._unloadListenerAdded) {
		targetWindow._unloadListenerAdded = true;
		targetWindow.attachEvent("onunload", Core._removeAllListeners);
	}
};

Core.removeEventListener = function(target, type, listener) {
// find out if the listener was actually added to target
	var listenerIndex = Core._findListener(
	target, type, listener);
	if (listenerIndex == -1) return;
	// get a reference to the window object containing target
	var targetDocument = target.document || target;
	var targetWindow = targetDocument.parentWindow;
	// obtain the record of the listener from the window object
	var listenerId = target._listeners[listenerIndex];
	var listenerRecord = targetWindow._allListeners[listenerId];
	// remove the listener, and remove its ID from target
	target.detachEvent("on" + type, listenerRecord.listener2);
	target._listeners.splice(listenerIndex, 1);
	// remove the record of the listener from the window object
	delete targetWindow._allListeners[listenerId];
};

Core.preventDefault = function(event) {
	event.returnValue = false;
};

Core.stopPropagation = function(event) {
	event.cancelBubble = true;
};

Core._findListener = function(target, type, listener) {
// get the array of listener IDs added to target
	var listeners = target._listeners;
	if (!listeners) return -1;
	// get a reference to the window object containing target
	var targetDocument = target.document || target;
	var targetWindow = targetDocument.parentWindow;
	// searching backward (to speed up onunload processing),
	// find the listener
	for (var i = listeners.length - 1; i >= 0; i--) {
	// get the listener's ID from target
		var listenerId = listeners[i];
		// get the record of the listener from the window object
		var listenerRecord =
		targetWindow._allListeners[listenerId];
		// compare type and listener with the retrieved record
		if (listenerRecord.type == type && listenerRecord.listener == listener) {
			return i;
		}
	}
	return -1;
};

Core._removeAllListeners = function() {
	var targetWindow = this;
	for (id in targetWindow._allListeners) {
		var listenerRecord = targetWindow._allListeners[id];
		listenerRecord.target.detachEvent("on" + listenerRecord.type, listenerRecord.listener2);
		delete targetWindow._allListeners[id];
	}
};

Core._listenerCounter = 0;
}

Core.addClass = function(target, theClass) {
	if (!Core.hasClass(target, theClass)) {
		if (target.className == "") {
			target.className = theClass;
		} else {
			target.className += " " + theClass;
		}
	}
};

Core.replaceClass = function(target, theClass) {
	target.className = theClass;
};

Core.getElementsByClass = function(theClass) {
	var elementArray = [];
	if (document.all) {
		elementArray = document.all;
	} else {
		elementArray = document.getElementsByTagName("*");
	}
	
	var matchedArray = [];
	var pattern = new RegExp("(^| )" + theClass + "( |$)");
	for (var i = 0; i < elementArray.length; i++) {
		if (pattern.test(elementArray[i].className)) {
			matchedArray[matchedArray.length] = elementArray[i];
		}
	}
	return matchedArray;
};

Core.hasClass = function(target, theClass) {
	var pattern = new RegExp("(^| )" + theClass + "( |$)");
	if (pattern.test(target.className)) {
		return true;
	}
	return false;
};

Core.removeClass = function(target, theClass){
	var pattern = new RegExp("(^| )" + theClass + "( |$)");
	target.className = target.className.replace(pattern, "$1");
	target.className = target.className.replace(/ $/, "");
};

Core.getComputedStyle = function(element, styleProperty) {
	var computedStyle = null;
	if (typeof element.currentStyle != "undefined") {
		computedStyle = element.currentStyle;
	} else {
		computedStyle = document.defaultView.getComputedStyle(element, null); 
	}
	return computedStyle[styleProperty];
};

Core.getHeight = function() {
		var windowHeight = 0;
			if (typeof(window.innerHeight) == 'number') {
				windowHeight = window.innerHeight;
			}
			else {
				if (document.documentElement && document.documentElement.clientHeight) {
					windowHeight = document.documentElement.clientHeight;
				}
				else {
					if (document.body && document.body.clientHeight) {
						windowHeight = document.body.clientHeight;
					}
				}
			}
		return windowHeight;
};

Core.getWidth = function() {
		var windowWidth = 0;
			if (typeof(window.innerWidth) == 'number') {
				windowWidth = window.innerWidth;
			}
			else {
				if (document.documentElement && document.documentElement.clientWidth) {
					windowWidth = document.documentElement.clientWidth;
				}
				else {
					if (document.body && document.body.clientWidth) {
						windowWidth = document.body.clientWidth;
					}
				}
			}
		return windowWidth;
};

Core.center = function(target) {
	var windowHeight = Core.getHeight();
	var contentHeight = target.offsetHeight;
	if (windowHeight - contentHeight > 0) {
		target.style.top = ((windowHeight / 2) - (contentHeight / 2)) + 'px';
	}
	var windowWidth = Core.getWidth();
	var contentWidth = target.offsetWidth;
	if (windowWidth - contentWidth > 0) {
		target.style.left = ((windowWidth / 2) - (contentWidth / 2)) + 'px';
	}
};

Core.setOpacity = function(target, value) {
	target.style.filter = 'alpha(opacity=' + value * 100 + ')';
	target.style.KHTMLOpacity = value * 100;
	target.style.MozOpacity = value * 100;
	target.style.opacity = value * 1;
};

Core.show = function(target) {
	target.style.visibility = 'visible';
};

Core.hide = function(target) {
	target.style.visibility = 'hidden';
};

Core.increase = function(target, maxValue, tracker, increment, frameRate, pseudoElm, unitValue) {
	tracker += increment;
	if(tracker >= maxValue) {
		tracker = maxValue;
	} else {
		target._timer = setTimeout(function() {
			Core.increase(target, maxValue, tracker, increment, frameRate, pseudoElm, unitValue);
		}, 1000 / frameRate);
	}
	switch(pseudoElm) {
		case "width":
		target.style.width = tracker + unitValue
		break;
		case "height":
		target.style.height = tracker + unitValue
		break;
		case "left":
		target.style.left = tracker + unitValue
		break;
		case "top":
		target.style.top = tracker + unitValue
		break;
		case "opacity":
		Core.setOpacity(target, tracker);
		break;
	}
	target._tracker = tracker;
};

Core.decrease = function(target, minValue, tracker, increment, frameRate, pseudoElm, unitValue) {
	tracker -= increment;
	if(tracker <= minValue) {
		tracker = minValue;
	} else {
		target._timer = setTimeout(function() {
			Core.decrease(target, minValue, tracker, increment, frameRate, pseudoElm, unitValue);
		}, 1000 / frameRate);
	}
	switch(pseudoElm) {
		case "width":
		target.style.width = tracker + unitValue
		break;
		case "height":
		target.style.height = tracker + unitValue
		break;
		case "left":
		target.style.left = tracker + unitValue
		break;
		case "top":
		target.style.top = tracker + unitValue
		break;
	}
	target._tracker = tracker;
};

Core.extractNumber = function (value) {
	var n = parseInt(value);
	return n == null || isNaN(n) ? 0 : n;
};

Core.compareDates = function(startDate, endDate) {
	var date1 = startDate.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
	var d1 = new Date(date1[1],date1[2]-1,date1[3]);
	var date2 = endDate.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
	var d2 = new Date(date2[1],date2[2]-1,date2[3]);
	if(d1>d2 || startDate == endDate) return false;
	return true;
}
// This is a scrip--client side function to encypt data and back to the server
Core.c2sencrypt = function(s){
	var k = 'DTHBS';
	k = str_split(str_pad('',strlen(s),k));
	var sa = str_split(s);
	for(var i in sa){
		var t = ord(sa[i])+ord(k[i]);
		sa[i] = chr(t > 255 ?(t-256):t);
	}
	return escape(join('', sa));
};

Core.start = function(runnable) {
	Core.addEventListener(window, "load", runnable.init);
};