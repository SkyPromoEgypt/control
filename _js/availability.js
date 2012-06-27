// Javascript Document

var availability = {
	
	init:function() {
	
		availability.panel = $('availability');
		availability.div = $('avResults');
		availability.swicth = $('availLink');
		availability.closeBtn = $('avX');

		// form and its elements
		availability._arrDate = $('uarr_date');
		availability._depDate = $('udep_date');
		availability._roomType = $('uroom_type');
		availability._roomCat = $('uroom_cat');
		availability._button = $('ucheckAvBtn');
		
		availability.duration = 0.5;
		availability.frameRate = 75;
		
		availability.initB = -260;
		availability.endB = 0;
		availability.tB = availability.initB;
		
		availability.increment = (availability.endB - availability.initB) / (availability.duration * availability.frameRate);
		
		availability.status = 'collapsed'
		
		Core.addEventListener(availability._button, "click", availability.check);
		Core.addEventListener(availability.swicth, "click", availability.onOff);
		Core.addEventListener(availability.closeBtn, "click", availability.collapse);
		Core.addEventListener(document, "keydown", availability.Close);
		Core.addEventListener(document, "keydown", availability.shortCut);
		
	},
	
	check: function() {
		
		var arrDate = availability._arrDate.value;
		var depDate = availability._depDate.value;
		var roomType = availability._roomType.options[availability._roomType.selectedIndex].value;
		var roomCat = availability._roomCat.options[availability._roomCat.selectedIndex].value;
		
		if(arrDate == '') {
			Alert.openListener('', 'please choose arrival date', 'alert', '');
			return;
		}
		
		if(depDate == '') {
			Alert.openListener('', 'please choose departure date', 'alert', '');
			return;
		}
		
		if(!Core.compareDates(arrDate, depDate)) {
			Alert.openListener('', 'Departue date must be greater than arrival date', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'arr_d='+arrDate;
		sendString += '&dep_d='+depDate;
		if(roomType != '') sendString += '&roomType='+roomType;
		if(roomCat != '') sendString += '&roomCat='+roomCat;
		sendString += '&control=control';
		
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
			var filename = "_ajax/check_availability.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						availability.div.innerHTML = responseText;
					}
				} else {
					availability.div.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Checking availability</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	onOff: function(event) {
		if(availability._timer) clearTimeout(availability._timer);
		if(availability.status == 'collapsed') {
			availability.expand();
			availability.status = 'expanded'
		} else {
			availability.collapse();
			availability.status = 'collapsed'
		}
		availability.resetForm();
		Core.preventDefault(event);	
	},
	
	expand: function() {
		availability.tB += availability.increment;
		if(availability.tB >= availability.endB) {
			availability.tB = 0;
		} else {
			availability._timer = setTimeout(availability.expand, 1000 / availability.frameRate);
		}
		availability.panel.style.bottom = availability.tB + 'px';
	},
	
	collapse: function() {
		availability.tB -= availability.increment;
		if(availability.tB <= availability.initB) {
			availability.tB = availability.initB;
		} else {
			availability._timer = setTimeout(availability.collapse, 1000 / availability.frameRate);
		}
		availability.panel.style.bottom = availability.tB + 'px';
	},
	
	resetForm: function() {
		
		availability.div.innerHTML = '';
		availability._arrDate.value = '';
		availability._depDate.value = '';
		availability._roomType.selectedIndex = 0;
		availability._roomCat.selectedIndex = 0;
	},
	
	shortCut: function(event) {
		var key = event.which || event.keyCode
		if(key == 121) {
			availability.onOff(event);
		}
	},
	
	Close: function(event) {
		var key = event.which || event.keyCode
		if(key == 27) {
			if(availability.status == 'collapsed') {
				return;
			} else {
				if(availability._timer) clearTimeout(availability._timer);
				availability.collapse();
				availability.status = 'collapsed'
			}
			availability.resetForm();
		}
	},
};

Core.start(availability);