// JavaScript Document

var chat = {
	
	init: function() {
		
		chat.status = false;
		
		chat.mainDiv = $('liveSupport');
		chat.form = $('frmchat');
		chat.input = $('chatmsg');
		chat.div = $('returnmsg');
		chat.container = $('msgContainer');
		chat.mainSwicth = $('housekeeping');
		chat.swicth = $('onoff');
		
		chat.mainDiv.style.display = 'none';
		chat.container.style.height = 0 + 'px';
		
		Core.addEventListener(chat.form, 'submit', chat.handleSubmit);
		Core.addEventListener(chat.swicth, 'click', chat.show);
		Core.addEventListener(chat.mainSwicth, 'click', chat.onoff);
		
		chat.clear();
		setTimeout(chat.readChat, 3500);
	},
		
	handleSubmit: function(event) {
		
		var msg = chat.input.value;
		
		chat.input.value = '';
		chat.div.scrollTop = chat.div.scrollHeight;
		
		if(msg == "") { 
			Core.preventDefault(event);
			return;
		}

		var sendString;
		sendString = 'put=put&msg=' + msg;
		
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
			var filename = "_ajax/chat.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							return true;
						} else {
							return;
						}
					}
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		
		Core.preventDefault(event);
	},
	
	clear: function() {

		var sendString;
		sendString = 'clear=clear';
		
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
			var filename = "_ajax/chat.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							return true;
						} else {
							return;
						}
					}
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	readChat: function() {

		var sendString;
		sendString = 'get=get';
		
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
			var filename = "_ajax/chat.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText != '') {
							chat.div.innerHTML = responseText;
							chat.div.scrollTop = chat.div.scrollHeight;
						} else if(responseText == ''){
							chat.div.innerHTML = '';
							return;
						}
					}
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	show: function(event) {
		if(!chat.status) {
			chat.container.style.height = 'auto';
			chat.div.scrollTop = chat.div.scrollHeight;
			chat.status = true;
			chat.timer = setInterval(chat.readChat, 1000);
		} else {
			clearInterval(chat.timer);
			chat.timer = null;
			chat.container.style.height = 0 + 'px';
			chat.status = false;
		}
		Core.preventDefault(event);
	},
	
	onoff: function(event) {
		if(chat.mainDiv.style.display == 'none')  {
			clearInterval(chat.timer);
			chat.timer = null;
			chat.mainDiv.style.display = 'inherit'
		} else {
			chat.mainDiv.style.display = 'none'
		}
		Core.preventDefault(event);
	}
};

Core.start(chat);