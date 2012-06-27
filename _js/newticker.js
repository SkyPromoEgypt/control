// JavaScript Document

var newsTicker = {
	
	init: function() {
		
		newsTicker.get();
		
		newsTicker.divNews = $('news');
		newsTicker.textArray = [];
		newsTicker.linkArray = [];
		
	},
	
	setUp: function() {
		
		newsTicker.textIndex = 0;
		newsTicker.linkIndex;
		newsTicker.outputText = newsTicker.textArray[newsTicker.textIndex];
		newsTicker.text = newsTicker.divNews.innerHTML;
		newsTicker.lTracker = 0;
		newsTicker.lMaxTracker = newsTicker.outputText.length;
		
		newsTicker.play();
	},
	
	play: function() {
		
		newsTicker.timer = setInterval(
			function() { 
				if(newsTicker.lTracker == newsTicker.lMaxTracker) {
					newsTicker.lTracker = 0;
					newsTicker.textIndex++
					if(newsTicker.textIndex == newsTicker.textArray.length) {
						newsTicker.textIndex=0;
					}
					if(newsTicker.textIndex == 0) {
						newsTicker.linkIndex = newsTicker.textArray.length - 1;
					} else {
						newsTicker.linkIndex = newsTicker.textIndex-1;
					}
					newsTicker.outputText = newsTicker.textArray[newsTicker.textIndex];
					newsTicker.lMaxTracker = newsTicker.outputText.length;
					newsTicker.divNews.innerHTML = '<a href="' + newsTicker.linkArray[newsTicker.linkIndex] + '" target="_blank">' + newsTicker.textArray[newsTicker.linkIndex] + '</a>';
					setTimeout(newsTicker.play, 5000);
					setTimeout(function() {
						newsTicker.text = newsTicker.divNews.innerHTML = '';
					}, 5000);
					clearInterval(newsTicker.timer);
					return; 
				} else { 
					newsTicker.text += newsTicker.outputText[newsTicker.lTracker]; 
					newsTicker.divNews.innerHTML = newsTicker.text; 
					newsTicker.lTracker++; 
				} 
			}, 80);
	},
	
	get: function() {
		
		var xhr = false;	
			if(window.ActiveXObject) {
				try {
					var xhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e1) {
					try {
						var xhr = new ActiveXObject("MSXML2.XMLHTTP");
					} catch (e2) {
						var xhr = false;
					}
				}
			} else if(window.XMLHttpRequest) {
				var xhr = new XMLHttpRequest();
			} else {
				Alert.openListener('', 'Sorry, There was a problem creating the XMLHttpRequest', 'alert', '');
			}
			
			if(xhr) {
				var filename = "_ajax/news.php";
				xhr.open("GET", filename, true);
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseXML = xhr.responseXML;
						if(responseXML) {
							var items = responseXML.getElementsByTagName("item");
							for(var i = 0, ii = items.length; i<ii; i++) {
								newsTicker.textArray[i] = items[i].getElementsByTagName('title')[0].firstChild.nodeValue;
								newsTicker.linkArray[i] = items[i].getElementsByTagName('link')[0].firstChild.nodeValue;
							}
							newsTicker.setUp();
						}
					}
				}
				xhr.send();
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
	}
	
}

Core.start(newsTicker);