<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["id"])){
  header("Content-type: text/html; charset=utf-8");
  $activity = ActRecords::find_by_id($_POST["id"]);
  if($activity && $activity->delete()) {
	 echo 'done';
  }
}
?>