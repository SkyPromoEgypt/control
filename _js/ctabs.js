// JavaScript Document

var ctabs = {
	
	init: function() {
		
		ctabs.tabs = Core.getElementsByClass('ctabs');
		ctabs.divtabs = Core.getElementsByClass('tabDiv');
		
		for ( var i = 0, ii = ctabs.divtabs.length; i<ii; i++ ) {
			ctabs.divtabs[i].style.display = 'none';
		}
		
		for ( var i = 0, ii = ctabs.tabs.length; i<ii; i++ ) {
			ctabs.tabs[i]._ref = i;
			Core.addEventListener(ctabs.tabs[i], 'focus', ctabs.openTab);
			Core.addEventListener(ctabs.tabs[i], 'click', ctabs.openTab);
		}
		
		ctabs.closeAll();
		
		if(location.hash.length > 1) {
			var hash = location.hash.substring(1);
		
			switch(hash) {
				case "acts":
				Core.addClass(ctabs.tabs[2], 'active');
				ctabs.divtabs[2].style.display = '';
				break;
				case "general":
				Core.addClass(ctabs.tabs[0], 'active');
				ctabs.divtabs[0].style.display = '';
				break;
				case "users":
				Core.addClass(ctabs.tabs[3], 'active');
				ctabs.divtabs[3].style.display = '';
				break;
				case "rooms":
				Core.addClass(ctabs.tabs[1], 'active');
				ctabs.divtabs[1].style.display = '';
				break;
			}
		}
		
		else {
			Core.addClass(ctabs.tabs[0], 'active');
			ctabs.divtabs[0].style.display = '';
		}
	},
	
	openTab: function() {
		var ref = this._ref;
		ctabs.closeAll();
		Core.addClass(ctabs.tabs[ref], 'active');
		ctabs.divtabs[ref].style.display = '';
	},
	
	closeAll: function() {
		for ( var i = 0, ii = ctabs.divtabs.length; i<ii; i++ ) {
			Core.removeClass(ctabs.tabs[i], 'active');
			ctabs.divtabs[i].style.display = 'none';
		}
	}
};

Core.start(ctabs);