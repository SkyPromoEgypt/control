// Javascript Document

var dbRec = {
	
	init: function() {
		
		dbRec.div = $('allDBRecords');
		dbRec.nav = $('recordsNav');
		
		dbRec.total = parseInt($('totalCount').value, 10);
		dbRec.perPage = 20;
		dbRec.currPage = 1;
		dbRec.pageTotal = Math.ceil(dbRec.total / dbRec.perPage);
		dbRec.offset = dbRec.perPage * (dbRec.currPage - 1);
		
		dbRec.navigation = [];
		
		if(dbRec.pageTotal > 1) {
			dbRec.nav.style.display = 'inherit';
			var prev = document.createElement('a');
			prev.innerHTML = '&laquo; Prev';
			prev.setAttribute('href', '#');
			dbRec.nav.appendChild(prev);
			for(var i = 0, ii = dbRec.pageTotal; i<ii; i++) {
				var link = document.createElement('a');
				link._ref = link.innerHTML = i + 1;
				link.setAttribute('href', '#');
				dbRec.nav.appendChild(link);
				dbRec.navigation[i] = link;
				Core.addEventListener(link, 'click', dbRec.thisOffset);
			}
			var next = document.createElement('a');
			next.innerHTML = 'Next &raquo;';
			next.setAttribute('href', '#');
			dbRec.nav.appendChild(next);
			
			Core.addEventListener(prev, 'click', dbRec.prevOffset);
			Core.addEventListener(next, 'click', dbRec.nextOffset);
		}
		
		dbRec.addActive(dbRec.currPage-1);
		dbRec.requestData();
		
	},
	
	nextOffset: function(event) {
		Core.preventDefault(event);
		var currPage = dbRec.currPage + 1;
		var offset = dbRec.perPage * (currPage - 1);
		if(offset >= dbRec.total) return;
		else {
			dbRec.currPage++;
			dbRec.offset = offset;
			dbRec.addActive(dbRec.currPage-1);
			dbRec.requestData();
		}
	},
	
	prevOffset: function(event) {
		Core.preventDefault(event);
		var currPage = dbRec.currPage - 1;
		var offset = dbRec.perPage * (currPage - 1);
		if(offset < 0) return;
		else {
			dbRec.currPage--;
			dbRec.offset = offset;
			dbRec.addActive(dbRec.currPage-1);
			dbRec.requestData();
		}
	},
	
	thisOffset: function(event) {
		dbRec.currPage = this._ref;
		dbRec.offset = dbRec.perPage * (dbRec.currPage - 1);
		dbRec.requestData();
		dbRec.addActive(this._ref-1);
		Core.preventDefault(event);
	},
	
	requestData: function() {
		
		var sendString;
		sendString = 'offset=' + dbRec.offset + '&perpage=' + dbRec.perPage;
		if(document.URL.indexOf('email') != -1) sendString += '&email=email';
		
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
			var filename = "_ajax/all_records.php";
			xhr.open("POST", filename, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					var responseText = xhr.responseText;
					if(responseText) {
						dbRec.div.innerHTML = responseText;
					} else {
						dbRec.div.innerHTML = 'Sorry no records in your DB';
					}
				} else {
					dbRec.div.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading All Records</span>';
					if(document.URL.indexOf('email') != -1) dbRec.div.innerHTML = '<img src="_images/ajax request.gif" width="16" height="16" align="top" /><span style="color:#333; font-size:0.8em;">Loading Customers Records</span>';
				}
			}
			xhr.send(sendString);
		} else {
			Alert.openListener('', "Sorry, your browser doesn't support AJAX", 'alert', '');
		}
	},
	
	addActive: function(ref) {
		for(var i = 0, ii = dbRec.navigation.length; i<ii; i++) {
			if(i == ref) {
				Core.addClass(dbRec.navigation[ref], 'active');
			} else {
				Core.removeClass(dbRec.navigation[i], 'active');
			}
		}
	},
	
};

Core.start(dbRec);