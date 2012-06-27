<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["types"])){
	header("Content-type: text/html; charset=utf-8");
	$types = RoomTypes::find_all();
	foreach($types as $type) {
		echo '<a class="typeitem" href="#" onclick="settings.getType(event,' . $type->id . ');">' . $type->room_type . '</a>';
	}
}
?>