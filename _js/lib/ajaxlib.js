function Ajax() {
	
	this.Name = "Dahab TEchnology AJAX Object";
	this.Version = "1";
	
	this.xhr = false;
	this.resType = null;
	this.filePath = null;
	this.method = null;
	this.readyState = null;
	this.status = null;
	this.response = null;
	
	this.params = null;
	this.sendString = null;
	
};

Ajax.prototype.callXHR = function(type, file, method, func, params) {
	
	if(type == '' || type == null) {
		alert('Please specify response type: XML or TEXT');
		return;
	}
	
	if(file == '' || file == null) {
		alert('Please supply a file location');
		return;
	}
	
	if(method == '' || method == null) {
		alert('Please specify response method: GET or POST');
		return;
	}
	
	this.resType = type;
	this.filePath = file;
	this.method = method;
		
	if(window.ActiveXObject) {
		try {
			this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e1) {
			try {
				this.xhr = new ActiveXObject("MSXML2.XMLHTTP");
			} catch (e2) {
				this.xhr = false;
			}
		}
	} else if(window.XMLHttpRequest) {
		this.xhr = new XMLHttpRequest();
	} else {
		alert('Sorry, There was a problem creating the XMLHttpRequest');
	}
	
	if(this.xhr) {
		if(this.method == 'POST') {
			this.xhr.open("POST", this.filePath, true);
			this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		} else if(this.method == 'GET') {
			this.xhr.open("GET", this.filePath, true);
		}
		
		var xhr = this.xhr;
		
		if(this.resType == 'xml') {
			this.xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					func(xhr.responseXML);
				}
			}
		} else {
			this.xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
					func(xhr.responseText);
				}
			}
		}
		

		if(params) {
			
			this.params = params;
			this.sendString = '';
		
			for(var i in this.params) {
				if(i == 0 || this.params.length == 1) {
					this.sendString += i + "=" + this.params[i];
				} else {
					this.sendString += "&" + i + "=" + this.params[i];
				}
			}
			
			this.sendString = this.sendString.substring(1);
		}
		
		if(this.sendString != null) {
			this.xhr.send(this.sendString);
		} else {
			this.xhr.send(null);
		}
	}
};