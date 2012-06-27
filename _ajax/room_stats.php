<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST['roomStats'])) {
	header("Content-type: text/html; charset=utf-8");	
	$month = $_POST['month'];
	$year = $_POST['year'];
	$rooms = RoomSetup::find_all();
	$total = 0;
	if($rooms) {
		echo '<table class="cusTable">';
		echo '<tr><th>Room Number</th><th>Assigned Bookings</th><th>Count</th></tr>';
		foreach($rooms as $room) {
			$bookings = Room::count_bookings($room->room_number, $month, $year);
			echo '<tr>';
			echo '<th>' . $room->room_number . '</th>';
			echo '<td>';
			if($bookings) {
				foreach($bookings as $booking) {
					echo '<a class="roomStatItem" href="#" onClick="rStat.show(event, ' . $booking->booking_reference . ');">' . $booking->booking_reference . '</a>';
				}
			} else {
				echo 'No bookings availabls';
			}
			echo '</td>';
			echo '<td>';
			if($bookings) {
				echo count($bookings);
				$total += count($bookings);
			} else {
				echo 0;
			}
			echo '</td>';
			echo '</tr>';
		}
		echo '<tr><th></th><th>Total Bookings</th><th>'. $total . '</th></tr>';
		echo '</table>';
	} else {
		echo "Sorry you don't have any rooms available in your records";
	}
}
?>