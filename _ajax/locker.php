<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST['unlock'])) {
	header("Content-type: text/html; charset=utf-8");
	$user = User::find_by_id($_SESSION['user_id']);
	if($user->hashed_password == sha1(c2sdecrypt($_POST['unlock']))) {
		echo 'unlocked';
	} else {
		echo 'locked';
	}
}
?>