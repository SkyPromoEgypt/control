// Faded Tooltip
// Coded by Eng. Mohammed Yehia Abdul Mottalib
// Developed for free use | feel free to use it any where in your site
// Developed in 3rd June 2010
// Copyrights 2010 | Dahab TEchnology | http://www.dahabtech.com
// Happy use, Mohammed

var tip = {

	init: function() {
		
		tip.wrraper = $('data');
		tip._tip = null;
		tip.hide();
		Core.addEventListener(document, 'mousemove', tip.getMouse);
		Core.addEventListener(document, 'click', tip.hide);
	},
	
	show: function(event) {
		
		context.hide();
		
		var target = event.target || event.srcElement;
		var id = target.id;
		var bkref = id.match(/^(\d+)/i);
		booking.bookingReference = parseInt(bkref[0], 10);
		
		var theTip = document.createElement('div');
		theTip.innerHTML = '';
		theTip.className = 'tooltipcss';
		tip.wrraper.appendChild(theTip);
		
		tip._tip = theTip;
		
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
			theTip.innerHTML = 'Sorry, There was a problem creating the XMLHttpRequest';
		}
		
		if(xhr) {
			var filename = "_ajax/get_booking.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseXML = xhr.responseXML;
					if(responseXML) {
						theTip.innerHTML = '';
						var theBooking = responseXML.getElementsByTagName('booking')[0];
						theTip.innerHTML += 'Name:' + theBooking.getElementsByTagName('customer_name')[0].firstChild.nodeValue;
						theTip.innerHTML += '<br />Email:' + theBooking.getElementsByTagName('email')[0].firstChild.nodeValue;
						if(theBooking.getElementsByTagName('nationality')[0].firstChild) {
							theTip.innerHTML += '<br />Nationality: ' + theBooking.getElementsByTagName('nationality')[0].firstChild.nodeValue;
						}
						theTip.innerHTML += '<br />From: ' + theBooking.getElementsByTagName('arr_d')[0].firstChild.nodeValue;
						theTip.innerHTML += '<br />To: ' + theBooking.getElementsByTagName('dep_d')[0].firstChild.nodeValue;
						theTip.innerHTML += '<br />Booked By: ' + theBooking.getElementsByTagName('booked_by')[0].firstChild.nodeValue;
					}else {
						theTip.innerHTML = '';
						theTip.innerHTML = 'No data to show';
					}
				} else {
					theTip.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" />Loading Booking Details';
				}
			}
			xhr.send('bkref=' + booking.bookingReference);
		} else {
			theTip.innerHTML = "Sorry, your browser doesn't support AJAX";
		}
	},
	
	hide: function() {
		
		if(tip._tip != null) {
			tip.wrraper.removeChild(tip._tip);
			tip._tip = null;
		}
	},
	
	getMouse: function(event) {
		
		var x,y,mx,my;
		
		y = window.scrollY;
		x = window.scrollX;
		
		if (document.all) {
			y = document.documentElement.scrollTop || 0;
			x = document.documentElement.scrollLeft || 0;
		}
		
		mx = event.clientX;
		my = event.clientY;
		
		tip.x = x + mx + 5;
		tip.y = y + my;
		
		if((tip.y - y) > (Core.getHeight(window)/2)) {
			tip.y = y + my - 270;
		} else {
			tip.y = y + my - 150;
		}
		
		if(tip._tip != null) {
			tip._tip.style.top = tip.y + 'px';
			tip._tip.style.left = tip.x + 'px';
		}
	}
};

Core.start(tip);