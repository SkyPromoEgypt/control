// JavaScript Document
// Detecting browser type and version

browser = {
	
	init: function() {
		browser.begin;
		browser.end;
		browser.version;
		// comment the next line if you want to use the object to detect browsers types without notifying the user.
		//browser.detectBroswerType();
	},
	
	isFirefox: function() {
		if(navigator.appName == "Netscape" && navigator.userAgent.indexOf("Firefox") > 0) {
			browser.begin = navigator.userAgent.indexOf("Firefox") + "Firefox".length + 1;
			browser.end = navigator.userAgent.length;
			browser.version = navigator.userAgent.substring(browser.begin, browser.end);
			return true;
		} else {
			return false;
		}
	},
	
	isOpera: function() {
		if(navigator.appName == "Opera" && navigator.userAgent.indexOf("Opera") >= 0) {
			browser.begin = navigator.userAgent.indexOf("Version") + "Version".length + 1;
			browser.end = navigator.userAgent.length;
			browser.version = navigator.userAgent.substring(browser.begin, browser.end);
			return true;
		} else {
			return false;
		}
	},
	
	isIE: function() {
		if(navigator.appName == "Microsoft Internet Explorer" && navigator.userAgent.indexOf("MSIE") > 0) {
			browser.begin = navigator.userAgent.indexOf("MSIE ") + "MSIE ".length;
			if(navigator.userAgent.indexOf(";", browser.begin) > 0) {
				browser.end = navigator.userAgent.indexOf(";", browser.begin);
			} else {
				browser.end = navigator.userAgent.indexOf(")", browser.begin) + 2;
			}
			browser.version = navigator.userAgent.substring(browser.begin, browser.end);
			return true;
		} else {
			return false;
		}
	},
	
	isSafari: function() {
		if(navigator.appName == "Netscape" && navigator.userAgent.indexOf("Safari") > 0) {
			browser.begin = navigator.userAgent.indexOf("Safari") + "Safari".length + 1;
			browser.end = navigator.userAgent.length;
			browser.version = navigator.userAgent.substring(browser.begin, browser.end);
			return true;
		} else {
			return false;
		}
	},
	
	isChrome: function() {
		if(navigator.appName == "Netscape" && navigator.userAgent.indexOf("Chrome") > 0) {
			browser.begin = navigator.userAgent.indexOf("Chrome") + "Chrome".length + 1;
			browser.end = navigator.userAgent.indexOf("Safari");
			browser.version = navigator.userAgent.substring(browser.begin, browser.end);
			return true;
		} else {
			return false;
		}
	}
};

Core.start(browser);