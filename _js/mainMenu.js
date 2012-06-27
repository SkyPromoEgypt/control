var wheelTabs = {
	
	init: function() {
		
		wheelTabs.status = false;
		
		wheelTabs.mainMenu = $('mainMenu');
		wheelTabs.data = $('wrraper');
		wheelTabs.userInfo = $('userinfo');
		wheelTabs.logout = $('mainMenuLogout');
		
		wheelTabs.collapseBtn = $('collapse');
		wheelTabs.maximizeBtn = $('maximize');
		
		wheelTabs.tabs = Core.getElementsByClass('menuTab');
		wheelTabs.contents = Core.getElementsByClass('menuTabContent');
		
		for(var i = 0, ii = wheelTabs.tabs.length; i<ii; i++) {
			wheelTabs.tabs[i]._ref = i;
			Core.addEventListener(wheelTabs.tabs[i], 'click', wheelTabs.show);
		}
		
		wheelTabs.hrefsArray = [];
		wheelTabs.linksArray = [];
		
		for(var i = 0, ii = wheelTabs.contents.length; i<ii; i++) {
			var links = wheelTabs.contents[i].getElementsByTagName('a');
			for(var j = 0, jj = links.length; j<jj; j++) {
				if(links[j].getAttribute('href') != '#') {
					wheelTabs.hrefsArray[wheelTabs.hrefsArray.length] = i + links[j];
					wheelTabs.linksArray[wheelTabs.linksArray.length] = links[j];
				}
			}
		}
		
		wheelTabs.tracker = 0;
		
		for(var i = 0, ii = wheelTabs.hrefsArray.length; i<ii; i++) {
			if(wheelTabs.hrefsArray[i].indexOf(window.location) >= 0) {
				wheelTabs.tracker = parseInt(wheelTabs.hrefsArray[i], 10);
				Core.addClass(wheelTabs.linksArray[i], 'active');
			}
		}
		
		wheelTabs.hide();
		Core.addClass(wheelTabs.tabs[wheelTabs.tracker], 'selected');
		wheelTabs.contents[wheelTabs.tracker].style.display = 'block';
		
		if(document.URL.indexOf('room_chart.php') != -1) $('monthyearBlock').style.display = 'inherit';
		else if(document.URL.indexOf('reminders.php') != -1) $('monthyearBlock').style.display = 'inherit';
		else if(document.URL.indexOf('room_stats.php') != -1) $('monthyearBlock').style.display = 'inherit';
		
		Core.addEventListener(wheelTabs.mainMenu, 'mouseover', wheelTabs.setup);
		Core.addEventListener(wheelTabs.mainMenu, 'mouseout', wheelTabs.remove);
		Core.addEventListener(wheelTabs.collapseBtn, 'click', wheelTabs.collapse);
		Core.addEventListener(wheelTabs.maximizeBtn, 'click', wheelTabs.maximize);
	},
	
	show: function(event) {
		wheelTabs.hide();
		if(event) {
			wheelTabs.contents[this._ref].style.display = 'block';
			Core.addClass(wheelTabs.tabs[this._ref], 'selected');
			wheelTabs.tracker = this._ref;
			Core.preventDefault(event);
		} else {
			wheelTabs.contents[wheelTabs.tracker].style.display = 'block';
			Core.addClass(wheelTabs.tabs[wheelTabs.tracker], 'selected');
		}
	},
	
	hide: function() {
		for(var i = 0, ii = wheelTabs.contents.length; i<ii; i++) {
			wheelTabs.contents[i].style.display = 'none';
			Core.removeClass(wheelTabs.tabs[i], 'selected');
		}
	},
	
	raiseUp: function() {
		if(wheelTabs.tracker >=4) return;
		wheelTabs.tracker++;
		wheelTabs.show(null);
	},
	
	raiseDown: function() {
		if(wheelTabs.tracker <=0) return;
		wheelTabs.tracker--;
		wheelTabs.show(null);
	},
	
	handle: function(delta) {
		if (delta > 0) {
			wheelTabs.raiseDown();
		} else {
			wheelTabs.raiseUp();
		}
	},
	
	setup: function(e) {
		Core.addEventListener(window, 'DOMMouseScroll', wheelTabs.wheel);
		Core.addEventListener(document, 'mousewheel', wheelTabs.wheel);
	},
	
	remove: function(e) {
		Core.removeEventListener(window, 'DOMMouseScroll', wheelTabs.wheel);
		Core.removeEventListener(document, 'mousewheel', wheelTabs.wheel);
	},
	
	wheel: function(event){
		var delta = 0;
		
		if (!event){
			event = window.event;
		}
		
		if (event.wheelDelta) {
			delta = event.wheelDelta/120;
			if (window.opera) {
				delta = -delta;
			}
		} else if (event.detail) {
			delta = -event.detail/3;
		}
		
		if (delta) {
			wheelTabs.handle(delta);
		}
			
		Core.preventDefault(event);
	},
	
	collapse: function(event) {
		if(!wheelTabs.status) {
			wheelTabs.mainMenu.style.height = 32 + 'px';
			wheelTabs.data.style.marginTop = 35 + 'px';
			wheelTabs.userInfo.style.left = -17 + 'px';
			wheelTabs.logout.style.display = 'none';
			wheelTabs.status = true;
		} else {
			wheelTabs.mainMenu.style.height = 170 + 'px';
			wheelTabs.data.style.marginTop = 170 + 'px';
			wheelTabs.userInfo.style.left = 35 + 'px';
			wheelTabs.logout.style.display = 'inherit';
			wheelTabs.status = false;
		}
		Core.preventDefault(event);
	},
	
	maximize: function(event) {
		window.open(document.URL, '', 'fullscreen=yes, scrollbars=yes');
		Core.preventDefault(event);
	}
}
Core.start(wheelTabs);

