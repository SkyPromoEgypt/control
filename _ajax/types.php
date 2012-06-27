<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["id"])){
  header("Content-type: text/html; charset=utf-8");
  if(isset($_POST['create'])) {
	  $type = new RoomTypes();
	  $type->room_type = $_POST['typeName'];
	  if($type->create()) {
		 echo 'done'; 
	  }
  } else if(isset($_POST['update'])) {
	  $type = RoomTypes::find_by_id($_POST["id"]);
	  $type->room_type = $_POST['typeName'];
	  if($type->update()) {
		 echo 'done'; 
	  }
  } else {
	  $type = RoomTypes::find_by_id($_POST["id"]);
	  if($type->delete()) {
		  echo 'done';
	  }
  }
}
?>