// Javascript Document

var availability = {
	
	init:function() {
	
		availability.div = $('bookingData');

		// form and its elements
		availability._arrDate = $('arr_date');
		availability._depDate = $('dep_date');
		availability._roomType = $('room_type');
		availability._roomCat = $('room_cat');
		availability._button = $('checkAvBtn');
		availability._advancedSearch = $('advancedSearch');
		
		availability._advSearchFields = Core.getElementsByClass('advSearch');
		
		for(var i = 0, ii = availability._advSearchFields.length; i<ii; i++) {
			availability._advSearchFields[i].style.display = 'none';
		}
		
		Core.addEventListener(availability._button, "click", availability.add);
		Core.addEventListener(availability._advancedSearch, "click", availability.showHide);
		
	},
	
	showHide: function(event) {
		availability._roomType.selectedIndex = 0;
		availability._roomCat.selectedIndex = 0;
		for(var i = 0, ii = availability._advSearchFields.length; i<ii; i++) {
			availability._advSearchFields[i].style.display = (availability._advSearchFields[i].style.display == 'none') ? '' : 'none';
		}
		availability._advancedSearch.innerHTML = (availability._advancedSearch.innerHTML == 'Basic Search') ? 'Advanced Search' : 'Basic Search';
		Core.preventDefault(event);
	},
	
	add: function() {
		
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
		
	}
};

Core.start(availability);