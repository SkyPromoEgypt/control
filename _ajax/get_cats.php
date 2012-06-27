<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["cats"])){
	header("Content-type: text/html; charset=utf-8");
	$cats = RoomCats::find_all();
	foreach($cats as $cat) {
		echo '<a class="catitem" href="#" onclick="settings.getCat(event,' . $cat->id . ');">' . $cat->room_cat . '</a>';
	}
}
?>