<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["bkref"])){
  header("Content-type: text/html; charset=utf-8");
  $bkref = $_POST['bkref'];
  $activity = new ActRecords();
  $activity->bkref = $_POST['bkref'];
  $activity->activity = $_POST['service'];
  $activity->pax = $_POST['pax'];
  if(isset($_POST['price'])) {
	 $activity->price = $_POST['price'] * $activity->pax;
  } else {
	 $result = Activities::find_by_service($_POST['service']);
	 $price = $result->price;
	 $activity->price = $price * $activity->pax;
  }
  
  if($activity->create()) {
	 echo 'done'; 
  }
}
if(isset($_POST["id"])){
  header("Content-type: text/html; charset=utf-8");
  $activity = ActRecords::find_by_id($_POST["id"]);
  $activity->pax = $_POST['pax'];
  if(isset($_POST['price'])) {
	 $activity->price = $_POST['price'] * $activity->pax;
  } else {
	 $result = Activities::find_by_service($activity->activity);
	 $price = $result->price;
	 $activity->price = $price * $activity->pax;
  }
  
  if($activity->update()) {
	 echo 'done'; 
  }
}
?>