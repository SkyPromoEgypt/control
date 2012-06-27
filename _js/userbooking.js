// JavaScript Document

var userBooking = {
	
	init:function() {
	
		userBooking.div = $('bkformContainer'); // form container
		userBooking.loading = $('bookingStatus');
		userBooking._multi = new Array();
		userBooking._multipax = new Array();
		
		// form and its elements
		userBooking.form = $('frmCustomerBooking');
		userBooking.form._name = $('cname');
		userBooking.form._rmNames = $('crmnames');
		userBooking.form._email = $('cemail');
		userBooking.form._nationality = $('cnationality');
		userBooking.form._arrDate = $('carr_date');
		userBooking.form._depDate = $('cdep_date');
		userBooking.form._bkSource = $('bkSource');
		userBooking.form._roomPrice = $('roomPrice');
		userBooking.form._season = $('season');
		userBooking.form._discount = $('discount');
		userBooking.form._cdob = $('cdob');
		userBooking.form._cpass = $('cpass');
		userBooking.form._cdoe = $('cdoe');
		userBooking.form._eboe = $('eboe');
		userBooking.form._pov = $('pov');
		userBooking.form._pickup = $('pickup');
		userBooking.form._returnPickup = $('returnPickup');
		userBooking.form._notes = $('requests');
		userBooking.form._submit = $('submitBooking');
		
		userBooking.services = $('services');
		userBooking.services._list = $('actlist');
		userBooking.services._pax = $('pax');
		userBooking.services._add = $('submitActivity');
		userBooking.services._div = $('addedServices');
		
		Core.addEventListener(userBooking.form._submit, "click", userBooking.add);
		Core.addEventListener(userBooking.services._add, "click", userBooking.buildArray);
		
	},
	
	startBooking: function(event, roomNumber, arrDate, depDate, price) {
		Core.show(userBooking.div);
		userBooking.resetForm();
		userBooking.roomNumber = roomNumber;
		userBooking.form._arrDate.value = arrDate;
		userBooking.form._depDate.value = depDate;
		userBooking.form._roomPrice.value = price;
		userBooking.loading.innerHTML = '';
		userBooking.services._div.innerHTML = '';
		userBooking._multi = [];
		userBooking._multipax = [];
		Core.preventDefault(event);
	},
	
	add: function() {
		
		var room = userBooking.roomNumber;
		var name = userBooking.form._name.value;
		var rmNames = userBooking.form._rmNames.value;
		var email = userBooking.form._email.value;
		var nationality = userBooking.form._nationality.options[userBooking.form._nationality.selectedIndex].value;
		var arrDate = userBooking.form._arrDate.value;
		var depDate = userBooking.form._depDate.value;
		var bkSource = userBooking.form._bkSource.value;
		var roomPrice = userBooking.form._roomPrice.value;
		var season = userBooking.form._season.value;
		var discount = userBooking.form._discount.value;
		var cdob = userBooking.form._cdob.value;
		var cpass = userBooking.form._cpass.value;
		var cdoe = userBooking.form._cdoe.value;
		var eboe = userBooking.form._eboe.value;
		var pov = userBooking.form._pov.value;
		var multi = userBooking._multi.toString();
		var multipax = userBooking._multipax.toString();
		if(userBooking.form._pickup.checked == 1)var pickup = 1;
		else var pickup = 0;
		if(userBooking.form._returnPickup.checked == 1)var returnPickup = 1;
		else var returnPickup = 0;
		var notes = userBooking.form._notes.value;
				
		var sendString;
		if(room != '') sendString = 'room='+room;
		if(name != '') sendString += '&name='+name;
		if(rmNames != '') sendString += '&rmNames='+rmNames;
		if(email != '') sendString += '&email='+email;
		if(nationality != '') sendString += '&nationality='+nationality;
		if(arrDate != '') sendString += '&arr_d='+arrDate;
		if(depDate != '') sendString += '&dep_d='+depDate;
		if(bkSource != '') sendString += '&bkSource='+bkSource;
		if(roomPrice != '') sendString += '&roomPrice='+roomPrice;
		if(season != '') sendString += '&season='+season;
		if(discount != '') sendString += '&discount='+discount;
		if(cdob != '') sendString += '&dob='+cdob;
		if(cpass != '') sendString += '&pass='+cpass;
		if(cdoe != '') sendString += '&doe='+cdoe;
		if(eboe != '') sendString += '&boe='+eboe;
		if(pov != '') sendString += '&pov='+pov;
		if(multi != '') sendString += '&multi='+multi;
		if(multipax != '') sendString += '&multipax='+multipax;
		if(pickup != '') sendString += '&pickup='+pickup;
		if(returnPickup != '') sendString += '&returnPickup='+returnPickup;
		if(notes != '') sendString += '&notes='+notes;
		sendString += '&confirmEmail=notify';
		sendString += '&sysMail=notify';
		
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
			var filename = "_ajax/booking.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							availability.add();
							userBooking.loading.innerHTML = '<p>Your booking was successfully added to our system and an email address has been forwarded to you with all the information about your booking. Please print the sent voucher and hand it to the reception operator upon your arrival.</p>';
						} else {
							userBooking.loading.innerHTML = '<p>Sorry the room has been booked.<p>';
						}
					}
				} else {
					userBooking.loading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.75em;">Submitting Booking</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		};
	},
	
	buildArray: function() {
		var activity = userBooking.services._list.options[userBooking.services._list.selectedIndex].value;
		var pax = userBooking.services._pax.value;
		if(pax == '') {
			Alert.openListener('', 'please specify how many pax are interested', 'alert', '');
			return;
		}
		userBooking._multi[userBooking._multi.length] = activity;
		userBooking._multipax[userBooking._multipax.length] = pax;
		userBooking.services._div.innerHTML += '<p>(' + pax + ') | ' + activity + '</p>';
	},
	
	resetForm: function() {
		userBooking.form._name.value = '';
		userBooking.form._rmNames.value = '';
		userBooking.form._email.value = '';
		userBooking.form._nationality.selectedIndex = 0;
		userBooking.form._arrDate.value = '';
		userBooking.form._depDate.value = '';
		userBooking.form._roomPrice.value = '';
		userBooking.form._cdob.value = '';
		userBooking.form._cpass.value = '';
		userBooking.form._cdoe.value = '';
		userBooking.form._eboe.value = '';
		userBooking.form._pov.value = '';
		userBooking.form._pickup.checked = false;
		userBooking.form._returnPickup.checked = false;
		userBooking.form._notes.value = '';
		userBooking.services._list.selectedIndex = -1;
		userBooking.services._pax.value = '';
	}
}

Core.start(userBooking);

