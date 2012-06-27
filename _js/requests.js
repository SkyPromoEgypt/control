// JavaScript Document

var req = {
	
	init: function() {
		
		req.div = $('roomsView');
		req.divRems = $('reminderDetails');
		
		req.id;
		req.room;
		
		req.remRoom = $('grRoomNumber');
		req.remText = $('remText');
		req.remDate = $('remDate');
		req.add = $('addRem');
		req.del = $('delRem');
		req.refreshBtn = $('refreshBtn');
		
		Core.addEventListener(req.refreshBtn, "click", req.loadRequests);
		Core.addEventListener(req.add, "click", req.addRequest);
		Core.addEventListener(req.del, "click", req.delRequest);
		req.loadRequests();
		req.resetRemForm();
		
	},
	
	loadRequests: function() {
		
		var sendString;
		sendString = 'req=req';
		
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
			var filename = "_ajax/requests.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						req.div.innerHTML = responseText;
					}
				} else {
					req.div.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Extracting Requests</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	getRequests: function(event, room) {
		
		req.resetRemForm();
		req.room = room;
		req.remRoom.innerHTML = room;
		var sendString;
		sendString = 'get=get&room=' + room;
		
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
					if(responseText) {
						req.divRems.innerHTML = responseText;
					}
				} else {
					req.divRems.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Requests</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		Core.preventDefault(event);
	},
	
	resetRemForm: function() {
		req.id = null;
		req.remDate.value = '';
		req.remText.value = '';
		req.add.value = 'Add Reminer';
		req.del.style.display = 'none';
		req.remRoom.innerHTML = '';
		Core.addEventListener(req.add, "click", req.addRequest);
		Core.removeEventListener(req.add, "click", req.editRequest);
	},
	
	view: function(event, id, room, date, request) {
		
		req.resetRemForm();
		
		req.id = id;
		req.room = room;
		req.remRoom.innerHTML = room;
		req.remDate.value = date;
		req.remText.value = request;
		req.add.value = 'Edit Request';
		req.del.style.display = 'inherit';
		Core.removeEventListener(req.add, "click", req.addRequest);
		Core.addEventListener(req.add, "click", req.editRequest);
		
		Core.preventDefault(event);
	},
	
	setRequest: function(event, room) {
		req.divRems.innerHTML = '';
		req.resetRemForm();
		req.room = room;
		req.remRoom.innerHTML = room;
		Core.preventDefault(event);
	},
	
	addRequest: function() {
		
		if(req.remDate.value == '') {
			Alert.openListener('', "Please Enter the Date", 'alert', '');
			return;
		}
		
		if(req.remText.value == '') {
			Alert.openListener('', "Please Enter the request description", 'alert', '');
			return;
		}
		
		var date = req.remDate.value;
		var request = req.remText.value;
		
		var sendString;
		sendString = 'new=new&created=' + date + '&request=' + request + '&room=' + req.room;
		
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
					if(responseText) {
						req.divRems.innerHTML = '';
						req.loadRequests();
						countReq.count();
						req.resetRemForm();
					}
				} else {
					req.divRems.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Adding Request</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	editRequest: function() {
		
		if(req.remDate.value == '') {
			Alert.openListener('', "Please Enter the Date", 'alert', '');
			return;
		}
		if(req.remText.value == '') {
			Alert.openListener('', "Please Enter the reminder description", 'alert', '');
			return;
		}
		
		var id = req.id;
		var date = req.remDate.value;
		var request = req.remText.value;
		
		var sendString;
		sendString = 'update=update&created=' + date + '&request=' + request + '&id=' + id;
		
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
					if(responseText) {
						req.divRems.innerHTML = '';
						req.loadRequests();
						countReq.count();
						req.resetRemForm();
					}
				} else {
					req.divRems.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Request</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	delRequest: function() {

		var id = req.id;
		
		var sendString;
		sendString = 'delete=delete&id=' + id;
		
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
					if(responseText) {
						req.divRems.innerHTML = '';
						req.loadRequests();
						countReq.count();
						req.resetRemForm();
					}
				} else {
					req.divRems.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Deleteing Request</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
};

Core.start(req);
