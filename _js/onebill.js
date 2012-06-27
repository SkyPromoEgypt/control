// Javascript Document

var billing = {
	
	init:function() {

		billing._checkout = $('checkoutresults');
		
		billing.form = $('bill');
		billing.form._loading = $('loadingBill');
		billing.form._name = $('name');
		billing.form._rmNames = $('rmnames');
		billing.form._email = $('email');
		billing.form._nationality = $('nationality');
		billing.form._arrDate = $('arr_date');
		billing.form._depDate = $('dep_date');
		billing.form._bkSource = $('bookedthrough');
		billing.form._roomPrice = $('roomprice');
		billing.form._season = $('season');
		billing.form._discount = $('discount');
		billing.form._accTotal = $('accommodation');
		billing.form._roomTotal = $('roomtotal');
		billing.form._dob = $('dob');
		billing.form._pass = $('pass');
		billing.form._doe = $('doe');
		billing.form._boe = $('boe');
		billing.form._pov = $('pov');
		billing.form._services = $('services');
		billing.form._servicestotal = $('total');
		billing.form._pickup = $('pickup');
		billing.form._returnPickup = $('rpickup');
		billing.form._pickuptotal = $('pickuptotal');
		billing.form._returnPickuptotal = $('rpickuptotal');
		billing.form._billtotal = $('billtotal');
		billing.form._calculate = $('calculate');
		billing.form._print = $('printBill');
		billing.form._close = $('closeBill');
		billing.form._refresh = $('refreshBtn');
		
		billing._total = 0;
		billing._transfer = 0;
		
		billing.form._calculate.disabled = 'disabled';
		billing.form._print.disabled = 'disabled';
		billing.form._close.disabled = 'disabled';
		
		billing.form._pickuptotal.value = '';
		billing.form._returnPickuptotal.value = '';
		
		Core.addEventListener(billing.form._pickuptotal, 'focus', billing.changeValue);
		Core.addEventListener(billing.form._returnPickuptotal, 'focus', billing.changeValue);
		Core.addEventListener(billing.form._pickuptotal, 'blur', billing.changeValue);
		Core.addEventListener(billing.form._returnPickuptotal, 'blur', billing.changeValue);
		Core.addEventListener(billing.form._calculate, 'click', billing.countAll);
		Core.addEventListener(billing.form._print, 'click', function() { window.print(); });
		Core.addEventListener(billing.form._close, 'click', function(event) {
			Alert.openListener(event, 'Are you sure you want to delete this booking from your records?', 'confirm', function() { billing.closeBill(); } )
		});
		Core.addEventListener(billing.form._refresh, 'click', billing.refreshBill);
		
		if(theBill.bkref != null) billing.getBill(theBill.bkref);
		else billing.refreshBill();
	},
	
	getBooking: function(event, bkref) {
		
		billing._bkref = bkref;
		billing._total = 0;
		billing._transfer = 0;
		billing.form._billtotal.innerHTML = '';
		billing.form._pickuptotal.value = '';
		billing.form._returnPickuptotal.value = '';
		window.scroll(0,0);
		billing.getServices(bkref);
		billing.total(bkref);
		
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
						billing.form._loading.innerHTML = '';
						var thebooking = responseXML.getElementsByTagName('booking')[0];
						
						billing.form._name.innerHTML = thebooking.getElementsByTagName('customer_name')[0].firstChild.nodeValue;
						
						if(thebooking.getElementsByTagName('room_mates')[0].firstChild) 
						billing.form._rmNames.innerHTML = thebooking.getElementsByTagName('room_mates')[0].firstChild.nodeValue;
						
						billing.form._email.innerHTML = thebooking.getElementsByTagName('email')[0].firstChild.nodeValue;
						
						if(thebooking.getElementsByTagName('nationality')[0].firstChild)
						billing.form._nationality.innerHTML = thebooking.getElementsByTagName('nationality')[0].firstChild.nodeValue;
							
						billing.form._arrDate.innerHTML = thebooking.getElementsByTagName('arr_d')[0].firstChild.nodeValue;
						
						billing.form._depDate.innerHTML = thebooking.getElementsByTagName('dep_d')[0].firstChild.nodeValue;
						
						if(thebooking.getElementsByTagName('booked_through')[0].firstChild)
						billing.form._bkSource.innerHTML = thebooking.getElementsByTagName('booked_through')[0].firstChild.nodeValue;
								
						if(thebooking.getElementsByTagName('room_price')[0].firstChild) 
						billing.form._roomPrice.innerHTML = thebooking.getElementsByTagName('room_price')[0].firstChild.nodeValue;
							
						if(thebooking.getElementsByTagName('season')[0].firstChild)
						billing.form._season.innerHTML = thebooking.getElementsByTagName('season')[0].firstChild.nodeValue;

						if(thebooking.getElementsByTagName('discount')[0].firstChild) 
						billing.form._discount.innerHTML = thebooking.getElementsByTagName('discount')[0].firstChild.nodeValue;
						
						if(thebooking.getElementsByTagName('days_accommodation')[0].firstChild) 
						billing.form._accTotal.innerHTML = thebooking.getElementsByTagName('days_accommodation')[0].firstChild.nodeValue;
						
						if(thebooking.getElementsByTagName('total_price')[0].firstChild) 
						billing.form._roomTotal.innerHTML = thebooking.getElementsByTagName('profit')[0].firstChild.nodeValue;
						billing._total += parseInt(thebooking.getElementsByTagName('profit')[0].firstChild.nodeValue, 10);
						
						if(thebooking.getElementsByTagName('dob')[0].firstChild) 
						billing.form._dob.innerHTML = thebooking.getElementsByTagName('dob')[0].firstChild.nodeValue;
						
						if(thebooking.getElementsByTagName('passport')[0].firstChild)
						billing.form._pass.innerHTML = thebooking.getElementsByTagName('passport')[0].firstChild.nodeValue;
						
						if(thebooking.getElementsByTagName('doe')[0].firstChild) 
						billing.form._doe.innerHTML = thebooking.getElementsByTagName('doe')[0].firstChild.nodeValue;
						
						if(thebooking.getElementsByTagName('boe')[0].firstChild) 
						billing.form._boe.innerHTML = thebooking.getElementsByTagName('boe')[0].firstChild.nodeValue;
						
						if(thebooking.getElementsByTagName('pov')[0].firstChild) 
						billing.form._pov.innerHTML = thebooking.getElementsByTagName('pov')[0].firstChild.nodeValue;
						
						if(thebooking.getElementsByTagName('pickup')[0].firstChild) {
							if(thebooking.getElementsByTagName('pickup')[0].firstChild.nodeValue == 'Yes') {
								billing.form._pickup.innerHTML = 'Yes';
							} else {
								billing.form._pickup.innerHTML = 'No';
							}
						}
						
						
						if(thebooking.getElementsByTagName('rpickup')[0].firstChild) {
							if(thebooking.getElementsByTagName('rpickup')[0].firstChild.nodeValue == 'Yes') {
								billing.form._returnPickup.innerHTML = 'Yes'; 
							} else {
								billing.form._returnPickup.innerHTML = 'No'; 
							}
							
						}
					}
				} else {
					billing.form._loading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Loading Data</span>';
				}
			}
			xhr.send('bkref=' + bkref);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		billing.form._calculate.disabled = '';
		billing.form._print.disabled = '';
		billing.form._close.disabled = '';
		Core.preventDefault(event);
	},
	
	getServices: function(bkref) {
		
		var sendString;
		if(bkref != '') sendString = 'bkref='+bkref+'&show=show';
		
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
			var filename = "_ajax/get_activity.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						billing.form._services.innerHTML = responseText;
					}
				} else {
					billing.form._services.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Services List</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	total: function(bkref) {
		
		var sendString;
		if(bkref != '') sendString = 'bkref='+bkref+'&total=total';
		
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
			var filename = "_ajax/get_activity.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == '<p>No services found for this booking</p>') {
							billing.form._servicestotal.innerHTML = 0;
						} else {
							billing.form._servicestotal.innerHTML = responseText;
							billing._total += parseInt(responseText, 10);
						}
					}
				} else {
					billing.form._servicestotal.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Services List</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	changeValue: function() {
		billing.form._calculate.disabled = '';
		var pickup, rpickup;
		if(billing.form._pickuptotal.value == '') {
			pickup = 0;
		} else {
			pickup = parseInt(billing.form._pickuptotal.value, 10);
		}
		if(billing.form._returnPickuptotal.value == '') {
			rpickup = 0;
		} else {
			rpickup =  parseInt(billing.form._returnPickuptotal.value, 10);
		}
		billing._transfer =pickup + rpickup;
	},
	
	countAll: function() {
		billing._payment = billing._transfer + billing._total;
		billing.form._billtotal.innerHTML = billing._payment;
		//billing._total = 0;
		billing.form._calculate.disabled = 'disabled';
	},
	
	closeBill: function() {
		
		
			var sendString;
			sendString = 'bkref='+billing._bkref+'&status=close';
			
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
				var filename = "_ajax/close_booking.php";
				xhr.open("POST", filename, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseText = xhr.responseText;
						if(responseText) {
							if(responseText == 'done') {
								billing.form._loading.innerHTML = '';
								Alert.openListener('', 'Booking has been closed successfully', 'alert', '');
								billing.refreshBill();
							}
						}
					} else {
						billing.form._loading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Closing Booking</span>';
					}
				}
				xhr.send(sendString);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
		
	},
	
	refreshBill: function(event) {
		
			var sendString;
			sendString = 'checkout=checkout';

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
				var filename = "_ajax/get_checkout.php";
				xhr.open("POST", filename, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseText = xhr.responseText;
						if(responseText) {
							billing._checkout.innerHTML = responseText;
						}
					} else {
						billing._checkout.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Bills</span>';
					}
				}
				xhr.send(sendString);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
		if(event) {
			Core.preventDefault(event);
		}
	},
	
	getBill: function(bkref) {
		
			var sendString;
			sendString = 'bkref=' + bkref;

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
				var filename = "_ajax/get_checkout.php";
				xhr.open("POST", filename, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseText = xhr.responseText;
						if(responseText) {
							$('checkoutresults').innerHTML = responseText;
						}
					} else {
						$('checkoutresults').innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Bills</span>';
					}
				}
				xhr.send(sendString);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
	}
};

Core.start(billing);