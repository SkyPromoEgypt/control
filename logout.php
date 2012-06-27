<?php require_once('_includes/initialize.php'); ?>
<?php
	$user = User::find_by_id($_SESSION['user_id']);
	$user->set_login_status($user, 'logged out');
	log_action('Logout', "{$user->username} has logged out.");
    $session->logout();
	unset($_SESSION['page']);
	$session->message("Goodbye {$user->full_name()}.");
    redirect_to("login.php");
?>