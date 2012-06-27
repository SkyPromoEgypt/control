// Javascript Document

var extend = {
	
	init:function() {
	
		extend.overlay = $('exOverlay');
		extend.panel = $('extend');
		extend.loading = $('exLoading');
		extend.closeBtn = $('extX');

		// form and its elements
		extend._arrDate = $('earr_date');
		extend._depDate = $('edep_date');
		extend._button = $('eupdateBtn');
		
		extend.duration = 0.5;
		extend.frameRate = 75;
		
		extend.initB = -178;
		extend.endB = (Core.getHeight(window) / 2) - (extend.panel.offsetHeight / 2);
		extend.tB = extend.initB;
		
		extend.increment = (extend.endB - extend.initB) / (extend.duration * extend.frameRate);
		
		extend.id = null;
		extend.arrD = null;
		extend.depD = null;
		extend.status = 'collapsed'
		
		extend.panel.style.left = (Core.getWidth(window) / 2) - (extend.panel.offsetWidth / 2) + 'px';
		
		Core.addEventListener(extend._button, "click", extend.update);
		Core.addEventListener(extend.closeBtn, "click", extend.btnAction);
		Core.addEventListener(document, "keydown", extend.Close);
		
	},
	
	open: function(id, arrDate, depDate) {
		extend.id = id;
		extend.arrD = arrDate;
		extend.depD = depDate;
		extend._arrDate.value = arrDate;
		extend._depDate.value = depDate;
		extend.overlay.style.display = 'inherit';
		extend.expand();
		extend.status = 'expanded'
	},
	
	update: function() {
		
		var bkref = extend.id;
		
		if(extend._arrDate.value != extend.arrD || extend._depDate.value != extend.depD) {
			var arrDate = extend._arrDate.value;
			var depDate = extend._depDate.value;
		} else {
			Alert.openListener('', 'Please change at least arrival or deprature date', 'alert', '');
			return;
		}
		
		if(!Core.compareDates(arrDate, depDate)) {
			Alert.openListener('', 'Departue date must be greater than arrival date', 'alert', '');
			return;
		}
		
		if(bkref != '') sendString = 'bkref='+bkref;
		if(arrDate != '') sendString += '&arr_d='+arrDate;
		if(depDate != '') sendString += '&dep_d='+depDate;
		
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
			var filename = "_ajax/quick_update.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						if(responseText == 'done') {
							extend.loading.innerHTML = '';
							extend.overlay.style.display = 'none';
							extend.collapse();
							extend.resetForm();
							getMBooking.clickListener();
						} else {
							extend.loading.innerHTML = '';
							extend.overlay.style.display = 'none';
							Alert.openListener('', responseText, 'alert', '');
						}
					}
				} else {
					extend.loading.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:1em;">Updating Booking</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	expand: function() {
		extend.tB += extend.increment;
		if(extend.tB >= extend.endB) {
			extend.tB = extend.endB;
		} else {
			extend._timer = setTimeout(extend.expand, 1000 / extend.frameRate);
		}
		extend.panel.style.top = extend.tB + 'px';
	},
	
	collapse: function() {
		extend.tB -= extend.increment;
		if(extend.tB <= extend.initB) {
			extend.tB = extend.initB;
		} else {
			extend._timer = setTimeout(extend.collapse, 1000 / extend.frameRate);
		}
		extend.panel.style.top = extend.tB + 'px';
	},
	
	resetForm: function() {
		extend._arrDate.value = '';
		extend._depDate.value = '';
		extend.arrD = null;
		extend.depD = null;
		extend.id = null;
	},
	
	btnAction: function() {
		if(extend._timer) clearTimeout(extend._timer);
		extend.collapse();
		extend.status = 'collapsed'
		extend.overlay.style.display = 'none';
		extend.resetForm();
	},
	
	Close: function(event) {
		var key = event.which || event.keyCode
		if(key == 27) {
			if(extend.status == 'collapsed') {
				return;
			} else {
				if(extend._timer) clearTimeout(extend._timer);
				extend.collapse();
				extend.status = 'collapsed'
				extend.overlay.style.display = 'none';
			}
			extend.resetForm();
		}
	},
};

Core.start(extend);