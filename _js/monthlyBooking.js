// AJAX Requests Libraray

var getMBooking = {
	
	init: function() {
		
		getMBooking.xhr = false;
		
		if(window.ActiveXObject) {
			try {
				getMBooking.xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e1) {
				try {
					getMBooking.xhr = new ActiveXObject("MSXML2.XMLHTTP");
				} catch (e2) {
					getMBooking.xhr = false;
				}
			}
		} else if(window.XMLHttpRequest) {
			getMBooking.xhr = new XMLHttpRequest();
		} else {
			Alert.openListener('', 'Sorry, There was a problem creating the XMLHttpRequest', 'alert', '');
		}
		
		getMBooking.refreshBtn = $('refreshBtn');
		getMBooking.monthMenu = $('month');
		getMBooking.yearMenu = $('year');
		getMBooking.div = $('data');
		getMBooking.overlay = $('exOverlay');
		getMBooking.loadingBox = $('loadingBox');
		
		getMBooking.nextMonth = $('nextMonth');
		getMBooking.prevMonth = $('prevMonth');
		getMBooking.nextYear = $('nextYear');
		getMBooking.prevYear = $('prevYear');
		
		var date = new Date();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		
		for(var i = 0, ii = getMBooking.monthMenu.options.length; i<ii; i++) {
			if(getMBooking.monthMenu.options[i].value == month) {
				getMBooking.monthMenu.options.selectedIndex = i;
			}
		}
		
		for(var i = 0, ii = getMBooking.yearMenu.options.length; i<ii; i++) {
			if(getMBooking.yearMenu.options[i].value == year) {
				getMBooking.yearMenu.options.selectedIndex = i;
			}
		}
		
		//alert((Core.getHeight(window) / 2)-115+'px');
		getMBooking.loadingBox.style.top = (Core.getHeight(window) / 2) - 38 + 'px';
		getMBooking.loadingBox.style.left = (Core.getWidth(window) / 2) - 115 + 'px';
		
		Core.addEventListener(getMBooking.refreshBtn, "click", getMBooking.clickListener);
		Core.addEventListener(getMBooking.refreshBtn, "click", getMBooking.preventAction);
		Core.addEventListener(getMBooking.refreshBtn, "click", countmail.count);
		Core.addEventListener(getMBooking.monthMenu, "change", getMBooking.clickListener);
		Core.addEventListener(getMBooking.yearMenu, "change", getMBooking.clickListener);
		Core.addEventListener(getMBooking.nextMonth, 'click', getMBooking.setMonthUp);
		Core.addEventListener(getMBooking.prevMonth, 'click', getMBooking.setMonthDown);
		Core.addEventListener(getMBooking.nextYear, 'click', getMBooking.setYearUp);
		Core.addEventListener(getMBooking.prevYear, 'click', getMBooking.setYearDown);
		
		getMBooking.clickListener();
		getMBooking.playTime();
	},
	
	clickListener: function() {
		if(getMBooking.xhr) {
			var month = getMBooking.monthMenu.value;
			var year = getMBooking.yearMenu.value;
			var filename = "_ajax/check_monthly_booking.php";
			getMBooking.xhr.open("POST", filename, true);
			getMBooking.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			getMBooking.xhr.onreadystatechange = function() {
				if(getMBooking.xhr.readyState == 4 && getMBooking.xhr.status == 200) {
					var responseText = getMBooking.xhr.responseText;
					if(responseText) {
						getMBooking.closeLoading();
						getMBooking.div.innerHTML = responseText;
					} else {
						getMBooking.closeLoading();
						getMBooking.div.innerHTML = '<p style="color:#fff;">Sorry, please try again later.</p>';
					}
				} else {
					getMBooking.openLoading();
				}
			}
			getMBooking.xhr.send("month=" + Core.c2sencrypt(month) + "&year=" + Core.c2sencrypt(year));
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	preventAction: function(event) {
		Core.preventDefault(event);
	},
	
	setMonthUp: function(event) {
		if((getMBooking.monthMenu.options.selectedIndex + 1) > (getMBooking.monthMenu.options.length - 1)) {
			getMBooking.monthMenu.options.selectedIndex = 0;
			getMBooking.setYearUp(event, 'no');
			
		} else {
			getMBooking.monthMenu.options.selectedIndex++;
		}
		getMBooking.clickListener();
		Core.preventDefault(event);
	},
	
	setMonthDown: function(event) {
		if((getMBooking.monthMenu.options.selectedIndex - 1) < 0) {
			getMBooking.monthMenu.options.selectedIndex = getMBooking.monthMenu.options.length - 1;
			getMBooking.setYearDown(event, 'no');
		} else {
			getMBooking.monthMenu.options.selectedIndex--;
		}
		getMBooking.clickListener();
		Core.preventDefault(event);
	},
	
	setYearUp: function(event, func) {
		if((getMBooking.yearMenu.options.selectedIndex + 1) > (getMBooking.yearMenu.options.length - 1)) {
			getMBooking.yearMenu.options.selectedIndex = 0;
		} else {
			getMBooking.yearMenu.options.selectedIndex++;
		}
		if(!func) getMBooking.clickListener();
		Core.preventDefault(event);
	},
	
	setYearDown: function(event, func) {
		if((getMBooking.yearMenu.options.selectedIndex - 1) < 0) {
			getMBooking.yearMenu.options.selectedIndex = getMBooking.yearMenu.options.length - 1;
		} else {
			getMBooking.yearMenu.options.selectedIndex--;
		}
		if(!func) getMBooking.clickListener();
		Core.preventDefault(event);
	},
	
	openLoading: function() {
		getMBooking.overlay.style.display = 'inherit';
		getMBooking.loadingBox.style.display = 'inherit';
	},
	
	closeLoading: function() {
		getMBooking.overlay.style.display = 'none';
		getMBooking.loadingBox.style.display = 'none';
	},
	
	playTime: function() {
		var timer = setInterval(getMBooking.clickListener, 600000);
	}
};

Core.start(getMBooking);