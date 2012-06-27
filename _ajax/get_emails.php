<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["mails"])){
	header("Content-type: text/html; charset=utf-8");
	$mails = Mail::find_all();
	if(isset($_POST['count'])) {
		$count = array();
		foreach($mails as $mail) {
			if($mail->status == 'unread') {
				$count[] = $mail->status;
			}
		}
		echo count($count);
	} else {
		foreach($mails as $mail) {
			if($mail->status == unread) {
				echo '<a class="email" href="#" onclick="mail.getEmail(event,' . $mail->id . '); mail.mark(event,' . $mail->id . ', \'read\');">New Booking | ' . format_time($mail->created) . '<br />' . $mail->mailfrom . '</a>';
			} else {
				echo '<a class="emailread" href="#" onclick="mail.getEmail(event,' . $mail->id . ');">New Booking | ' . format_time($mail->created) . '<br />' . $mail->mailfrom . '</a>';
			}
		}
	}
}
?>