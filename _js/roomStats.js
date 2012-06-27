// Javascript Document

var rStat = {
	
	init: function() {
		
		rStat.div = $('allRoomsStats');
		rStat.booking = $('allRoomsStatsBooking');
		
		rStat.refreshBtn = $('refreshBtn');
		rStat.monthMenu = $('month');
		rStat.yearMenu = $('year');
		
		rStat.nextMonth = $('nextMonth');
		rStat.prevMonth = $('prevMonth');
		rStat.nextYear = $('nextYear');
		rStat.prevYear = $('prevYear');
		
		var date = new Date();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		
		for(var i = 0, ii = rStat.monthMenu.options.length; i<ii; i++) {
			if(rStat.monthMenu.options[i].value == month) {
				rStat.monthMenu.options.selectedIndex = i;
			}
		}
		
		for(var i = 0, ii = rStat.yearMenu.options.length; i<ii; i++) {
			if(rStat.yearMenu.options[i].value == year) {
				rStat.yearMenu.options.selectedIndex = i;
			}
		}
		
		Core.addEventListener(rStat.refreshBtn, "click", rStat.requestData);
		Core.addEventListener(rStat.refreshBtn, "click", rStat.preventAction);
		Core.addEventListener(rStat.monthMenu, "change", rStat.requestData);
		Core.addEventListener(rStat.yearMenu, "change", rStat.requestData);
		Core.addEventListener(rStat.nextMonth, 'click', rStat.setMonthUp);
		Core.addEventListener(rStat.prevMonth, 'click', rStat.setMonthDown);
		Core.addEventListener(rStat.nextYear, 'click', rStat.setYearUp);
		Core.addEventListener(rStat.prevYear, 'click', rStat.setYearDown);
		
		rStat.requestData();
		
	},
	
	preventAction: function(event) {
		Core.preventDefault(event);
	},
	
	setMonthUp: function(event) {
		if((rStat.monthMenu.options.selectedIndex + 1) > (rStat.monthMenu.options.length - 1)) {
			rStat.monthMenu.options.selectedIndex = 0;
			rStat.setYearUp(event, 'no');
			
		} else {
			rStat.monthMenu.options.selectedIndex++;
		}
		rStat.requestData();
		Core.preventDefault(event);
	},
	
	setMonthDown: function(event) {
		if((rStat.monthMenu.options.selectedIndex - 1) < 0) {
			rStat.monthMenu.options.selectedIndex = rStat.monthMenu.options.length - 1;
			rStat.setYearDown(event, 'no');
		} else {
			rStat.monthMenu.options.selectedIndex--;
		}
		rStat.requestData();
		Core.preventDefault(event);
	},
	
	setYearUp: function(event, func) {
		if((rStat.yearMenu.options.selectedIndex + 1) > (rStat.yearMenu.options.length - 1)) {
			rStat.yearMenu.options.selectedIndex = 0;
		} else {
			rStat.yearMenu.options.selectedIndex++;
		}
		if(!func) rStat.requestData();
		Core.preventDefault(event);
	},
	
	setYearDown: function(event, func) {
		if((rStat.yearMenu.options.selectedIndex - 1) < 0) {
			rStat.yearMenu.options.selectedIndex = rStat.yearMenu.options.length - 1;
		} else {
			rStat.yearMenu.options.selectedIndex--;
		}
		if(!func) rStat.requestData();
		Core.preventDefault(event);
	},
	
	requestData: function() {
		
		var month = rStat.monthMenu.value;
		var year = rStat.yearMenu.value;
		
		var sendString;
		sendString = 'roomStats=roomStats&month=' + month + '&year=' + year;
		
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
			var filename = "_ajax/room_stats.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						rStat.div.innerHTML = responseText;
					} else {
						rStat.div.innerHTML = 'Sorry no records in your DB';
					}
				} else {
					rStat.div.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading All Records</span>';
					if(document.URL.indexOf('email') != -1) rStat.div.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Customers Records</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	addActive: function(ref) {
		for(var i = 0, ii = rStat.navigation.length; i<ii; i++) {
			if(i == ref) {
				Core.addClass(rStat.navigation[ref], 'active');
			} else {
				Core.removeClass(rStat.navigation[i], 'active');
			}
		}
	},
	
	show: function(event, bkref) {
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
						Core.show(rStat.div);
						rStat.booking.innerHTML = '<p><strong>Details about booking #' + bkref + '</strong></p><p>&nbsp;</p>';
						var therStat = responseXML.getElementsByTagName('booking')[0];
						rStat.booking.innerHTML += '<p><span class="red">Name: </span>' + therStat.getElementsByTagName('customer_name')[0].firstChild.nodeValue + '</p>';
						if(therStat.getElementsByTagName('room_mates')[0].firstChild) 
						rStat.booking.innerHTML += '<p><span class="red">Room Mates: </span>' + therStat.getElementsByTagName('room_mates')[0].firstChild.nodeValue + '</p>';
						rStat.booking.innerHTML += '<p><span class="red">E-mail: </span>' + therStat.getElementsByTagName('email')[0].firstChild.nodeValue + '</p>';
						if(therStat.getElementsByTagName('nationality')[0].firstChild)  {
							rStat.booking.innerHTML += '<p><span class="red">Nationality: </span>' + therStat.getElementsByTagName('nationality')[0].firstChild.nodeValue + '</p>';
						}
						rStat.booking.innerHTML += '<p><span class="red">Arrival Date: </span>' + therStat.getElementsByTagName('arr_d')[0].firstChild.nodeValue + '</p>';
						rStat.booking.innerHTML += '<p><span class="red">Departure Date: </span>' + therStat.getElementsByTagName('dep_d')[0].firstChild.nodeValue + '</p>';
						if(therStat.getElementsByTagName('booked_through')[0].firstChild) {
							rStat.booking.innerHTML += '<p><span class="red">Booked Through: </span>' + therStat.getElementsByTagName('booked_through')[0].firstChild.nodeValue + '</p>';
						}
						if(therStat.getElementsByTagName('room_price')[0].firstChild) {
							rStat.booking.innerHTML += '<p><span class="red">Room Price: </span>' + therStat.getElementsByTagName('room_price')[0].firstChild.nodeValue + '</p>';
						}
						if(therStat.getElementsByTagName('season')[0].firstChild) {
							rStat.booking.innerHTML += '<p><span class="red">Season: </span>' + therStat.getElementsByTagName('season')[0].firstChild.nodeValue + '</p>';
						}
						if(therStat.getElementsByTagName('discount')[0].firstChild) {
							rStat.booking.innerHTML += '<p><span class="red">Discount: </span>' + therStat.getElementsByTagName('discount')[0].firstChild.nodeValue + '</p>';
						}
						if(therStat.getElementsByTagName('dob')[0].firstChild) {
							rStat.booking.innerHTML += '<p><span class="red">Date of Birth: </span>' + therStat.getElementsByTagName('dob')[0].firstChild.nodeValue + '</p>';
						}
						if(therStat.getElementsByTagName('passport')[0].firstChild) {
							rStat.booking.innerHTML += '<p><span class="red">Passport Number: </span>' + therStat.getElementsByTagName('passport')[0].firstChild.nodeValue + '<p>';
						}
						if(therStat.getElementsByTagName('doe')[0].firstChild) {
							rStat.booking.innerHTML += '<p><span class="red">Date of Entry: </span>' + therStat.getElementsByTagName('doe')[0].firstChild.nodeValue + '</p>';
						}
						if(therStat.getElementsByTagName('boe')[0].firstChild) { 
							rStat.booking.innerHTML += '<p><span class="red">Border of Entry: </span>' + therStat.getElementsByTagName('boe')[0].firstChild.nodeValue + '</p>';
						}
						if(therStat.getElementsByTagName('pov')[0].firstChild) {
							rStat.booking.innerHTML += '<p><span class="red">Period of Visa: </span>' + therStat.getElementsByTagName('pov')[0].firstChild.nodeValue + '</p>';
						}
						if(therStat.getElementsByTagName('pickup')[0].firstChild) {
							if(therStat.getElementsByTagName('pickup')[0].firstChild.nodeValue == 'Yes') {
								rStat.booking.innerHTML += '<p><span class="red">Airport Pickup: </span>Ruested pickup from the airport</p>';
							}
						}
						if(therStat.getElementsByTagName('rpickup')[0].firstChild) { 
							if(therStat.getElementsByTagName('rpickup')[0].firstChild.nodeValue == 'Yes') {
								rStat.booking.innerHTML += '<p><span class="red">Retrun Transfer: </span>Ruested return transfer to the airport</p>';
							}
						}
						if(therStat.getElementsByTagName('notes')[0].firstChild) {
							rStat.booking.innerHTML += '<p><span class="red">Notes: </span>' + therStat.getElementsByTagName('notes')[0].firstChild.nodeValue + '</p>';
						}
						
					} else {
						Core.show(rStat.div);
						rStat.booking.innerHTML = 'No Data to Show';
					}
				} else {
					Core.show(rStat.div);
					rStat.booking.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Updating Information</span>';
				}
			}
			xhr.send('bkref=' + bkref);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		Core.preventDefault(event);
	}
	
};

Core.start(rStat);