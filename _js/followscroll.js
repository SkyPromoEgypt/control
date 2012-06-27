// JavaScript Document

var followscroll = {
	
	init: function() {
		
		followscroll.div = $('systemAlert');
		
		followscroll.duration = 0.5;
		followscroll.frameRate = 75;
		followscroll.deceleration = 10;
		
		followscroll.y = 0;
		followscroll.x = 0;
		
		followscroll.t = followscroll.y;
		followscroll.l = followscroll.x;
		
		followscroll.initX = (Core.getWidth() / 2) - (289 / 2);
		followscroll.initY = (Core.getHeight() / 2) - (88 / 2);
		
		Core.addEventListener(window, 'scroll', followscroll.getNewDimensions);
		Core.addEventListener(window, 'resize', followscroll.getNewDimensions);
		
	},
	
	getNewDimensions: function() {
		
		
		followscroll.clearTimers();
		
		followscroll.y = window.scrollY + followscroll.initY;
		followscroll.x = window.scrollX + followscroll.initX;
		
		if (document.all) {
			followscroll.y = document.documentElement.scrollTop + followscroll.initY || 0;
			followscroll.x = document.documentElement.scrollLeft + followscroll.initX || 0;
		}
		
		if(followscroll.y < followscroll.initY) {
			followscroll.div.style.top = followscroll.initY + 'px'; 
		} else {
			if(followscroll.t > followscroll.y) {
				followscroll.timer1 = setTimeout(followscroll.moveUp, 50);
			} else {
				followscroll.timer1 = setTimeout(followscroll.moveDown, 50);
			}
			
		}
		
		if(followscroll.x < followscroll.initX) {
			followscroll.div.style.left = followscroll.initX + 'px'; 
		} else {
			if(followscroll.l > followscroll.x) {
				followscroll.timer2 = setTimeout(followscroll.moveLeft, 50);
			} else {
				followscroll.timer2 = setTimeout(followscroll.moveRight, 50);
			}
			
		}
	},
	
	moveDown: function() {
		followscroll.t += (followscroll.y - followscroll.t) / followscroll.deceleration;
		if(followscroll.t >= followscroll.y) {
			followscroll.t = followscroll.y;
		} else {
			followscroll.timer3 = setTimeout(followscroll.moveDown, followscroll.frameRate / 1000);
		}
		followscroll.div.style.top = followscroll.t + 'px';
	},
	
	moveUp: function() {
		followscroll.t -= ((followscroll.y - followscroll.t) * -1) / followscroll.deceleration;
		if(followscroll.t <= followscroll.y) {
			followscroll.t = followscroll.y;
		} else {
			followscroll.timer3 = setTimeout(followscroll.moveUp, followscroll.frameRate / 1000);
		}
		followscroll.div.style.top = followscroll.t + 'px';
	},
	
	moveRight: function() {
		followscroll.l += (followscroll.x - followscroll.l) / followscroll.deceleration;
		if(followscroll.l >= followscroll.x) {
			followscroll.l = followscroll.x;
		} else {
			followscroll.timer4 = setTimeout(followscroll.moveRight, followscroll.frameRate / 1000);
		}
		followscroll.div.style.left = followscroll.l + 'px';
	},
	
	moveLeft: function() {
		followscroll.l -= ((followscroll.x - followscroll.l) * -1) / followscroll.deceleration;
		if(followscroll.l <= followscroll.x) {
			followscroll.l = followscroll.x;
		} else {
			followscroll.timer4 = setTimeout(followscroll.moveLeft, followscroll.frameRate / 1000);
		}
		followscroll.div.style.left = followscroll.l + 'px';
	},
	
	clearTimers: function() {
		clearTimeout(followscroll.timer1);
		clearTimeout(followscroll.timer2);
		clearTimeout(followscroll.timer3);
		clearTimeout(followscroll.timer4);
	}
}

Core.start(followscroll);