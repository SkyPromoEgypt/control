<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["id"])){
  header("Content-type: text/html; charset=utf-8");
  $id = $_POST['id'];
  $result = Mail::find_by_id($id);
  if($_POST['mark'] == 'read') {
	  if($result->status == 'read') {
		 echo 'done'; 
	  } else {
		 $result->status = 'read'; 
	  }
  } else {
	  $result->status = 'unread';
  }
  if($result->update()) echo 'done';
}
?>