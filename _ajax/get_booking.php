<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["bkref"])){
  header("Content-type: text/xml; charset=utf-8");
  $bkref = $_POST['bkref'];
  $result = Room::find_by_ref($bkref);
  echo '<?xml version="1.0" encoding="utf-8"?>';
  echo '<booking>';
	  foreach($result as $tag => $value) {
		 echo '<' . $tag . '>';
		 echo $value;
		 echo '</' . $tag . '>';
	  }
  echo '</booking>';
}
?>