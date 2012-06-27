// JavaScript Document

var countmail = {
	
	init: function() {
		
		countmail.div = $('countmail');
		countmail._audio = $('mailAudio');
		var refreshBtn = $('refreshBtn');
		
		Core.addEventListener(refreshBtn, "click", countmail.count);
		countmail.count();
		countmail.playTime();
	},
	
	count: function() {
		var sendString;
		sendString = 'mails=mails&count=count';
		
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
			var filename = "_ajax/get_emails.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 0) {
							if(countmail._alertTimer) {
								clearInterval(countmail._alertTimer);
								countmail._alertTimer = null;
							}
							countmail.div.style.textDecoration = 'none';
							countmail.div.innerHTML = '(' + responseText + ')';
						} else {
							countmail.div.style.textDecoration = 'blink';
							countmail.div.innerHTML = '(' + responseText + ')';
							if(!browser.isIE() || !browser.isChrome()) countmail.playNotification();
						}
					}
				} else {
					countmail.div.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" />';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	playNotification: function() {
		if(countmail._alertTimer) {
			clearInterval(countmail._alertTimer);
			countmail._alertTimer = null;
		}
		countmail._audio.play();
		countmail._alertTimer = setInterval(countmail.playNotification, 5000);
	},
	
	playTime: function() {
		var timer = setInterval(countmail.count, 60000);
	}
};

Core.start(countmail);