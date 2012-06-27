// JavaScript Document

var rem = {
	
	init: function() {
		
		rem.div = $('monthView');
		rem.divRems = $('reminderDetails');
		
		rem.id;
		
		rem.remText = $('remText');
		rem.remDate = $('remDate');
		rem.addRem = $('addRem');
		rem.delRem = $('delRem');
		rem.refreshBtn = $('refreshBtn');
		rem.monthMenu = $('month');
		rem.yearMenu = $('year');
		
 		rem.nextMonth = $('nextMonth');
		rem.prevMonth = $('prevMonth');
		rem.nextYear = $('nextYear');
		rem.prevYear = $('prevYear');
		
		var date = new Date();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		
		for(var i = 0, ii = rem.monthMenu.options.length; i<ii; i++) {
			if(rem.monthMenu.options[i].value == month) {
				rem.monthMenu.options.selectedIndex = i;
			}
		}
		
		for(var i = 0, ii = rem.yearMenu.options.length; i<ii; i++) {
			if(rem.yearMenu.options[i].value == year) {
				rem.yearMenu.options.selectedIndex = i;
			}
		}
		
		Core.addEventListener(rem.refreshBtn, "click", rem.getReminders);
		Core.addEventListener(rem.refreshBtn, "click", countmail.count);
		Core.addEventListener(rem.monthMenu, "change", rem.getReminders);
		Core.addEventListener(rem.yearMenu, "change", rem.getReminders);
		Core.addEventListener(rem.addRem, "click", rem.addReminder);
		Core.addEventListener(rem.delRem, "click", rem.delReminder);
		Core.addEventListener(rem.nextMonth, 'click', rem.setMonthUp);
		Core.addEventListener(rem.prevMonth, 'click', rem.setMonthDown);
		Core.addEventListener(rem.nextYear, 'click', rem.setYearUp);
		Core.addEventListener(rem.prevYear, 'click', rem.setYearDown);
		rem.getReminders();
		rem.resetRemForm();
		
	},
	
	getReminders: function() {
		
		var month = rem.monthMenu.options[rem.monthMenu.selectedIndex].value;
		var year = rem.yearMenu.options[rem.yearMenu.selectedIndex].value;
		
		var sendString;
		sendString = 'month=' + month + '&year=' + year;
		
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
			var filename = "_ajax/reminders.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						rem.div.innerHTML = responseText;
					}
				} else {
					rem.div.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Extracting Reminders</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	view: function(event, date) {
		rem.resetRemForm();
		rem.remDate.value = date;
		
		var sendString;
		sendString = 'date=' + date;
		
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
					if(responseText) {
						rem.divRems.innerHTML = responseText;
					}
				} else {
					rem.divRems.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Reminders</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		Core.preventDefault(event);
	},
	
	getRem: function(event, id, date, reminder) {
		rem.id = id;
		rem.remDate.value = date;
		rem.remText.value = reminder;
		rem.addRem.value = 'Edit Reminer';
		rem.delRem.style.display = 'inherit';
		Core.removeEventListener(rem.addRem, "click", rem.addReminder);
		Core.addEventListener(rem.addRem, "click", rem.editReminder);
		Core.preventDefault(event);
	},
	
	setRemDate: function(event, date) {
		rem.divRems.innerHTML = '';
		rem.resetRemForm();
		rem.remDate.value = date;
		Core.preventDefault(event);
	},
	
	addReminder: function() {
		if(rem.remDate.value == '') {
			Alert.openListener('', "Please Enter the Date", 'alert', '');
			return;
		}
		if(rem.remText.value == '') {
			Alert.openListener('', "Please Enter the reminder description", 'alert', '');
			return;
		}
		
		var date = rem.remDate.value;
		var reminder = rem.remText.value;
		
		var sendString;
		sendString = 'new=new&created=' + date + '&reminder=' + reminder;
		
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
					if(responseText) {
						rem.divRems.innerHTML = '';
						rem.getReminders();
						countRem.count();
						rem.resetRemForm();
					}
				} else {
					rem.divRems.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Adding Reminder</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	editReminder: function() {
		if(rem.remDate.value == '') {
			Alert.openListener('', "Please Enter the Date", 'alert', '');
			return;
		}
		if(rem.remText.value == '') {
			Alert.openListener('', "Please Enter the reminder description", 'alert', '');
			return;
		}
		
		var id = rem.id;
		var date = rem.remDate.value;
		var reminder = rem.remText.value;
		
		var sendString;
		sendString = 'update=update&created=' + date + '&reminder=' + reminder + '&id=' + id;
		
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
					if(responseText) {
						rem.divRems.innerHTML = '';
						rem.getReminders();
						countRem.count();
						rem.resetRemForm();
					}
				} else {
					rem.divRems.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Reminder</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	delReminder: function() {

		var id = rem.id;
		
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
			var filename = "_ajax/handle_reminders.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						rem.divRems.innerHTML = '';
						rem.getReminders();
						countRem.count();
						rem.resetRemForm();
					}
				} else {
					rem.divRems.innerHTML = '<img src="_images/ajax request2.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Deleteing Reminder</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	setMonthUp: function(event) {
		if((rem.monthMenu.options.selectedIndex + 1) > (rem.monthMenu.options.length - 1)) {
			rem.monthMenu.options.selectedIndex = 0;
			rem.setYearUp(event, 'no');
			
		} else {
			rem.monthMenu.options.selectedIndex++;
		}
		rem.getReminders();
		Core.preventDefault(event);
	},
	
	setMonthDown: function(event) {
		if((rem.monthMenu.options.selectedIndex - 1) < 0) {
			rem.monthMenu.options.selectedIndex = rem.monthMenu.options.length - 1;
			rem.setYearDown(event, 'no');
		} else {
			rem.monthMenu.options.selectedIndex--;
		}
		rem.getReminders();
		Core.preventDefault(event);
	},
	
	setYearUp: function(event, func) {
		if((rem.yearMenu.options.selectedIndex + 1) > (rem.yearMenu.options.length - 1)) {
			rem.yearMenu.options.selectedIndex = 0;
		} else {
			rem.yearMenu.options.selectedIndex++;
		}
		if(!func) rem.getReminders();
		Core.preventDefault(event);
	},
	
	setYearDown: function(event, func) {
		if((rem.yearMenu.options.selectedIndex - 1) < 0) {
			rem.yearMenu.options.selectedIndex = rem.yearMenu.options.length - 1;
		} else {
			rem.yearMenu.options.selectedIndex--;
		}
		if(!func) rem.getReminders();
		Core.preventDefault(event);
	},
	
	resetRemForm: function() {
		rem.id = null;
		rem.remDate.value = '';
		rem.remText.value = '';
		rem.addRem.value = 'Add Reminer';
		rem.delRem.style.display = 'none';
		Core.addEventListener(rem.addRem, "click", rem.addReminder);
		Core.removeEventListener(rem.addRem, "click", rem.editReminder);
	}
	
};

Core.start(rem);
