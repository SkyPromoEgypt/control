<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["id"])){
  header("Content-type: text/html; charset=utf-8");
  if(isset($_POST['create'])) {
	  $cat = new RoomCats();
	  $cat->room_cat = $_POST['catName'];
	  if($cat->create()) {
		 echo 'done'; 
	  }
  } else if(isset($_POST['update'])) {
	  $cat = RoomCats::find_by_id($_POST["id"]);
	  $cat->room_cat = $_POST['catName'];
	  if($cat->update()) {
		 echo 'done'; 
	  }
  } else {
	  $cat = RoomCats::find_by_id($_POST["id"]);
	  if($cat->delete()) {
		  echo 'done';
	  }
  }
}
?>