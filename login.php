<?php require_once('_includes/initialize.php'); ?>
<?php 
		if(!isset($_SESSION['page'])) {
			$_SESSION['page'] = "room_chart.php";
		}
		
		if($session->is_logged_in()) {
		  redirect_to("{$_SESSION['page']}");
		}
		
		// Remember to give your form's submit tag a name="submit" attribute!
		if (isset($_POST['submit'])) { // Form has been submitted.
		
		  $username = trim($_POST['username']);
		  $password = trim($_POST['password']);
		  
		  // Check database to see if username/password exist.
		  $found_user = User::authenticate($username, $password);
			
		  if ($found_user) {
			$session->login($found_user);
			$found_user->set_login_status($found_user, 'logged in');
			log_action("Login", "{$found_user->username} has logged in.");
			redirect_to("{$_SESSION['page']}");
		  } else {
			// username/password combo was not found in the database
			$message = "Username/password combination incorrect.";
		  }
		  
		} else { // Form has not been submitted.
		  $username = "";
		  $password = "";
		}


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="_images/favicon.ico" >
<link href="_css/main_css.css" rel="stylesheet" type="text/css" />
<title>Welcome to Hotel Booking System v1 (Beta Mode)</title>
<style type="text/css">

body {
	background-image:url(_images/loginBG.jpg);
	position: relative;
}

#wrraper_login {
	background-image: url(_images/loginboxBG.png);
	background-repeat: no-repeat;
	position: absolute;
	height: 389px;
	width: 493px;
	left: 378px;
	top: 80px;
}
#wrraper_login #login {
	margin-top: 150px;
	padding-left: 5px;
}
#wrraper_login #login .input {
	background-color: #FFF;
	border: 1px solid #FFF;
	width: 310px;
	height: 25px;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1.5em;
}


#copyrights {
	position: absolute;
	left: 112px;
	top: 366px;
	z-index: 150;
}
#copyrights p {
	font-weight: bold;
	color: #333;
}
</style>
<script type="text/javascript" src="_js/lib/core.js"></script>
</head>

<body>
<div id="wrraper_login">
  <form action="login.php" method="post" id="login">
    <table width="329" height="222" align="center" cellpadding="2" cellspacing="2">
      <tr>
        <td height="92" colspan="2" align="left" valign="top"><input name="username" type="text" class="input" value="<?php echo htmlentities($username); ?>" maxlength="30" /></td>
      </tr>
      <tr>
        <td height="52" colspan="2" align="left" valign="top"><input name="password" type="password" class="input" value="<?php echo htmlentities($password); ?>" maxlength="30" /></td>
      </tr>
      <tr>
        <td width="92" align="left" valign="top"><input name="submit" type="submit" value="Login" id="loginSubmit" /></td>
        <td width="221" align="left" valign="top"><?php if (!empty($message)) {echo "<p class=\"message\">" . $message . "</p>";} ?></td>
      </tr>
    </table>
  </form><div id="copyrights">
  <p>Developed and Powered By: Dahab TEchnology</p>
</div>
</div>

<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<script type="text/javascript">
Core.addEventListener(window, 'load', function() { Core.center($('wrraper_login')); });
Core.addEventListener(window, 'resize', function() { Core.center($('wrraper_login')); });
</script>
</body>
</html>