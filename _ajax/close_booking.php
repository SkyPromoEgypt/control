<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["bkref"])){
  header("Content-type: text/html; charset=utf-8");
  $bkref = $_POST['bkref'];
  $result = Room::find_by_ref($bkref);
  $arr_date = $result->arr_d;
  $dep_date = $result->dep_d;
  $today = getToday();
  if($today >= $arr_date && $today < $dep_date) {
	 echo 'You cannot close a working booking';
  } else if($arr_date > $today) {
	 echo 'You cannot close an upcoming booking';
  } else {
	 if(isset($_POST['status'])) {
		 $status = $_POST['status'];
		 if(!$_POST['control'] && $result->room_status == 'Closed') {
			 echo 'Booking is already closed';
		 } else {
			 if($status == 'open') {
				  $result->room_status = 'Opened';
				  if($result->update_booking()) {
					 echo 'done'; 
				 }
			  } else if($status == 'close') {
				  $result->room_status = 'Closed';
				  if($result->update_booking()) {
					 echo 'done'; 
				 }
			  }
		 } 
	  } 
  }
}
?>