<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST['user'])) {
	header("Content-type: txt/html; charset=utf-8");
	$user = User::check_user($_POST['user']);
	if($user) echo 'done';
}
?>