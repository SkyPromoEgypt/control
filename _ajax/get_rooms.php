<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["rooms"])){
	header("Content-type: text/html; charset=utf-8");
	$rooms = RoomSetup::find_all();
	foreach($rooms as $room) {
		echo '<a class="roomitem" href="#" onclick="settings.getRoom(event,' . $room->room_number . ');">' . $room->room_number . '</a>';
	}
}
?>