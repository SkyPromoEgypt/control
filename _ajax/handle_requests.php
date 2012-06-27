<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["get"])){
	header("Content-type: text/html; charset=utf-8");
	$date = getToday();
	$room_number = $_POST['room'];
	$rems = Requests::check($date, $room_number);
	foreach($rems as $rem) {
		echo '<a href="#" class="remItem" onClick="req.view(event, ' . $rem->id . ', ' . $rem->room_number . ', \'' . $rem->created . '\', \'' . $rem->request . '\');">' . $rem->request . '</a>';
	}
} else if(isset($_POST["new"]) && isset($_POST["created"])) {
	$rem = new Requests();
	$rem->room_number = $_POST['room'];
	$rem->created = $_POST['created'];
	$rem->request = $_POST['request'];
	if($rem->create()) {
		echo 'done';
	}
} else if(isset($_POST["update"]) && isset($_POST["id"])) {
	$rem = Requests::find_by_id($_POST['id']);
	$rem->created = $_POST['created'];
	$rem->request = $_POST['request'];
	if($rem->update()) {
		echo 'done';
	}
} else if(isset($_POST["delete"]) && isset($_POST["id"])) {
	$rem = Requests::find_by_id($_POST['id']);
	if($rem->delete()) {
		echo 'done';
	}
} else if(isset($_POST['count'])) {
	$count = 0;
	$date = getToday();
	$rooms = RoomSetup::find_all();
	if($rooms) {
		foreach($rooms as $room) {
			if($rems = Requests::check($date, $room->room_number)) {
				$count += count($rems);
			}
		}
	}
	echo $count;
}
?>