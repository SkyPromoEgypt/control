<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["id"])){
  header("Content-type: text/xml; charset=utf-8");
  $id = $_POST['id'];
  $act = Activities::find_by_id($id);
  echo '<?xml version="1.0" encoding="utf-8"?>';
  echo '<act>';
	  foreach($act as $tag => $value) {
		 echo '<' . $tag . '>';
		 echo $value;
		 echo '</' . $tag . '>';
	  }
  echo '</act>';
}
?>