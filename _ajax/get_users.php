<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["users"])){
	header("Content-type: text/html; charset=utf-8");
	$users = User::find_all();
	foreach($users as $user) {
		echo '<a class="useritem" href="#" onclick="settings.getUser(event,' . $user->id . ');">' . $user->username . '</a>';
	}
}
?>