<?php require_once('../_includes/initialize.php'); ?>
<?php 

if(isset($_POST['bkref'])) {
	$bkref = $_POST['bkref'];
	// getting the room 
	$booking = Room::find_by_ref($bkref);
	if($booking && $booking->delete_booking()) {
		// getting the activities
		$results = ActRecords::find_by_ref($bkref);
		if($results) {
			foreach($results as $result) {
				$activity = ActRecords::find_by_id($result->id);
				$activity->delete();
			}
		}
		echo 'deleted';
	}
}
?>