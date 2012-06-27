<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["roomNumber"])){
  header("Content-type: text/xml; charset=utf-8");
  $number = $_POST['roomNumber'];
  $result = RoomSetup::find_by_room($number);
  echo '<?xml version="1.0" encoding="utf-8"?>';
  echo '<room>';
	  foreach($result as $tag => $value) {
		 echo '<' . $tag . '>';
		 echo $value;
		 echo '</' . $tag . '>';
	  }
  echo '</room>';
}
?>