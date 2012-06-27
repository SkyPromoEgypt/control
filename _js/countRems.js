// JavaScript Document

var countRem = {
	
	init: function() {
		
		countRem.divCount = $('countreminders');
		countRem.refreshBtn = $('refreshBtn');
		
		Core.addEventListener(countRem.refreshBtn, "click", countRem.count);
		
		countRem.count();
		countRem.playTime();
	},
	
	
	
	count: function() {
		
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		date = year + '-' + month + '-' + day;
		
		var sendString;
		sendString = 'count=count&day=' + date;
		
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
			var filename = "_ajax/handle_reminders.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText == 0) {
						countRem.divCount.style.textDecoration = 'none';
						countRem.divCount.innerHTML = '(' + responseText + ')';
					} else {
						countRem.divCount.style.textDecoration = 'blink';
						countRem.divCount.innerHTML = '(' + responseText + ')';
					}
				} else {
					countRem.divCount.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" />';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	playTime: function() {
		var timer = setInterval(countRem.count, 60000);
	}
};

Core.start(countRem);
