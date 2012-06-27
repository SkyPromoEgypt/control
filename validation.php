<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<script type="text/javascript" src="_js/lib/core.js"></script>
<script type="text/javascript">
var valid = {
	
	init: function() {
		
		valid.email = $('email');
		valid.error = $('emailError');
		valid.submitBtn = $('submit');
		valid.submitBtn.disabled = 'disabled';
		Core.addEventListener(valid.email, 'keyup', valid.validEmail)
		Core.addEventListener(valid.email, 'blur', valid.validEmail)
		Core.addEventListener(valid.submitBtn, 'click', valid.validEmail)
		
	},
	
	validEmail: function() {
		var email = valid.email.value;
		if(email == '') {
			alert('Please fill in your email');
			return;
		}
		var test = email.match(/^[^_\W]+[\w\-\.]+[^_\W]@[^_\W]+[\w\-\.]+[^_\W]\.[a-zA-Z]{2,6}$/);
		if(!test) {
			Core.replaceClass(valid.email, 'error');
			valid.submitBtn.disabled = 'disabled';
			valid.error.innerHTML = 'invalid email address';
		} else {
			Core.replaceClass(valid.email, 'input');
			valid.submitBtn.disabled = false;
			valid.error.innerHTML = '';
		}
	}
};
Core.start(valid);

</script>
<style type="text/css">
#booking {
	margin-top: 50px;
	margin-right: 15px;
	margin-bottom: 15px;
	margin-left: 15px;
	padding: 15px;
	background-color: #F5F5F5;
	border-top-width: 1px;
	border-right-width: 2px;
	border-bottom-width: 1px;
	border-left-width: 2px;
	border-top-style: solid;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
	border-top-color: #CCC;
	border-right-color: #CCC;
	border-bottom-color: #CCC;
	border-left-color: #CCC;
	width: 450px;
}
#booking .input {
	width: 200px;
	background-color: #FFF;
	padding: 3px;
	border: 1px solid #CCC;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 0.75em;
	color: #666;
}
#booking label {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 0.75em;
	color: #666;
}
#booking .input:focus {
	border: 2px solid #06C;
	background-color: #FFC;
}
#booking .error  {
	width: 200px;
	padding: 3px;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 0.75em;
	color: #666;
	border: 2px solid #900;
	background-color: #FFE6E6;
}
#booking table td {
	padding: 5px;
}
</style>
</head>
<body>
<form name="booking" id="booking" method="post" action="">
<table width="416">
  <tr align="left" valign="top">
    <td width="72"><label for="name">Name:</label></td>
    <td width="144"><input name="name" type="text" class="input" id="name"></td>
  </tr>
  <tr>
    <td align="left" valign="top"><label for="email">Email:</label></td>
    <td align="left" valign="top"><input name="email" type="text" class="input" id="email"></td>
    <td width="123" id="emailError"></td>
  </tr>
  <tr align="left" valign="top">
    <td></td>
    <td><input type="submit" id="submit" name="submit" value="Submit Data" /></td>
  </tr>
</table>
</form>
</body>
</html>