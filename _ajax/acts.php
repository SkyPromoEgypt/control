<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["id"])){
  header("Content-type: text/html; charset=utf-8");
  if(isset($_POST['create'])) {
	  $act = new Activities();
	  $act->activity = $_POST['actName'];
	  $act->price = $_POST['actPrice'];
	  if($act->create()) {
		 echo 'done'; 
	  }
  } else if(isset($_POST['update'])) {
	  $act = Activities::find_by_id($_POST["id"]);
	  $act->activity = $_POST['actName'];
	  $act->price = $_POST['actPrice'];
	  if($act->update()) {
		 echo 'done'; 
	  }
  } else {
	  $act = Activities::find_by_id($_POST["id"]);
	  if($act->delete()) {
		  echo 'done';
	  }
  }
}
?>