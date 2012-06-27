// Javascrip Document


var context = {
	
	init: function() {
		
		context.wrraper = $('wrraper');
		context.menu = null;
		context.x;
		context.y;
		context.menuParents = Core.getElementsByClass('context');
		
		for( var i = 0, ii = context.menuParents.length; i<ii; i++ ) {
			Core.addEventListener(context.menuParents[i], 'contextmenu', context.enableMenu);
		}
		
		Core.addEventListener(document, 'click', context.hide);
	},
	
	enableMenu: function(event) {
		context.getMouse(event);
		context.show(event);
		Core.preventDefault(event);
		Core.stopPropagation(event);
	},
	
	show: function(event) {
		if(context.menu) {
			context.hide();
		}
		var target = event.target || event.srcElement;
		var id = target.id;
		var rel = target.getAttribute('rel');
		var bkref = id.match(/^(\d+)/i);
		booking.bookingReference = parseInt(bkref[0], 10);
		var status = id.match(/-(\w+)/i);
		var roomStatus = (status[0].substring(1));
		var dates = id.match(/(\d{4}-\d{2}-\d{2})/g);
		var arrD = dates[0];
		var depD = dates[1];
		var list = document.createElement('ul');
		list.className = 'contextMenu';
		list.style.top = context.y - $('mainMenu').scrollHeight + 'px';
		list.style.left = context.x + 'px';
		list.style.position = 'absolute';
		if(roomStatus == "Opened") {
			var listItem1 = document.createElement('li');
			listItem1.innerHTML = '<a href="javascript:void(0);" onclick="booking.editBooking(event,' + booking.bookingReference + ');"><img src="_images/edit.png" width="15" height="15" align="top" />Edit Booking</a>';
			var listItem2 = document.createElement('li');
			listItem2.innerHTML = '<a href="javascript:void(0);" onclick="extend.open(' + booking.bookingReference + ', \'' + arrD + '\', \'' + depD + '\');"><img src="_images/extend.gif" width="15" height="15" align="top" />Extend Booking</a>';
		}
		var listItem3 = document.createElement('li');
		listItem3.innerHTML = '<a target="_blank" href="print.php?bkref=' + booking.bookingReference + '"><img src="_images/printlsmall.png" width="15" height="15" align="top" />Print Booking</a>';
		var listItem4 = document.createElement('li');
		listItem4.innerHTML = '<a href="billing.php?bkref=' + booking.bookingReference + '"><img src="_images/billing.png" width="15" height="15" align="top" />View The Bill</a>';
		var listItem5 = document.createElement('li');
		listItem5.innerHTML = '<a href="javascript:void(0);" onclick="Alert.openListener(event, \'Are you sure you want to delete this booking from your records?\', \'confirm\', function() { booking.deleteBooking(); } );"><img src="_images/delete.png" width="15" height="15" align="top" />Delete Booking</a>';
		var listItem6 = document.createElement('li');
		var linkText;
		if(roomStatus == "Opened") {
			linkText = "Close Booking";
			booking.statusTracker = "opened";
		} else {
			linkText = "Open Booking";
			booking.statusTracker = "closed";
		}
		listItem6.innerHTML = '<a href="javascript:void(0);" onclick="booking.openCloseBooking(event);"><img src="_images/Lock-icon.png" width="15" height="15" align="top" />' + linkText + '</a>';
		if(roomStatus == "Opened") {
			list.appendChild(listItem1);
			list.appendChild(listItem2);
		}
		list.appendChild(listItem3);
		list.appendChild(listItem4);
		list.appendChild(listItem5);
		list.appendChild(listItem6);
		context.wrraper.appendChild(list);
		context.menu = list;
	},
	
	hide: function() {
		if(context.menu) {
			context.wrraper.removeChild(context.menu);
			context.menu = null;
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
		
		context.x = x + mx;
		context.y = y + my
		
		if((context.y - y) > (Core.getHeight(window)/2)) {
			context.y = y + my - 120;
		}
	}
	
};

Core.start(context);



