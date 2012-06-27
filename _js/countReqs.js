// JavaScript Document

var countReq = {
	
	init: function() {
		
		countReq.divCount = $('countrequests');
		countReq.refreshBtn = $('refreshBtn');
		
		Core.addEventListener(countReq.refreshBtn, "click", countReq.count);
		
		countReq.count();
		countReq.playTime();
	},
	
	count: function() {
		
		var sendString;
		sendString = 'count=count';
		
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
			var filename = "_ajax/handle_requests.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText == 0) {
						countReq.divCount.style.textDecoration = 'none';
						countReq.divCount.innerHTML = '(' + responseText + ')';
					} else {
						countReq.divCount.style.textDecoration = 'blink';
						countReq.divCount.innerHTML = '(' + responseText + ')';
					}
				} else {
					countReq.divCount.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" />';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	playTime: function() {
		var timer = setInterval(countReq.count, 60000);
	}
};

Core.start(countReq);
