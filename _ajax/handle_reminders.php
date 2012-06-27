<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["date"])){
	$date = $_POST["date"];
	header("Content-type: text/html; charset=utf-8");
	$rems = Reminder::check($date);
	foreach($rems as $rem) {
		echo '<a href="#" class="remItem" onClick="rem.getRem(event, ' . $rem->id . ', \'' . $rem->created . '\', \'' . $rem->reminder . '\');">' . $rem->reminder . '</a>';
	}
} else if(isset($_POST["new"]) && isset($_POST["created"])) {
	$rem = new Reminder();
	$rem->created = $_POST['created'];
	$rem->reminder = $_POST['reminder'];
	if($rem->create()) {
		echo 'done';
	}
} else if(isset($_POST["update"]) && isset($_POST["id"])) {
	$rem = Reminder::find_by_id($_POST['id']);
	$rem->created = $_POST['created'];
	$rem->reminder = $_POST['reminder'];
	if($rem->update()) {
		echo 'done';
	}
} else if(isset($_POST["delete"]) && isset($_POST["id"])) {
	$rem = Reminder::find_by_id($_POST['id']);
	if($rem->delete()) {
		echo 'done';
	}
} else if(isset($_POST['count']) && isset($_POST["day"])) {
	if($rems = Reminder::check($_POST["day"])) {
		echo count($rems);
	} else {
		echo 0;
	}
}
?>