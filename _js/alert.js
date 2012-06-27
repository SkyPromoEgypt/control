// JavaScript Document

var Alert = {
	
	init: function() {
		
		Alert.overlay = $('systemOverlay');
		Alert.div = $('systemAlert');
		Alert.msg = $('alertMsg');
		Alert.img = $('alertImg');
		Alert.ok = $('alertOk');
		Alert.yes = $('alertYes');
		Alert.no = $('alertNo');
		
		Core.center(Alert.div);
		
	},
	
	openListener: function(event, altMsg, altType, altFunc) {
		if(event) {
			Core.preventDefault(event);
		}
		if(altType == 'alert') {
			Core.hide(Alert.yes);
			Core.hide(Alert.no);
			Core.show(Alert.ok);
			Core.show(Alert.overlay);
			Core.show(Alert.div);
			Alert.msg.innerHTML = altMsg;
			Alert.img.innerHTML = '<img src="_images/convicon.png" width="50" height="49" />';
			Core.addEventListener(Alert.ok, 'click', Alert.closeListener);
		} else {
			Core.show(Alert.yes);
			Core.show(Alert.no);
			Core.hide(Alert.ok);
			Core.show(Alert.overlay);
			Core.show(Alert.div);
			Alert.msg.innerHTML = altMsg;
			Alert.img.innerHTML = '<img src="_images/questionicon.png" width="50" height="49" />';
			Alert.yes._func = altFunc;
			Alert.no._func = altFunc;
			Core.addEventListener(Alert.yes, 'click', altFunc);
			Core.addEventListener(Alert.yes, 'click', Alert.closeListenerConfirm);
			Core.addEventListener(Alert.no, 'click', Alert.closeListenerConfirm);
			
		}
	},
	
	closeListener: function(event) {
		if(event) {
			Core.preventDefault(event);
		}
		Core.hide(Alert.yes);
		Core.hide(Alert.no);
		Core.hide(Alert.ok);
		Core.hide(Alert.overlay);
		Core.hide(Alert.div);
		Alert.msg.innerHTML = '';
		Alert.img.innerHTML = '';
		Core.removeEventListener(Alert.ok, 'click', Alert.closeListener);
		
	},
	
	closeListenerConfirm: function(event) {
		if(event) {
			Core.preventDefault(event);
		}
		Core.hide(Alert.yes);
		Core.hide(Alert.no);
		Core.hide(Alert.ok);
		Core.hide(Alert.overlay);
		Core.hide(Alert.div);
		Alert.msg.innerHTML = '';
		Alert.img.innerHTML = '';
		var altFunc = this._func;
		Core.removeEventListener(Alert.yes, 'click', altFunc);
		Core.removeEventListener(Alert.yes, 'click', Alert.closeListenerConfirm);
		Core.removeEventListener(Alert.no, 'click', Alert.closeListenerConfirm);
	}
};

Core.start(Alert);