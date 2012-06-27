<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["id"])){
  header("Content-type: text/html; charset=utf-8");
	  $mail = Mail::find_by_id($_POST["id"]);
	  if($mail->delete()) {
		  echo 'done';
	  }
}
?>