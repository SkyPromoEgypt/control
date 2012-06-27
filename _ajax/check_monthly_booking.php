<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["month"])){
  header("Content-type: text/html; charset=utf-8");
  $month = c2sdecrypt($_POST['month']);
  if(isset($_POST['year'])) {
	 $year = c2sdecrypt($_POST['year']);
  } else {
	 $year = date('Y');
  }
    if($month == '02') $columns = 29;
	elseif($month == '04' || $month == '06' || $month == '09' || $month == '11') $columns = 31;
	else $columns = 32;
	$rooms_count = RoomSetup::find_all();
	echo '<table id="chart">';
	echo '<tr><th>&nbsp;N/Date&nbsp;</th>';
	for($i = 1; $i < $columns; $i++) {
		$date = $year . '-' . $month . '-' . $i;
		echo '<th><a name="' . $date. '"></a>' . format_date($date) . '</th>';
	}
	echo '</tr>';
	foreach($rooms_count as $room) {
		echo '<tr><th>' . $room->room_number . '</th>';
		for($i = 1; $i < $columns; $i++) {
			$date = $year . '-' . $month . '-' . $i;
			$booking = Room::check_room($room->room_number, $date);
			if($booking->room_status == 'Closed') {
				$class = 'closed';
			} else {
				$class = 'booked';
			}
			echo '<td>';
			if(is_object($booking)) echo '<a id="' . $booking->booking_reference. '-' . $booking->room_status . '-' . $booking->arr_d . '-' . $booking->dep_d . '" href="javascript:void(0);" onmouseover="tip.show(event);"  onmouseout="tip.hide();" oncontextmenu="context.enableMenu(event);" ondblclick="booking.editBooking(event,' . $booking->booking_reference . ');" class="' . $class . ' context">' . $room->room_number . "-" . $booking->customer_name . '</a>';
			else  echo '<a href="javascript:void(0);" ondblclick="booking.addBooking(event,' . $room->room_number . ',\'' . $date . '\');" class="notbooked">' . $room->room_number . ' - ' . short_format_date($date) . '</a>';
			echo '</td>';
		}
		echo '</tr>';
	}
	echo '</table>';
}
?>