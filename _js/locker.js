// JavaScript Document

var locker = {
	
	init: function() {
		
		locker.overlay = $('overlay');
		locker.lockLink = $('locker');
		
		locker.frm = $('frmUnlock');
		locker._password = $('unlockpass');
		locker._submit = $('unlock');
		locker._loading = $('unlockLoading');
		
		Core.center(locker.frm);
		
		Core.addEventListener(locker.lockLink, 'click', locker.lock);
		Core.addEventListener(locker._submit, 'click', locker.unlock);
		Core.addEventListener(window, 'resize', function() { Core.center(locker.frm); });
		Core.addEventListener(document, 'keyup', locker.handleClose);
		Core.addEventListener(document, 'keyup', locker.timer);
		Core.addEventListener(document, 'mousemove', locker.timer);
		
		locker.checkCookie();
		
	},
	
	timer: function() {
		if(locker._timer) clearTimeout(locker._timer);
		locker._timer = setTimeout(locker.screenSaver, 300000);
	},
	
	screenSaver: function() {
		locker._password.value = '';
		Core.show(locker.overlay);
		locker.setCookie('status', 'locked', 365);
		Core.removeEventListener(document, 'keyup', locker.timer);
		Core.removeEventListener(document, 'mousemove', locker.timer);
		Core.removeEventListener(document, 'keyup', locker.handleClose);
	},
	
	lock: function(event) {
		locker._password.value = '';
		Core.show(locker.overlay);
		locker.setCookie('status', 'locked', 365);
		Core.removeEventListener(document, 'keyup', locker.timer);
		Core.removeEventListener(document, 'mousemove', locker.timer);
		Core.removeEventListener(document, 'keyup', locker.handleClose);
		if(event) Core.preventDefault(event);
	},
	
	unlock: function(event) {
		
		var unlock = locker._password.value;
		
		if(unlock == '') {
			Alert.openListener('', 'please enter you password to unlock', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'unlock=' + Core.c2sencrypt(unlock);
		
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
			var filename = "_ajax/locker.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'unlocked') {
							locker._loading.innerHTML = '';
							locker.setCookie('status', 'unlocked', 365);
							Core.hide(locker.overlay);
							Core.addEventListener(document, 'keyup', locker.handleClose);
							Core.addEventListener(document, 'keyup', locker.timer);
							Core.addEventListener(document, 'mousemove', locker.timer);
						} else {
							locker._loading.innerHTML = 'Wrong Password';
						}
					}
				} else {
					locker._loading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Unlocking...</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		Core.preventDefault(event);
	},
	
	setCookie: function(c_name,value,expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name+ "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
	},
	
	getCookie: function(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
	
	checkCookie: function() {
		var status = locker.getCookie('status');
		if (status == "locked") {
			locker.lock();
		}
	},
	
	handleClose: function(event) {
		var key = event.which || event.keyCode
		if(key == 120) {
			locker.screenSaver();
		}
	},
};

Core.start(locker);