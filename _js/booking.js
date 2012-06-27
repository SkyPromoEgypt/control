// Javascript Document

var booking = {
	
	init:function() {
		
		booking.wrraper = ('wrraper');
		booking.div = $('feedback'); // form container
		booking.closeBtn = $('feedbackClose'); // close button
		booking.deleteBtn = $('deleteRecord');  // delete button
		booking.servicesBtn = $('showServices');  // delete button
		booking.openBtn = $('openBooking');  // delete button
		booking.privilege = $('userPrivilege');
		
		// form services and its elements
		booking.services = $('frmactivities');
		booking.services._list = $('actlist');
		booking.services._customService = $('customService');
		booking.services._pax = $('pax');
		booking.services._price = $('actprice');
		
		booking.services._editpax = $('editpax');
		booking.services._editprice = $('editprice');
		
		booking.services._submit = $('submitActivity');
		booking.services._editsubmit = $('editservicesubmit');
		
		booking.services._div = $('activitiesResults');
		booking.services._editdiv = $('editservice');
		booking.services._curreditdiv = $('currentEdit');
		
		booking.services._enableList = $('enableList');
		booking.services._enableCustom = $('enableCustom');
		
		
		// form and its elements
		booking.form = $('frmbooking');
		booking.form._name = $('name');
		booking.form._rmNames = $('rmnames');
		booking.form._email = $('email');
		booking.form._nationality = $('nationality');
		booking.form._arrDate = $('arr_date');
		booking.form._depDate = $('dep_date');
		booking.form._bkSource = $('bookedthrough');
		booking.form._roomPrice = $('roomprice');
		booking.form._season = $('season');
		booking.form._discount = $('discount');
		booking.form._dob = $('dob');
		booking.form._pass = $('pass');
		booking.form._doe = $('doe');
		booking.form._boe = $('boe');
		booking.form._pov = $('pov');
		booking.form._pickup = $('pickup');
		booking.form._returnPickup = $('returnPickup');
		booking.form._notes = $('notes');
		booking.form._confirmEmail = $('notify');
		booking.form._submit = $('submit');
		
		booking.form._bookedBy = $('bookedBy');
		
		booking.shtracker = 1;
		booking.statusTracker;
		
		Core.hide(booking.openBtn);
		booking.form._bookedBy.innerHTML = '';
		
		if(booking.privilege.value != 'Administrator') {
			booking.deleteBtn.style.display = 'none';
			booking.openBtn.style.display = 'none';
			booking.form._submit.style.display = 'none';
			booking.services._submit.style.display = 'none';
			booking.services._editsubmit.style.display = 'none';
		}
		
		Core.addEventListener(booking.closeBtn, "click", booking.closeListener);
		Core.addEventListener(booking.deleteBtn, "click", function(event) {
			Alert.openListener(event, 'Are you sure you want to delete this booking from your records?', 'confirm', function() { booking.deleteBooking(); } )
		});
		Core.addEventListener(booking.servicesBtn, "click", booking.showHide);
		Core.addEventListener(booking.openBtn, "click", booking.openCloseBooking);
		Core.addEventListener(booking.services._submit, 'click', booking.addService);
		Core.addEventListener(booking.services._editsubmit, 'click', booking.editService);
		Core.addEventListener(booking.services._enableList, 'click', booking.enableDisable);
		Core.addEventListener(booking.services._enableCustom, 'click', booking.enableDisable);
		Core.addEventListener(document, "keydown", booking.handleClose);
		
		booking.enableDisable();
		
	},
	
	addBooking: function(event, roomNumber, arrDate) {
		
		booking.resetForm();
		booking.enableControls();
		
		Core.hide(booking.openBtn);

		Core.hide(booking.deleteBtn);
		Core.hide(booking.servicesBtn);
		booking.form._bookedBy.innerHTML = '';
		
		if(booking.shtracker == 2) booking.showHide(event);

		booking.roomNumber = roomNumber;
		
		booking.form._arrDate.value = arrDate;
		booking.form._submit.value = 'Add Booking';
		
		booking.getNewDimensions();
		if(booking.x != 0 || booking.y != 0 ) {
			Alert.div.style.left = booking.x + 'px';
			Alert.div.style.top = booking.y + 'px';
		} else {
			Core.center(Alert.div);
		}
		booking.div.style.left = booking.x + 121 + 'px';
		booking.div.style.top = booking.y + 'px';
		
		
		Core.show(booking.div);
		Core.addEventListener(booking.form._submit, "click", booking.add);
		
		Core.preventDefault(event);
	},
	
	editBooking: function(event, bkref) {
		
		booking.resetForm();
		
		Core.show(booking.deleteBtn);
		Core.show(booking.servicesBtn);
		
		if(booking.shtracker == 2) booking.showHide(event);
		
		booking.bookingReference = bkref;
		booking.form._submit.value = 'Edit Booking';
		
		booking.getNewDimensions();
		if(booking.x != 0 || booking.y != 0 ) {
			Alert.div.style.left = booking.x + 'px';
			Alert.div.style.top = booking.y + 'px';
		} else {
			Core.center(Alert.div);
		}
		booking.div.style.left = booking.x + 121 + 'px';
		booking.div.style.top = booking.y + 'px';
		
		booking.getServices();
		
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
						booking.deleteBtn.innerHTML = '<img src="_images/delete.png" width="20" height="20" align="top" /> Delete Booking';
						var theBooking = responseXML.getElementsByTagName('booking')[0];
						if(theBooking.getElementsByTagName('room_status')[0].firstChild.nodeValue == 'Closed') {
							booking.disableControls();
							booking.statusTracker = 'closed';
							Core.hide(booking.deleteBtn);
							Core.show(booking.openBtn);
							booking.openBtn.innerHTML = '<img src="_images/open.png" width="20" height="20" align="top" /> Open Booking';
						} else {
							booking.enableControls();
							booking.statusTracker = 'opened';
							Core.show(booking.deleteBtn);
							Core.show(booking.openBtn);
							booking.openBtn.innerHTML = '<img src="_images/open.png" width="20" height="20" align="top" /> Close Booking';
						}
						booking.form._name.value = theBooking.getElementsByTagName('customer_name')[0].firstChild.nodeValue;
						booking.form._bookedBy.innerHTML = 'Booked By: ' + theBooking.getElementsByTagName('booked_by')[0].firstChild.nodeValue;
						if(theBooking.getElementsByTagName('room_mates')[0].firstChild) booking.form._rmNames.value = theBooking.getElementsByTagName('room_mates')[0].firstChild.nodeValue;
						booking.form._email.value = theBooking.getElementsByTagName('email')[0].firstChild.nodeValue;
						if(theBooking.getElementsByTagName('nationality')[0].firstChild) for(var i = 0, ii = booking.form._nationality.options.length; i<ii; i++) {
							if(booking.form._nationality.options[i].value == theBooking.getElementsByTagName('nationality')[0].firstChild.nodeValue) {
								booking.form._nationality.selectedIndex = i;	
							}
						}
						booking.form._arrDate.value = theBooking.getElementsByTagName('arr_d')[0].firstChild.nodeValue;
						booking.form._depDate.value = theBooking.getElementsByTagName('dep_d')[0].firstChild.nodeValue;
						if(theBooking.getElementsByTagName('booked_through')[0].firstChild) for(var i = 0, ii = booking.form._bkSource.options.length; i<ii; i++) {
							if(booking.form._bkSource.options[i].value == theBooking.getElementsByTagName('booked_through')[0].firstChild.nodeValue) {
								booking.form._bkSource.selectedIndex = i;	
							}
						}
						if(theBooking.getElementsByTagName('room_price')[0].firstChild) booking.form._roomPrice.value = theBooking.getElementsByTagName('room_price')[0].firstChild.nodeValue;	
						if(theBooking.getElementsByTagName('season')[0].firstChild) for(var i = 0, ii = booking.form._season.options.length; i<ii; i++) {
							if(booking.form._season.options[i].value == theBooking.getElementsByTagName('season')[0].firstChild.nodeValue) {
								booking.form._season.selectedIndex = i;	
							}
						}
						if(theBooking.getElementsByTagName('discount')[0].firstChild) booking.form._discount.value = theBooking.getElementsByTagName('discount')[0].firstChild.nodeValue;
						if(theBooking.getElementsByTagName('dob')[0].firstChild) booking.form._dob.value = theBooking.getElementsByTagName('dob')[0].firstChild.nodeValue;
						if(theBooking.getElementsByTagName('passport')[0].firstChild) booking.form._pass.value = theBooking.getElementsByTagName('passport')[0].firstChild.nodeValue;
						if(theBooking.getElementsByTagName('doe')[0].firstChild) booking.form._doe.value = theBooking.getElementsByTagName('doe')[0].firstChild.nodeValue;
						if(theBooking.getElementsByTagName('boe')[0].firstChild) booking.form._boe.value = theBooking.getElementsByTagName('boe')[0].firstChild.nodeValue;
						if(theBooking.getElementsByTagName('pov')[0].firstChild) booking.form._pov.value = theBooking.getElementsByTagName('pov')[0].firstChild.nodeValue;
						/*if(theBooking.getElementsByTagName('services')[0].firstChild) for(var i = 0, ii = booking.form._multi.options.length; i<ii; i++) {
							if(theBooking.getElementsByTagName('services')[0].firstChild.nodeValue.indexOf(booking.form._multi.options[i].value) >= 0) {
								booking.form._multi.options[i].selected = true;	
							}
						}*/
						if(theBooking.getElementsByTagName('pickup')[0].firstChild) if(theBooking.getElementsByTagName('pickup')[0].firstChild.nodeValue == 'Yes') booking.form._pickup.checked = true;
						if(theBooking.getElementsByTagName('rpickup')[0].firstChild) if(theBooking.getElementsByTagName('rpickup')[0].firstChild.nodeValue == 'Yes') booking.form._returnPickup.checked = true;
						if(theBooking.getElementsByTagName('notes')[0].firstChild) booking.form._notes.value = theBooking.getElementsByTagName('notes')[0].firstChild.nodeValue;
						
					}else {
						booking.deleteBtn.innerHTML = '<img src="_images/delete.png" width="20" height="20" align="top" /> Delete Booking';
						Alert.openListener('', 'No Data to Show', 'alert', '');
					}
				} else {
					booking.deleteBtn.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Loading Data</span>';
				}
			}
			xhr.send('bkref=' + booking.bookingReference);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		
		Core.show(booking.div);
		Core.addEventListener(booking.form._submit, "click", booking.edit);
		
		Core.preventDefault(event);
	},
	
	add: function(event) {
		
		var room = booking.roomNumber;
		var name = booking.form._name.value;
		var rmNames = booking.form._rmNames.value;
		var email = booking.form._email.value;
		var nationality = booking.form._nationality.options[booking.form._nationality.selectedIndex].value;
		var arrDate = booking.form._arrDate.value;
		var depDate = booking.form._depDate.value;
		var bkSource = booking.form._bkSource.options[booking.form._bkSource.selectedIndex].value;
		var roomPrice = booking.form._roomPrice.value;
		var season = booking.form._season.options[booking.form._season.selectedIndex].value;
		var discount = booking.form._discount.value;
		var dob = booking.form._dob.value;
		var pass = booking.form._pass.value;
		var doe = booking.form._doe.value;
		var boe = booking.form._boe.value;
		var pov = booking.form._pov.value;
		/*var multi = '';
		for(var i =0, ii = booking.form._multi.options.length; i<ii; i++) {
			if(booking.form._multi.options[i].selected == 1) {
				multi += booking.form._multi.options[i].value + ', ';
			}
		}*/
		if(booking.form._pickup.checked == 1)var pickup = 1;
		else var pickup = 0;
		if(booking.form._returnPickup.checked == 1)var returnPickup = 1;
		else var returnPickup = 0;
		var notes = booking.form._notes.value;
		if(booking.form._confirmEmail.checked == 1)var confirmEmail = 1;
		else var confirmEmail = 0;
		
		if(!Core.compareDates(arrDate, depDate)) {
			Alert.openListener('', 'Departue date must be greater than arrival date', 'alert', '');
			return;
		}
		
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
		if(dob != '') sendString += '&dob='+dob;
		if(pass != '') sendString += '&pass='+pass;
		if(doe != '') sendString += '&doe='+doe;
		if(boe != '') sendString += '&boe='+boe;
		if(pov != '') sendString += '&pov='+pov;
		//if(multi != '') sendString += '&multi='+multi;
		if(pickup != '') sendString += '&pickup='+pickup;
		if(returnPickup != '') sendString += '&returnPickup='+returnPickup;
		if(notes != '') sendString += '&notes='+notes;
		if(confirmEmail != '') sendString += '&confirmEmail='+confirmEmail;
		
		
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
							Core.hide(booking.deleteBtn);
							booking.deleteBtn.innerHTML = '<img src="_images/delete.png" width="20" height="20" align="top" /> Delete Booking';
							booking.closeListener();
							getMBooking.clickListener();
						} else {
							Core.hide(booking.deleteBtn);
							booking.deleteBtn.innerHTML = '<img src="_images/delete.png" width="20" height="20" align="top" /> Delete Booking';
							Alert.openListener('', responseText, 'alert', '');
						}
					}
				} else {
					Core.show(booking.deleteBtn);
					booking.deleteBtn.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Adding Booking</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		
		Core.preventDefault(event);
	},
	
	edit: function(event) {
		
		var bkref = booking.bookingReference;
		var name = booking.form._name.value;
		var rmNames = booking.form._rmNames.value;
		var email = booking.form._email.value;
		var nationality = booking.form._nationality.options[booking.form._nationality.selectedIndex].value;
		var arrDate = booking.form._arrDate.value;
		var depDate = booking.form._depDate.value;
		var bkSource = booking.form._bkSource.options[booking.form._bkSource.selectedIndex].value;
		var roomPrice = booking.form._roomPrice.value;
		var season = booking.form._season.options[booking.form._season.selectedIndex].value;
		var discount = booking.form._discount.value;
		var dob = booking.form._dob.value;
		var pass = booking.form._pass.value;
		var doe = booking.form._doe.value;
		var boe = booking.form._boe.value;
		var pov = booking.form._pov.value;
		/*var multi = '';
		for(var i =0, ii = booking.form._multi.options.length; i<ii; i++) {
			if(booking.form._multi.options[i].selected == 1) {
				multi += booking.form._multi.options[i].value + ', ';
			}
		}*/
		if(booking.form._pickup.checked == 1)var pickup = 1;
		else var pickup = 0;
		if(booking.form._returnPickup.checked == 1)var returnPickup = 1;
		else var returnPickup = 0;
		var notes = booking.form._notes.value;
		if(booking.form._confirmEmail.checked == 1)var confirmEmail = 1;
		else var confirmEmail = 0;
		
		if(!Core.compareDates(arrDate, depDate)) {
			Alert.openListener('', 'Departue date must be greater than arrival date', 'alert', '');
			return;
		}
		
		var sendString;
		if(bkref != '') sendString = 'bkref='+bkref;
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
		if(dob != '') sendString += '&dob='+dob;
		if(pass != '') sendString += '&pass='+pass;
		if(doe != '') sendString += '&doe='+doe;
		if(boe != '') sendString += '&boe='+boe;
		if(pov != '') sendString += '&pov='+pov;
		//if(multi != '') sendString += '&multi='+multi;
		if(pickup != '') sendString += '&pickup='+pickup;
		if(returnPickup != '') sendString += '&returnPickup='+returnPickup;
		if(notes != '') sendString += '&notes='+notes;
		if(confirmEmail != '') sendString += '&confirmEmail='+confirmEmail;		
		
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
							Core.hide(booking.deleteBtn);
							booking.deleteBtn.innerHTML = '<img src="_images/delete.png" width="20" height="20" align="top" /> Delete Booking';
							booking.closeListener();
							getMBooking.clickListener();
						} else {
							Alert.openListener('', responseText, 'alert', '');
							booking.deleteBtn.innerHTML = '<img src="_images/delete.png" width="20" height="20" align="top" /> Delete Booking';
						}
					}
				} else {
					Core.show(booking.deleteBtn);
					booking.deleteBtn.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Updating Booking</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		
		Core.preventDefault(event);
	},
	
	deleteBooking: function() {
			
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
				var filename = "_ajax/delete_booking.php";
				xhr.open("POST", filename, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseText = xhr.responseText;
						if(responseText && responseText == 'deleted') {
							booking.closeListener();
							booking.deleteBtn.innerHTML = '<img src="_images/delete.png" width="20" height="20" align="top" /> Delete Booking';
							getMBooking.clickListener();
						}
					} else {
						booking.deleteBtn.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Deleting Booking</span>';
					}
				}
				xhr.send("bkref=" + booking.bookingReference);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
	},
	
	addService: function() {
		
		var bkref = booking.bookingReference;
		if(booking.services._enableList.checked == 1) {
			if(booking.services._list.selectedIndex == -1) {
				Alert.openListener('', 'please Select an activity from the list', 'alert', '');
				return;
			}
			var service = booking.services._list.options[booking.services._list.selectedIndex].value;
		} else {
			if(booking.services._customService.value == '') {
				Alert.openListener('', 'please type an activity in the activity field', 'alert', '');
				return;
			}
			var service = booking.services._customService.value;
		}
		
		var pax = booking.services._pax.value;
		var price = booking.services._price.value;
		
		if(pax == '') {
			Alert.openListener('', 'please check pax field', 'alert', '');
			return;
		}
		
		if(booking.services._enableCustom.checked == 1) {
			if(booking.services._enableCustom.value == '') {
				Alert.openListener('', 'please enter the service / activity description', 'alert', '');
				return;
			} else if (price == '') {
				Alert.openListener('', 'please enter the price of the service / activity', 'alert', '');
				return;
			}
		}
		
		
		var sendString;
		if(bkref != '') sendString = 'bkref='+bkref;
		if(service != '') sendString += '&service='+service;
		if(pax != '') sendString += '&pax='+pax;
		if(price != '') sendString += '&price='+price;
		
		
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
			var filename = "_ajax/activities.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							booking.getServices();
						}
					}
				} else {
					booking.services._div.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Adding Service</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	openeditService: function(event, id, pax, price, curr) {
		
		Core.show(booking.services._editdiv);
		
		booking.services._id = id;
		booking.services._editpax.value = pax;
		booking.services._editprice.value = price;
		booking.services._curreditdiv.innerHTML = '<p class="red">Currently Editing: ' + curr + '</p><br />';

		Core.preventDefault(event);
	},
	
	editService: function() {
		
		Core.hide(booking.services._editdiv);
		
		var pax = booking.services._editpax.value;
		var price = booking.services._editprice.value;
		
		if(pax == '') {
			Alert.openListener('', 'please check pax field', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'id='+booking.services._id;
		if(pax != '') sendString += '&pax='+pax;
		if(price != '') sendString += '&price='+price;
		
		
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
			var filename = "_ajax/activities.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							booking.getServices();
						}
					}
				} else {
					booking.services._div.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Service</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	confirmDelService: function(event, id) {
		Alert.openListener(event, "Are you sure you want to delete this services?", 'confirm', function() {
			booking.delService(id);
		});
		Core.preventDefault(event);
	},
	
	delService: function(id) {
		
		Core.hide(booking.services._editdiv);
	
		var sendString;
		sendString = 'id='+id;
		
		
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
				var filename = "_ajax/del_activity.php";
				xhr.open("POST", filename, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseText = xhr.responseText;
						if(responseText == 'done') {
							Alert.openListener('', 'Service Deleted Successfully', 'alert', '');
							booking.getServices();
						}
					} else {
						booking.services._div.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Deleting Service</span>';
					}
				}
				xhr.send(sendString);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
	},
	
	getServices: function() {
		
		var bkref = booking.bookingReference;		
		var sendString;
		if(bkref != '') sendString = 'bkref='+bkref;
		
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
						booking.services._div.innerHTML = responseText;
					}
				} else {
					booking.services._div.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Services List</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	openCloseBooking: function(event) {
		
			var sendString, roomStatus, text, loading;
			if(booking.statusTracker == 'closed') {
				roomStatus = 'open';
				text = '<img src="_images/open.png" width="20" height="20" align="top" /> Close Booking'
				loading = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Opening Booking</span>';
			} else {
				roomStatus = 'close';
				text = '<img src="_images/open.png" width="20" height="20" align="top" /> Open Booking';
				loading = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Closing Booking</span>';
			}
			sendString = 'bkref='+booking.bookingReference+'&status=' + roomStatus + '&control=control';
			
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
								booking.openBtn.innerHTML = text;
								if(booking.statusTracker == 'closed') {
									booking.statusTracker = 'opened';
									booking.enableControls();
									booking.closeListener();
									getMBooking.clickListener();
								} else {
									booking.statusTracker = 'closed';
									booking.disableControls();
									booking.closeListener();
									getMBooking.clickListener();
								}
							} else {
								booking.openBtn.innerHTML = '<img src="_images/open.png" width="20" height="20" align="top" /> Close Booking';
								Alert.openListener('', responseText, 'alert', '');
							}
						}
					} else {
						booking.openBtn.innerHTML = loading;
					}
				}
				xhr.send(sendString);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
		Core.preventDefault(event);
	},
	
	closeListener: function(event) {
		booking.resetForm();
		Core.hide(booking.div);
		Core.hide(booking.deleteBtn);
		Core.hide(booking.servicesBtn);
		Core.hide(booking.services);
		Core.hide(booking.services._editdiv);
		Core.hide(booking.openBtn);
		booking.form._bookedBy.innerHTML = '';
		Alert.closeListener(event);
		Alert.closeListenerConfirm(event);
		Core.removeEventListener(booking.form._submit, "click", booking.add);
		Core.removeEventListener(booking.form._submit, "click", booking.edit);
		if(event) {
			Core.preventDefault(event);
		}
	},
	
	handleClose: function(event) {
		var key = event.which || event.keyCode
		if(key == 27) {
			booking.closeListener(event);
			context.hide();
		}
	},
	
	showHide: function(event) {
		if(booking.shtracker == 1) {
			booking.form.style.display = 'none';
			Core.show(booking.services);
			booking.servicesBtn.innerHTML = '<img src="_images/booking.gif" width="20" height="20" align="top" /> Show Booking';
			booking.shtracker = 2;
		} else {
			booking.form.style.display = '';
			Core.hide(booking.services);
			booking.servicesBtn.innerHTML = '<img src="_images/services.gif" width="20" height="20" align="top" /> Show Services';
			booking.shtracker = 1;
		}
		Core.preventDefault(event);
	},
	
	enableDisable: function() {
		if(booking.services._enableList.checked == 1) {
			booking.services._list.disabled = '';
			booking.services._customService.disabled = 'disabled';
		} else if (booking.services._enableCustom.checked == 1) {
			booking.services._list.disabled = 'disabled';
			booking.services._customService.disabled = '';
		}
	},
	
	getNewDimensions: function() {
		booking.x = window.scrollX;
		booking.y = window.scrollY;
		
		if (document.all) {
			booking.x = document.documentElement.scrollLeft || 0;
			booking.y = document.documentElement.scrollTop || 0;
		}
	},
	
	resetForm: function() {
		
		booking.roomNumber = null;
		booking.bookingReference = null;
		booking.statusTracker = null;
		booking.form._name.value = '';
		booking.form._rmNames.value = '';
		booking.form._email.value = '';
		booking.form._nationality.selectedIndex = 0;
		booking.form._arrDate.value = '';
		booking.form._depDate.value = '';
		booking.form._bkSource.selectedIndex = 0;
		booking.form._roomPrice.value = '';
		booking.form._season.selectedIndex = 0;
		booking.form._discount.value = '';
		booking.form._dob.value = '';
		booking.form._pass.value = '';
		booking.form._doe.value = '';
		booking.form._boe.value = '';
		booking.form._pov.value = '';
		//booking.form._multi.selectedIndex = -1;
		booking.form._pickup.checked = false;
		booking.form._returnPickup.checked = false;
		booking.form._confirmEmail.checked = false;
		booking.form._notes.value = '';
		booking.services._id = null;
		booking.services._list.selectedIndex = -1;
		booking.services._pax.value = '';
		booking.services._price.value = '';
		booking.services._editprice.value = '';
	},
	
	disableControls: function() {
		booking.form._name.disabled = 'disabled';
		booking.form._rmNames.disabled = 'disabled';
		booking.form._email.disabled = 'disabled';
		booking.form._nationality.disabled = 'disabled';
		booking.form._arrDate.disabled = 'disabled';
		booking.form._depDate.disabled = 'disabled';
		booking.form._bkSource.disabled = 'disabled';
		booking.form._roomPrice.disabled = 'disabled';
		booking.form._season.disabled = 'disabled';
		booking.form._discount.disabled = 'disabled';
		booking.form._dob.disabled = 'disabled';
		booking.form._pass.disabled = 'disabled';
		booking.form._doe.disabled = 'disabled';
		booking.form._boe.disabled = 'disabled';
		booking.form._pov.disabled = 'disabled';
		booking.form._pickup.disabled = 'disabled';
		booking.form._returnPickup.disabled = 'disabled';
		booking.form._confirmEmail.disabled = 'disabled';
		booking.form._notes.disabled = 'disabled';
		booking.form._submit.disabled = 'disabled';
		
		booking.services._list.disabled = 'disabled';
		booking.services._customService.disabled = 'disabled';
		booking.services._pax.disabled = 'disabled';
		booking.services._price.disabled = 'disabled';
		booking.services._editpax.disabled = 'disabled';
		booking.services._editprice.disabled = 'disabled';
		booking.services._submit.disabled = 'disabled';
		booking.services._editsubmit.disabled = 'disabled';
		booking.services._enableList.disabled = 'disabled';
		booking.services._enableCustom.disabled = 'disabled';
	},
	
	enableControls: function() {
		booking.form._name.disabled = '';
		booking.form._rmNames.disabled = '';
		booking.form._email.disabled = '';
		booking.form._nationality.disabled = '';
		booking.form._arrDate.disabled = '';
		booking.form._depDate.disabled = '';
		booking.form._bkSource.disabled = '';
		booking.form._roomPrice.disabled = '';
		booking.form._season.disabled = '';
		booking.form._discount.disabled = '';
		booking.form._dob.disabled = '';
		booking.form._pass.disabled = '';
		booking.form._doe.disabled = '';
		booking.form._boe.disabled = '';
		booking.form._pov.disabled = '';
		booking.form._pickup.disabled = '';
		booking.form._returnPickup.disabled = '';
		booking.form._confirmEmail.disabled = '';
		booking.form._notes.disabled = '';
		booking.form._submit.disabled = '';
		
		booking.services._list.disabled = '';
		booking.services._customService.disabled = '';
		booking.services._pax.disabled = '';
		booking.services._price.disabled = '';
		booking.services._editpax.disabled = '';
		booking.services._editprice.disabled = '';
		booking.services._submit.disabled = '';
		booking.services._editsubmit.disabled = '';
		booking.services._enableList.disabled = '';
		booking.services._enableCustom.disabled = '';
	}
};

Core.start(booking);