<?php require_once('../_includes/initialize.php'); ?>
<?php

	if(isset($_POST["bkref"]) && isset($_POST["arr_d"]) && isset($_POST["dep_d"])) {
		
		header("Content-type: text/html; charset=utf-8");
		
		$booking = Room::find_by_ref($_POST['bkref']);
		
		$booking->arr_d = $_POST['arr_d'];	
		$booking->dep_d = $_POST['dep_d'];

		if($booking->chkbookingwithin($booking->room_number, $booking->booking_reference, $booking->arr_d, $booking->dep_d)) {
			echo $booking->chkbookingwithin($booking->room_number, $booking->booking_reference, $booking->arr_d, $booking->dep_d);
		} elseif($booking->chkovrdbooking($booking->room_number, $booking->booking_reference, $booking->arr_d, $booking->dep_d)) {
			echo $booking->chkovrdbooking($booking->room_number, $booking->booking_reference, $booking->arr_d, $booking->dep_d);
		} else {
			echo "done";
			$booking->update_booking();
		}
	}
	
?>
