<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["acts"])){
	header("Content-type: text/html; charset=utf-8");
	$acts = Activities::find_all();
	foreach($acts as $act) {
		echo '<a class="actitem" href="#" onclick="settings.getAct(event,' . $act->id . ');">' . $act->activity . '</a>';
	}
}
?>