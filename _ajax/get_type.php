<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["id"])){
  header("Content-type: text/xml; charset=utf-8");
  $id = $_POST['id'];
  $result = RoomTypes::find_by_id($id);
  echo '<?xml version="1.0" encoding="utf-8"?>';
  echo '<type>';
	  foreach($result as $tag => $value) {
		 echo '<' . $tag . '>';
		 echo $value;
		 echo '</' . $tag . '>';
	  }
  echo '</type>';
}
?>