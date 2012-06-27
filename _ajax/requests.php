<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["req"])){
	
	header("Content-type: text/html; charset=utf-8");
	$today = getToday();
	
	$rooms = RoomSetup::find_all();
	
	echo '<div class="tblrooms">';
	
	if($rooms) {
		foreach($rooms as $room) {
			if(Requests::check($today, $room->room_number)) {
				echo '<a class="tblroomItem roomReq" href="#" onClick="req.getRequests(event, ' . $room->room_number . ');">' . $room->room_number . '</a>';
			} else {
				echo '<a class="tblroomItem" href="#" onClick="req.setRequest(event, ' . $room->room_number . ');">' . $room->room_number . '</a>';
			}
			
		}
	}

	echo '</div>';
}
?>