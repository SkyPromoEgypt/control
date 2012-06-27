<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["checkout"])){
	header("Content-type: text/html; charset=utf-8");
    $checkout = Room::get_checkout();
	if(count($checkout) == 0) {
		echo 'No Check Out for Today';
	} else {
		foreach($checkout as $item) {
			if($item->room_status == 'Closed') {
				echo 'HBS-PNG-' . $item->booking_reference . ' | ' . $item->room_number . ' | ' . $item->customer_name . ' | Payment Done ' . '<br />';
			} else {
				echo 'HBS-PNG-' . $item->booking_reference . ' | ' . $item->room_number . ' | ' . $item->customer_name . ' <a href="#" onclick="billing.getBooking(event,' . $item->booking_reference . ');">View Bill</a>' . '<br />';
			}
			
		}
	}
} else if(isset($_POST["bkref"])){
	header("Content-type: text/html; charset=utf-8");
    $checkout = Room::get_checkout($_POST['bkref']);
	if(count($checkout) == 0) {
		echo 'No Check Out for Today';
	} else {
		foreach($checkout as $item) {
			echo 'HBS-PNG-' . $item->booking_reference . ' | ' . $item->room_number . ' | ' . $item->customer_name . ' <a href="#" onclick="billing.getBooking(event,' . $item->booking_reference . ');">View Bill</a>' . '<br />';
		}
	}
}
?>