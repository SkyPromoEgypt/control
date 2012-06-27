<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["roomNumber"])){
  header("Content-type: text/html; charset=utf-8");
  if(isset($_POST['create'])) {
	  $room = new RoomSetup();
	  $room->room_number = $_POST["roomNumber"];
	  $room->room_type = $_POST["roomType"];
	  $room->room_cat = $_POST["roomCat"];
	  $room->room_price = $_POST["nPrice"];
	  $room->local_price = $_POST["lPrice"];
	  $room->high_price = $_POST["hPrice"];
	  if($room->create()) {
		 echo 'done'; 
	  }
  } else if(isset($_POST['update'])) {
	  $room = RoomSetup::find_by_room($_POST["roomNumber"]);
	  $room->room_type = $_POST["roomType"];
	  $room->room_cat = $_POST["roomCat"];
	  $room->room_price = $_POST["nPrice"];
	  $room->local_price = $_POST["lPrice"];
	  $room->high_price = $_POST["hPrice"];
	  if($room->update_room()) {
		 echo 'done'; 
	  }
  } else {
	  $room = RoomSetup::find_by_room($_POST["roomNumber"]);
	  if(isset($_POST['record'])) {
		  $results = Room::find_by_room($_POST["roomNumber"]);
		  if($results) {
			 foreach($results as $result) {
				 $result->delete_booking();
			 }
		  }
		  if($room->delete_room()) {
			 echo 'done'; 
	 	  }
	  } else {
		  if($room->delete_room()) {
			 echo 'done'; 
	 	  }
	  } 
  }
}
?>