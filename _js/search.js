// Javascript Document

var Search = {
	
	init:function() {
	
		Search.div = $('bookingDetails');
		Search.searchDiv = $('searchRsults');
		
		// form and its elements
		Search._name = $('name');
		Search._room = $('room');
		Search._bkref = $('bkref');
		Search._nationality = $('nationality');
		Search._pass = $('pass');
		Search._arrDate = $('arrDate');
		Search._depDate = $('depDate');
		Search._button = $('submit');
		
		Core.addEventListener(Search._button, "click", Search.getResults);
		
	},
	
	getResults: function() {
		
		var name = Search._name.value;
		var room = Search._room.value;
		var bkref = Search._bkref.value;
		var nationality = Search._nationality.value;
		var pass = Search._pass.value;
		var arrDate = Search._arrDate.value;
		var depDate = Search._depDate.value;
		
		if(name == '' && room == '' && bkref == '' && nationality == '' && pass == '' && arrDate == '' && depDate == '') {
			Search.div.innerHTML = ''; 
			Alert.openListener('', 'Use at least 1 search field', 'alert', '');
			return;
		}
		
		if(arrDate && depDate) {
			if(!Core.compareDates(arrDate, depDate)) {
				Alert.openListener('', 'Departue date must be greater than arrival date', 'alert', '');
				return;
			}
		}
		
		var formFields = new Array();
		formFields['customer_name'] = name;
		formFields['room_number'] = room;
		formFields['booking_reference'] = bkref;
		formFields['nationality'] = nationality;
		formFields['passport'] = pass;
		formFields['arr_d'] = arrDate;
		formFields['dep_d'] = depDate;
		
		var formFieldsName = ['customer_name', 'room_number', 'booking_reference', 'nationality', 'passport', 'arr_d', 'dep_d']
		
		var searchFields = new Array();
		
		for(var i=0, ii=formFieldsName.length; i<ii; i++) {
			if(formFields[formFieldsName[i]] != '') {
				searchFields[searchFields.length] = formFieldsName[i];
			}
		}
		
		var sendString;
		
		for(var i=0, ii=searchFields.length; i<ii; i++) {
			if(i == 0) {
				sendString = searchFields[0] + '=' + formFields[searchFields[0]];
			} else {
				sendString += '&' + searchFields[i] + '=' + formFields[searchFields[i]];
			}
		}
		
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
			var filename = "_ajax/search.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						Search.searchDiv.innerHTML = responseText;
					}
				} else {
					Search.searchDiv.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Searching...</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		
	},
	
	showBooking: function(event, bkref) {
		window.scroll(0,0);
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
			var filename = "_ajax/get_booking.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseXML = xhr.responseXML;
					if(responseXML) {
						Core.show(Search.div);
						Search.div.innerHTML = '<p><strong>Details about this booking</strong></p><p>&nbsp;</p>';
						var theSearch = responseXML.getElementsByTagName('booking')[0];
						Search.div.innerHTML += '<p><span class="red">Name: </span>' + theSearch.getElementsByTagName('customer_name')[0].firstChild.nodeValue + '</p>';
						if(theSearch.getElementsByTagName('room_mates')[0].firstChild) 
						Search.div.innerHTML += '<p><span class="red">Room Mates: </span>' + theSearch.getElementsByTagName('room_mates')[0].firstChild.nodeValue + '</p>';
						Search.div.innerHTML += '<p><span class="red">E-mail: </span>' + theSearch.getElementsByTagName('email')[0].firstChild.nodeValue + '</p>';
						if(theSearch.getElementsByTagName('nationality')[0].firstChild)  {
							Search.div.innerHTML += '<p><span class="red">Nationality: </span>' + theSearch.getElementsByTagName('nationality')[0].firstChild.nodeValue + '</p>';
						}
						Search.div.innerHTML += '<p><span class="red">Arrival Date: </span>' + theSearch.getElementsByTagName('arr_d')[0].firstChild.nodeValue + '</p>';
						Search.div.innerHTML += '<p><span class="red">Departure Date: </span>' + theSearch.getElementsByTagName('dep_d')[0].firstChild.nodeValue + '</p>';
						if(theSearch.getElementsByTagName('booked_through')[0].firstChild) {
							Search.div.innerHTML += '<p><span class="red">Booked Through: </span>' + theSearch.getElementsByTagName('booked_through')[0].firstChild.nodeValue + '</p>';
						}
						if(theSearch.getElementsByTagName('room_price')[0].firstChild) {
							Search.div.innerHTML += '<p><span class="red">Room Price: </span>' + theSearch.getElementsByTagName('room_price')[0].firstChild.nodeValue + '</p>';
						}
						if(theSearch.getElementsByTagName('season')[0].firstChild) {
							Search.div.innerHTML += '<p><span class="red">Season: </span>' + theSearch.getElementsByTagName('season')[0].firstChild.nodeValue + '</p>';
						}
						if(theSearch.getElementsByTagName('discount')[0].firstChild) {
							Search.div.innerHTML += '<p><span class="red">Discount: </span>' + theSearch.getElementsByTagName('discount')[0].firstChild.nodeValue + '</p>';
						}
						if(theSearch.getElementsByTagName('dob')[0].firstChild) {
							Search.div.innerHTML += '<p><span class="red">Date of Birth: </span>' + theSearch.getElementsByTagName('dob')[0].firstChild.nodeValue + '</p>';
						}
						if(theSearch.getElementsByTagName('passport')[0].firstChild) {
							Search.div.innerHTML += '<p><span class="red">Passport Number: </span>' + theSearch.getElementsByTagName('passport')[0].firstChild.nodeValue + '<p>';
						}
						if(theSearch.getElementsByTagName('doe')[0].firstChild) {
							Search.div.innerHTML += '<p><span class="red">Date of Entry: </span>' + theSearch.getElementsByTagName('doe')[0].firstChild.nodeValue + '</p>';
						}
						if(theSearch.getElementsByTagName('boe')[0].firstChild) { 
							Search.div.innerHTML += '<p><span class="red">Border of Entry: </span>' + theSearch.getElementsByTagName('boe')[0].firstChild.nodeValue + '</p>';
						}
						if(theSearch.getElementsByTagName('pov')[0].firstChild) {
							Search.div.innerHTML += '<p><span class="red">Period of Visa: </span>' + theSearch.getElementsByTagName('pov')[0].firstChild.nodeValue + '</p>';
						}
						if(theSearch.getElementsByTagName('pickup')[0].firstChild) {
							if(theSearch.getElementsByTagName('pickup')[0].firstChild.nodeValue == 'Yes') {
								Search.div.innerHTML += '<p><span class="red">Airport Pickup: </span>Ruested pickup from the airport</p>';
							}
						}
						if(theSearch.getElementsByTagName('rpickup')[0].firstChild) { 
							if(theSearch.getElementsByTagName('rpickup')[0].firstChild.nodeValue == 'Yes') {
								Search.div.innerHTML += '<p><span class="red">Retrun Transfer: </span>Ruested return transfer to the airport</p>';
							}
						}
						if(theSearch.getElementsByTagName('notes')[0].firstChild) {
							Search.div.innerHTML += '<p><span class="red">Notes: </span>' + theSearch.getElementsByTagName('notes')[0].firstChild.nodeValue + '</p>';
						}
						
					} else {
						Core.show(Search.div);
						Search.div.innerHTML = 'No Data to Show';
					}
				} else {
					Core.show(Search.div);
					Search.div.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Updating Information</span>';
				}
			}
			xhr.send('bkref=' + bkref);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		Core.preventDefault(event);
	}
};

Core.start(Search);