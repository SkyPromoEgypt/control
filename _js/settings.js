// JavaScript Document

var settings = {
	
	init: function() {
		
		// Containers
		settings._divRoomList = $('roomList');
		settings._divTypeList = $('typelist');
		settings._divCatList = $('catlist');
		settings._divActList = $('actlist');
		settings._divUserList = $('userlist');
		
		// add/edit/delete room inputs
		settings._roomNumber = $('roomNO');
		settings._roomType = $('roomtypes');
		settings._roomCat = $('roomcats');
		settings._roomNPrice = $('normalprice');
		settings._roomLPrice = $('localprice');
		settings._roomHPrice = $('highprice');
		settings._roomAdd = $('addroom');
		settings._roomDel = $('delroom');
		settings._roomReset = $('resetroom');
		settings._roomLoading = $('loadingRoomResults');
		settings._roomTypeLoading = $('typeLoading');
		settings._roomCatLoading = $('catLoading');
		
		// add/edit/delete roomtypes inputs
		settings._typeName = $('typename');
		settings._typeAdd = $('addtype');
		settings._typeDel = $('deltype');
		settings._typeReset = $('resettype');
		settings._typeLoading = $('loadingTypeResults');
		
		// add/edit/delete roomcats inputs
		settings._catName = $('catname');
		settings._catAdd = $('addcat');
		settings._catDel = $('delcat');
		settings._catReset = $('resetcat');
		settings._catLoading = $('loadingCatResults');
		
		// add/edit/delete activities inputs
		settings._actName = $('actname');
		settings._actPrice = $('actprice');
		settings._actAdd = $('addact');
		settings._actDel = $('delact');
		settings._actReset = $('resetact');
		settings._actLoading = $('loadingActResults');
		
		// add/edit/delete users inputs
		settings._userName = $('username');
		settings._userPass = $('userpass');
		settings._userfName = $('firstname');
		settings._userlName = $('lastname');
		settings._userDob = $('birthday');
		settings._userAddress = $('address');
		settings._userPhone = $('phone');
		settings._userJob = $('job');
		settings._userSallary = $('sallary');
		settings._userPrivilege = $('privilege');
		settings._userAdd = $('adduser');
		settings._userDel = $('deluser');
		settings._userReset = $('resetuser');
		settings._userChkLoading = $('checkUserAvailable');
		settings._userLoading = $('loadingUserResults');
		
		// Show / Hide settings
		Core.hide(settings._roomDel);
		Core.hide(settings._typeDel);
		Core.hide(settings._catDel);
		Core.hide(settings._actDel);
		
		// Event Listeners
		Core.addEventListener(settings._roomAdd, 'click', settings.addRoom);
		Core.addEventListener(settings._roomDel, 'click', settings.deleteRoom);
		Core.addEventListener(settings._roomReset, 'click', settings.resetRooms);
		
		Core.addEventListener(settings._typeAdd, 'click', settings.addType);
		Core.addEventListener(settings._typeDel, 'click', settings.deleteType);
		Core.addEventListener(settings._typeReset, 'click', settings.resetType);
		
		Core.addEventListener(settings._catAdd, 'click', settings.addCat);
		Core.addEventListener(settings._catDel, 'click', settings.deleteCat);
		Core.addEventListener(settings._catReset, 'click', settings.resetCat);
		
		Core.addEventListener(settings._actAdd, 'click', settings.addAct);
		Core.addEventListener(settings._actDel, 'click', settings.deleteAct);
		Core.addEventListener(settings._actReset, 'click', settings.resetAct);
		
		Core.addEventListener(settings._userName, 'blur', settings.chkUser);
		Core.addEventListener(settings._userAdd, 'click', settings.addUser);
		Core.addEventListener(settings._userDel, 'click', settings.deleteUser);
		Core.addEventListener(settings._userReset, 'click', settings.resetUser);
		
		// Initialize settings
		settings.getTypeList();
		settings.getCatList();
		settings.getRooms();
		settings.getTypes();
		settings.getCats();
		settings.getActs();
		settings.getUsers();
		settings.resetRooms();
	},
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ============================================= Building Lists ============================================//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	getTypeList: function() {
			
		var sendString;
		sendString = 'types=types';
		
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
			var filename = "_ajax/get_lists.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseXML = xhr.responseXML;
					if(responseXML) {
						settings._roomTypeLoading.innerHTML = '';
						settings._roomType.options.length = 0;
						var listItems = responseXML.getElementsByTagName('type');
						for(var i=0, ii=listItems.length; i<ii; i++) {
							var text = listItems[i].getElementsByTagName('room_type')[0].firstChild.nodeValue;
							var value = listItems[i].getElementsByTagName('room_type')[0].firstChild.nodeValue;
							settings._roomType.options[i] = new Option(text, value, false, false);
						}
						settings.resetRooms();
					} else {
						settings._roomTypeLoading.innerHTML = '';
						settings._roomType.options[0] = new Option('Empty', 'Empty', false, false);
						settings.resetRooms();
					}
				} else {
					settings._roomTypeLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Room Types</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	getCatList: function() {
			
		var sendString;
		sendString = 'cats=cats';
		
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
			var filename = "_ajax/get_lists.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseXML = xhr.responseXML;
					if(responseXML) {
						settings._roomCatLoading.innerHTML = '';
						settings._roomCat.options.length = 0;
						var listItems = responseXML.getElementsByTagName('cat');
						for(var i=0, ii=listItems.length; i<ii; i++) {
							var text = listItems[i].getElementsByTagName('room_cat')[0].firstChild.nodeValue;
							var value = listItems[i].getElementsByTagName('room_cat')[0].firstChild.nodeValue;
							settings._roomCat.options[i] = new Option(text, value, false, false);
						}
						settings.resetRooms();
					} else {
						settings._roomCatLoading.innerHTML = '';
						settings._roomCat.options[0] = new Option('Empty', 'Empty', false, false);
						settings.resetRooms();
					}
				} else {
					settings._roomCatLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Room Categories</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ============================================= Rooms Methods =============================================//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	getRooms: function() {
			
		var sendString;
		sendString = 'rooms=rooms';
		
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
			var filename = "_ajax/get_rooms.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						settings._divRoomList.innerHTML = responseText;
					} else {
						settings._divRoomList.innerHTML = '<p>Sorry. You Currently have to rooms available in your DB records.</p>';
					}
				} else {
					settings._divRoomList.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Rooms List</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	getRoom: function(event, id) {
		
		var sendString;
		sendString = 'roomNumber=' + id;
		
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
			var filename = "_ajax/get_room.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseXML = xhr.responseXML;
					if(responseXML) {
						settings._roomLoading.innerHTML = '';
						settings._roomAdd.value = 'Edit Room';
						var theRoom = responseXML.getElementsByTagName('room')[0];
						settings._roomNumber.value = theRoom.getElementsByTagName('room_number')[0].firstChild.nodeValue;
						settings._roomType.value = theRoom.getElementsByTagName('room_type')[0].firstChild.nodeValue;
						settings._roomCat.value = theRoom.getElementsByTagName('room_cat')[0].firstChild.nodeValue;
						settings._roomNPrice.value = theRoom.getElementsByTagName('room_price')[0].firstChild.nodeValue;
						settings._roomLPrice.value = theRoom.getElementsByTagName('local_price')[0].firstChild.nodeValue;
						settings._roomHPrice.value = theRoom.getElementsByTagName('high_price')[0].firstChild.nodeValue;
						Core.show(settings._roomDel);
						Core.removeEventListener(settings._roomAdd, 'click', settings.addRoom);
						Core.addEventListener(settings._roomAdd, 'click', settings.editRoom);
					}
				} else {
					settings._roomLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Rooms Data</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		Core.preventDefault(event);
	},
	
	addRoom: function() {
		
		var roomNumber, roomType, roomCat, nPrice, lPrice, hPrice;
		roomNumber = settings._roomNumber.value;
		roomType = settings._roomType.value;
		roomCat = settings._roomCat.value;
		nPrice = settings._roomNPrice.value;
		lPrice = settings._roomLPrice.value;
		hPrice = settings._roomHPrice.value;
		
		if( roomNumber == '' || roomType == '' || roomCat == '' || nPrice == '' || lPrice == '' || hPrice == '') {
			Alert.openListener('', 'Check the missing field', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'roomNumber=' + roomNumber + '&roomType=' + roomType + '&roomCat=' + roomCat + '&nPrice=' + nPrice + '&lPrice=' + lPrice + '&hPrice=' + hPrice + '&create=create';
		
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
			var filename = "_ajax/rooms.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._roomLoading.innerHTML = '';
							settings.resetRooms();
							settings.getRooms();
							Alert.openListener('', 'Room added successfully', 'alert', '');
						} else {
							settings._roomLoading.innerHTML = '';
							Alert.openListener('', 'Error adding room. Please check your room details and try again.', 'alert', '');
						}
					}
				} else {
					settings._roomLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Adding a room</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	editRoom: function() {
		
		var roomNumber, roomType, roomCat, nPrice, lPrice, hPrice;
		roomNumber = settings._roomNumber.value;
		roomType = settings._roomType.value;
		roomCat = settings._roomCat.value;
		nPrice = settings._roomNPrice.value;
		lPrice = settings._roomLPrice.value;
		hPrice = settings._roomHPrice.value;
		
		if( roomNumber == '' || roomType == '' || roomCat == '' || nPrice == '' || lPrice == '' || hPrice == '') {
			Alert.openListener('', 'Check the missing field', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'roomNumber=' + roomNumber + '&roomType=' + roomType + '&roomCat=' + roomCat + '&nPrice=' + nPrice + '&lPrice=' + lPrice + '&hPrice=' + hPrice + '&update=update';
		
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
			var filename = "_ajax/rooms.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._roomLoading.innerHTML = '';
							settings.resetRooms();
							settings.getRooms();
							Alert.openListener('', 'Room updated successfully', 'alert', '');
						} else {
							settings._roomLoading.innerHTML = '';
							Alert.openListener('', 'Error adding room. Please check your room details and try again.', 'alert', '');
						}
					}
				} else {
					settings._roomLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating the room</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	deleteRoom: function() {
		
			var roomNumber;
			roomNumber = settings._roomNumber.value;
			
			if( roomNumber == '') {
				Alert.openListener('', 'Please select a room to delete', 'alert', '');
				return;
			}
			
		Alert.openListener('', 'Are you sure you want to delete this room?', 'confirm', function() {
			
			var sendString;
			sendString = 'roomNumber=' + roomNumber;
			
			Alert.openListener('', 'Are you sure you want to delete room bookings too?', 'confirm', function() {
				sendString = 'roomNumber=' + roomNumber + '&record=delete';
			});
			
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
				var filename = "_ajax/rooms.php";
				xhr.open("POST", filename, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseText = xhr.responseText;
						if(responseText) {
							if(responseText == 'done') {
								settings._roomLoading.innerHTML = '';
								settings.resetRooms();
								settings.getRooms();
								Alert.openListener('', 'Room deleted successfully', 'alert', '');
							}
						}
					} else {
						settings._roomLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Deleting room</span>';
					}
				}
				xhr.send(sendString);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
		});
		
	},
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ============================================= Types Methods =============================================//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	getTypes: function() {
			
		var sendString;
		sendString = 'types=types';
		
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
			var filename = "_ajax/get_types.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						settings._divTypeList.innerHTML = responseText;
					} else {
						settings._divTypeList.innerHTML = '<p>Sorry. You Currently have to room types available in your DB records.</p>';
					}
				} else {
					settings._divTypeList.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Types List</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	getType: function(event, id) {
		
		var sendString;
		sendString = 'id=' + id;
		settings._typeId = id;
		
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
			var filename = "_ajax/get_type.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseXML = xhr.responseXML;
					if(responseXML) {
						settings._typeLoading.innerHTML = '';
						settings._typeAdd.value = 'Edit Type';
						var theType = responseXML.getElementsByTagName('type')[0];
						settings._typeName.value = theType.getElementsByTagName('room_type')[0].firstChild.nodeValue;
						Core.show(settings._typeDel);
						Core.removeEventListener(settings._typeAdd, 'click', settings.addType);
						Core.addEventListener(settings._typeAdd, 'click', settings.editType);
					}
				} else {
					settings._typeLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Type Data</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		Core.preventDefault(event);
	},
	
	addType: function() {
		
		var typeName;
		typeName = settings._typeName.value;
		
		if( typeName == '') {
			Alert.openListener('', 'Please enter a room type', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'id=id&typeName=' + typeName + '&create=create';
		
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
			var filename = "_ajax/types.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._typeLoading.innerHTML = '';
							settings.resetType();
							settings.getTypes();
							settings.getTypeList();
							Alert.openListener('', 'Type added successfully', 'alert', '');
						} else {
							settings._typeLoading.innerHTML = '';
							Alert.openListener('', 'Error adding Type. Please check your type name and try again.', 'alert', '');
						}
					}
				} else {
					settings._typeLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Adding a type</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	editType: function() {
		
		var typeName;
		typeName = settings._typeName.value;
		
		if( typeName == '') {
			Alert.openListener('', 'Please enter a room type', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'id=' + settings._typeId + '&typeName=' + typeName + '&update=update';
		
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
			var filename = "_ajax/types.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._typeLoading.innerHTML = '';
							settings.resetType();
							settings.getTypes();
							settings.getTypeList();
							Alert.openListener('', 'Type updated successfully', 'alert', '');
						} else {
							settings._typeLoading.innerHTML = '';
							Alert.openListener('', 'Error updating type. Please check your type name and try again.', 'alert', '');
						}
					}
				} else {
					settings._typeLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating the type</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	deleteType: function() {
			
		Alert.openListener('', 'Are you sure you want to delete this room type?', 'confirm', function() {
			var sendString;
			sendString = 'id=' + settings._typeId;
		
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
				var filename = "_ajax/types.php";
				xhr.open("POST", filename, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseText = xhr.responseText;
						if(responseText) {
							if(responseText == 'done') {
								settings._typeLoading.innerHTML = '';
								settings.resetType();
								settings.getTypes();
								settings.getTypeList();
								Alert.openListener('', 'Type deleted successfully', 'alert', '');
							}
						}
					} else {
						settings._typeLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Deleting type</span>';
					}
				}
				xhr.send(sendString);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
		});
	},
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ============================================== Cats Methods =============================================//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	getCats: function() {
			
		var sendString;
		sendString = 'cats=cats';
		
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
			var filename = "_ajax/get_cats.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						settings._divCatList.innerHTML = responseText;
					} else {
						settings._divCatList.innerHTML = '<p>Sorry. You currently have to room categories in you DB Records.</p>';
					}
				} else {
					settings._divCatList.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Categories List</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	getCat: function(event, id) {
		
		var sendString;
		sendString = 'id=' + id;
		settings._catId = id;
		
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
			var filename = "_ajax/get_cat.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseXML = xhr.responseXML;
					if(responseXML) {
						settings._catLoading.innerHTML = '';
						settings._catAdd.value = 'Edit Category';
						var theCat = responseXML.getElementsByTagName('cat')[0];
						settings._catName.value = theCat.getElementsByTagName('room_cat')[0].firstChild.nodeValue;
						Core.show(settings._catDel);
						Core.removeEventListener(settings._catAdd, 'click', settings.addCat);
						Core.addEventListener(settings._catAdd, 'click', settings.editCat);
					}
				} else {
					settings._catLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Category Data</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		Core.preventDefault(event);
	},
	
	addCat: function() {
		
		var catName;
		catName = settings._catName.value;
		
		if( catName == '') {
			Alert.openListener('', 'Please enter a room category', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'id=id&catName=' + catName + '&create=create';
		
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
			var filename = "_ajax/cats.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._catLoading.innerHTML = '';
							settings.resetCat();
							settings.getCats();
							settings.getCatList();
							Alert.openListener('', 'Category added successfully', 'alert', '');
						} else {
							settings._catLoading.innerHTML = '';
							Alert.openListener('', 'Error adding Category. Please check your category name and try again.', 'alert', '');
						}
					}
				} else {
					settings._catLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Adding a category</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	editCat: function() {
		
		var catName;
		catName = settings._catName.value;
		
		if( catName == '') {
			Alert.openListener('', 'Please enter a room category', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'id=' + settings._catId + '&catName=' + catName + '&update=update';
		
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
			var filename = "_ajax/cats.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._catLoading.innerHTML = '';
							settings.resetCat();
							settings.getCats();
							settings.getCatList();
							Alert.openListener('', 'Category updated successfully', 'alert', '');
						} else {
							settings._catLoading.innerHTML = '';
							Alert.openListener('', 'Error updating category. Please check your category name and try again.', 'alert', '');
						}
					}
				} else {
					settings._catLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating the category</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	deleteCat: function() {
		
		Alert.openListener('', 'Are you sure you want to delete this room category?', 'confirm', function() {
			
			var sendString;
			sendString = 'id=' + settings._catId;
		
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
				var filename = "_ajax/cats.php";
				xhr.open("POST", filename, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseText = xhr.responseText;
						if(responseText) {
							if(responseText == 'done') {
								settings._catLoading.innerHTML = '';
								settings.resetCat();
								settings.getCats();
								settings.getCatList();
								Alert.openListener('', 'Category deleted successfully', 'alert', '');
							}
						}
					} else {
						settings._catLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Deleting category</span>';
					}
				}
				xhr.send(sendString);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
		});
		
	},
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ============================================== Activities Methods =======================================//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	getActs: function() {
			
		var sendString;
		sendString = 'acts=acts';
		
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
			var filename = "_ajax/get_acts.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						settings._divActList.innerHTML = responseText;
					} else {
						settings._divActList.innerHTML = '<p>Sorry no Activities/Services are available.</p>';
					}
				} else {
					settings._divActList.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Activities List</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	getAct: function(event, id) {
		
		window.scrollTo(0,700);
		var sendString;
		sendString = 'id=' + id;
		settings._actId = id;
		
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
			var filename = "_ajax/get_act.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseXML = xhr.responseXML;
					if(responseXML) {
						settings._actLoading.innerHTML = '';
						settings._actAdd.value = 'Edit';
						var theAct = responseXML.getElementsByTagName('act')[0];
						settings._actName.value = theAct.getElementsByTagName('activity')[0].firstChild.nodeValue;
						settings._actPrice.value = theAct.getElementsByTagName('price')[0].firstChild.nodeValue;
						Core.show(settings._actDel);
						Core.removeEventListener(settings._actAdd, 'click', settings.addAct);
						Core.addEventListener(settings._actAdd, 'click', settings.editAct);
					}
				} else {
					settings._actLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Activity Data</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		Core.preventDefault(event);
	},
	
	addAct: function() {
		
		var actName, actPrice;
		actName = settings._actName.value;
		actPrice = settings._actPrice.value;
		
		if( actName == '' || actPrice == '' ) {
			Alert.openListener('', 'Please fill empty fields.', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'id=id&actName=' + actName + '&actPrice=' + actPrice + '&create=create';
		
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
			var filename = "_ajax/acts.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._actLoading.innerHTML = '';
							settings.resetAct();
							settings.getActs();
							Alert.openListener('', 'Activity added successfully', 'alert', '');
						} else {
							settings._actLoading.innerHTML = '';
							Alert.openListener('', 'Error adding activity. Please check your activity details and try again.', 'alert', '');
						}
					}
				} else {
					settings._actLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Adding activity</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	editAct: function() {
		
		var actName, actPrice;
		actName = settings._actName.value;
		actPrice = settings._actPrice.value;
		
		if( actName == '' || actPrice == '' ) {
			Alert.openListener('', 'Please fill empty fields.', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'id=' + settings._actId + '&actName=' + actName + '&actPrice=' + actPrice + '&update=update';
		
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
			var filename = "_ajax/acts.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._actLoading.innerHTML = '';
							settings.resetAct();
							settings.getActs();
							Alert.openListener('', 'Activity updated successfully', 'alert', '');
						} else {
							settings._actLoading.innerHTML = '';
							Alert.openListener('', 'Error updating activity. Please check your activity details and try again.', 'alert', '');
						}
					}
				} else {
					settings._actLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating the activity</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	deleteAct: function() {
		
		Alert.openListener('', 'Are you sure you want to delete this Activity?', 'confirm', function() {
			
			var sendString;
			sendString = 'id=' + settings._actId;
		
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
				var filename = "_ajax/acts.php";
				xhr.open("POST", filename, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseText = xhr.responseText;
						if(responseText) {
							if(responseText == 'done') {
								settings._actLoading.innerHTML = '';
								settings.resetAct();
								settings.getActs();
								Alert.openListener('', 'Activity deleted successfully', 'alert', '');
							}
						}
					} else {
						settings._actLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Deleting Activity</span>';
					}
				}
				xhr.send(sendString);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
		});
		
	},
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ============================================== Users Methods =======================================//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	chkUser: function() {
		
		var userName = settings._userName.value;
		
		if(userName == '') {
			Alert.openListener('', 'please type the username', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'user=' + userName;
		
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
			var filename = "_ajax/check_user.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._userChkLoading.innerHTML = '<img src="_images/no.png" width="20" height="20" align="top" />';
						} 
					} else {
						settings._userChkLoading.innerHTML = '<img src="_images/yes.png" width="20" height="20" align="top" />';
					}
				} else {
					settings._userChkLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Checking User Availability</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	getUsers: function() {
			
		var sendString;
		sendString = 'users=users';
		
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
			var filename = "_ajax/get_users.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						settings._divUserList.innerHTML = responseText;
					} else {
						settings._divUserList.innerHTML = '<p>Sorry no Users are available.</p>';
					}
				} else {
					settings._divUserList.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating Users List</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	getUser: function(event, id) {
		
		settings.resetUser();
		
		var sendString;
		sendString = 'id=' + id;
		settings._userId = id;
		
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
			var filename = "_ajax/get_user.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseXML = xhr.responseXML;
					if(responseXML) {
						settings._userLoading.innerHTML = '';
						settings._userAdd.value = 'Edit';
						var theUser = responseXML.getElementsByTagName('user')[0];
						settings._userName.value = theUser.getElementsByTagName('username')[0].firstChild.nodeValue;
						settings._userName.disabled = 'disabled';
						settings._userPass.value = theUser.getElementsByTagName('password')[0].firstChild.nodeValue;
						settings._userfName.value = theUser.getElementsByTagName('first_name')[0].firstChild.nodeValue;
						settings._userlName.value = theUser.getElementsByTagName('last_name')[0].firstChild.nodeValue;
						settings._userDob.value = theUser.getElementsByTagName('birthdate')[0].firstChild.nodeValue;
						settings._userAddress.value = theUser.getElementsByTagName('address')[0].firstChild.nodeValue;
						settings._userPhone.value = theUser.getElementsByTagName('phone')[0].firstChild.nodeValue;
						settings._userJob.value = theUser.getElementsByTagName('job')[0].firstChild.nodeValue;
						settings._userSallary.value = theUser.getElementsByTagName('salary')[0].firstChild.nodeValue;
						for(var i = 0, ii = settings._userPrivilege.options.length; i<ii; i++) {
							if(settings._userPrivilege.options[i].value == theUser.getElementsByTagName('privillage')[0].firstChild.nodeValue) {
								settings._userPrivilege.selectedIndex = i;
							}
						}
						Core.show(settings._userDel);
						Core.removeEventListener(settings._userAdd, 'click', settings.addUser);
						Core.addEventListener(settings._userAdd, 'click', settings.editUser);
					}
				} else {
					settings._userLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading User Data</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
		Core.preventDefault(event);
	},
	
	addUser: function() {
		
		var userName, userPass, userfName, userlName, userDob, userAddress, userPhone, userJob, userSallary, userPrivilege;
		
		userName = settings._userName.value;
		userPass = settings._userPass.value;
		userfName = settings._userfName.value;
		userlName = settings._userlName.value;
		userDob = settings._userDob.value;
		userAddress = settings._userAddress.value;
		userPhone = settings._userPhone.value;
		userJob = settings._userJob.value;
		userSallary = settings._userSallary.value;
		userPrivilege = settings._userPrivilege.value;
		
		if( userName == '' || userPass == '' ||  userfName == '' || userlName == '' || userDob == '' || userAddress == '' || userPhone == '' || userJob == '' || userSallary == '' || userPrivilege == '' ) {
			Alert.openListener('', 'Please fill empty fields.', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'id=id&userName=' + userName + '&userPass=' + userPass + '&userfName=' + userfName + '&userlName=' + userlName + '&userDob=' + userDob + '&userAddress=' + userAddress + '&userPhone=' + userPhone + '&userJob=' + userJob + '&userSallary=' + userSallary + '&userPrivilege=' + userPrivilege + '&create=create';
		
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
			var filename = "_ajax/users.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._userLoading.innerHTML = '';
							settings.resetUser();
							settings.getUsers();
							Alert.openListener('', 'User added successfully', 'alert', '');
						} else {
							settings._userLoading.innerHTML = '';
							Alert.openListener('', 'Error adding user. Please check your user details and try again.', 'alert', '');
						}
					}
				} else {
					settings._userLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Adding user</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	editUser: function() {
		
		var userName, userPass, userfName, userlName, userDob, userAddress, userPhone, userJob, userSallary, userPrivilege;
		
		userName = settings._userName.value;
		userPass = settings._userPass.value;
		userfName = settings._userfName.value;
		userlName = settings._userlName.value;
		userDob = settings._userDob.value;
		userAddress = settings._userAddress.value;
		userPhone = settings._userPhone.value;
		userJob = settings._userJob.value;
		userSallary = settings._userSallary.value;
		userPrivilege = settings._userPrivilege.value;
		
		if( userName == '' || userPass == '' ||  userfName == '' || userlName == '' || userDob == '' || userAddress == '' || userPhone == '' || userJob == '' || userSallary == '' || userPrivilege == '' ) {
			Alert.openListener('', 'Please fill empty fields.', 'alert', '');
			return;
		}
		
		var sendString;
		sendString = 'id=' + settings._userId + '&userName=' + userName + '&userPass=' + userPass + '&userfName=' + userfName + '&userlName=' + userlName + '&userDob=' + userDob + '&userAddress=' + userAddress + '&userPhone=' + userPhone + '&userJob=' + userJob + '&userSallary=' + userSallary + '&userPrivilege=' + userPrivilege + '&update=update';
		
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
			var filename = "_ajax/users.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							settings._userLoading.innerHTML = '';
							settings.resetUser();
							settings.getUsers();
							Alert.openListener('', 'User updated successfully', 'alert', '');
						} else {
							settings._userLoading.innerHTML = '';
							Alert.openListener('', 'Error updating user. Please check your user details and try again.', 'alert', '');
						}
					}
				} else {
					settings._userLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Updating the user</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	deleteUser: function() {
		
		Alert.openListener('', 'Are you sure you want to delete this user?', 'confirm', function() {
			
			var sendString;
			sendString = 'id=' + settings._userId;
		
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
				var filename = "_ajax/users.php";
				xhr.open("POST", filename, true);
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4 && xhr.status == 200) {
						var responseText = xhr.responseText;
						if(responseText) {
							if(responseText == 'done') {
								settings._userLoading.innerHTML = '';
								settings.resetUser();
								settings.getUsers();
								Alert.openListener('', 'User deleted successfully', 'alert', '');
							}
						}
					} else {
						settings._userLoading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Deleting user</span>';
					}
				}
				xhr.send(sendString);
			} else {
				Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
			}
		});
	},
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ============================================= General Methods =========================================== //
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	resetRooms: function() {
		settings._roomNumber.value = '';
		settings._roomType.selectedIndex = -1;
		settings._roomCat.selectedIndex = -1;
		settings._roomNPrice.value = '';
		settings._roomLPrice.value = '';
		settings._roomHPrice.value = '';
		settings._roomAdd.value = 'Add Room';
		Core.hide(settings._roomDel);
		Core.removeEventListener(settings._roomAdd, 'click', settings.editRoom);
		Core.addEventListener(settings._roomAdd, 'click', settings.addRoom);
	},
	
	resetType: function() {
		settings._typeId = null;
		settings._typeName.value = '';
		settings._typeAdd.value = 'Add Type';
		Core.hide(settings._typeDel);
		Core.removeEventListener(settings._typeAdd, 'click', settings.editType);
		Core.addEventListener(settings._typeAdd, 'click', settings.addType);
	},
	
	resetCat: function() {
		settings._catId = null;
		settings._catName.value = '';
		settings._catAdd.value = 'Add Category';
		Core.hide(settings._catDel);
		Core.removeEventListener(settings._catAdd, 'click', settings.editCat);
		Core.addEventListener(settings._catAdd, 'click', settings.addCat);
	},
	
	resetAct: function() {
		settings._actId = null;
		settings._actName.value = '';
		settings._actPrice.value = '';
		settings._actAdd.value = 'Add';
		Core.hide(settings._actDel);
		Core.removeEventListener(settings._actAdd, 'click', settings.editAct);
		Core.addEventListener(settings._actAdd, 'click', settings.addAct);
	},
	
	resetUser: function() {
		settings._userId = null;
		settings._userName.value = '';
		settings._userName.disabled = '';
		settings._userPass.value = '';
		settings._userfName.value = '';
		settings._userlName.value = '';
		settings._userDob.value = '';
		settings._userAddress.value = '';
		settings._userPhone.value = '';
		settings._userJob.value = '';
		settings._userSallary.value = '';
		settings._userPrivilege.selectedIndex = -1;
		settings._userAdd.value = 'Add';
		settings._userChkLoading.innerHTML = '';
		Core.hide(settings._userDel);
		Core.removeEventListener(settings._userAdd, 'click', settings.editUser);
		Core.addEventListener(settings._userAdd, 'click', settings.addUser);
	}
}

Core.start(settings);