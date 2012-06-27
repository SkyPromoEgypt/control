<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<link href="_css/main_css.css" rel="stylesheet" type="text/css" media="all" />
<link href="_css/alert.css" rel="stylesheet" type="text/css" media="all" />
<script type="text/javascript" src="_js/lib/core.js"></script>
<script type="text/javascript" src="_js/alert.js"></script>
<script type="text/javascript">
window.alert = function(msg) {
	Alert.openListener(null, msg, 'alert', null);
}

function d() {
	var alrt = $('alert');
	var cfrm = $('confirm');
	Core.addEventListener(alrt, 'click', calculate);
}

function calculate(event) { 
	alert('Hello from inside the new alert system');
	Core.preventDefault(event);
}

Core.addEventListener(window, 'load', d);
</script>
</head>

<body>
<div id="systemOverlay"></div>
<div id="systemAlert">
  <div id="alertImg"></div>
  <div id="alertMsg"></div>
  <div id="alertConfirm"><a href="#" id="alertOk">OK</a><a href="#" id="alertYes">YES</a><a href="#" id="alertNo">NO</a></div>
</div>
<a href="#" id="alert">Show Alert</a>
<a href="#" id="confirm">Show Confirm</a>
</body>
</html>
