<?php require_once('../_includes/session.php'); ?>
<?php
if(isset($_POST['unset'])) {
	$user = User::find_by_id($_SESSION['user_id']);
	$user->login_status = "logged out";
	$session->logout();
}
?>