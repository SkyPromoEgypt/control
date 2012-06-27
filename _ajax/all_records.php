<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["offset"]) && isset($_POST['perpage'])){
	header("Content-type: text/html; charset=utf-8");
	$offset = $_POST['offset'];
	$perpage = $_POST['perpage'];
	$sql  = "SELECT * FROM room_records ";
	$sql .= "ORDER BY arr_d ASC ";
	$sql .= "LIMIT {$perpage} ";
	$sql .= "OFFSET {$offset}";
	$all = Room::find_by_sql($sql);
	if($all) {
		if(!isset($_POST['email'])) {
			echo '<table class="cusTable">';
			echo '<tr><th>Booking NO.</th><th>Room NO.</th><th>Customer Name</th><th>Arrival Date</th><th>Departure Date</th><th>Accommodation Days</th></tr>';
			foreach($all as $item) {
				echo '<tr><td>' . $item->booking_reference . '</td><td>' . $item->room_number . '</td><td>' . $item->customer_name . '</td><td>' . format_date($item->arr_d) . '</td><td>' . format_date($item->dep_d) . '</td><td>' . $item->days_accommodation . '</td></tr>';
			}
			echo '<table>';
		} else {
			echo '<table class="cusTable">';
			echo '<tr><th>Customer Name</th><th>Date of Birth</th><th>Nationality</th><th>Email</th><th>Telephone</th><th>vCard / Email</th></tr>';
			foreach($all as $item) {
				$file_name = $item->booking_reference . '_' . $item->customer_name;
				$file_location = '_directory/'.$file_name.'.vcf';
				vcard($file_name, $item->customer_name, $item->email, $item->phone);
				echo '<tr><td>' . $item->customer_name . '</td><td>' . format_date($item->dob) . '</td><td>' . $item->nationality . '</td><td>' . $item->email . '</td><td>' . $item->phone . '</td><td><a href="' . $file_location . '" title="Download vCard"><img src="_images/vcard.png" width="20" height="14" /></a><a href="mailto:' . $item->email . '" title="Send email to the customer">&nbsp;&nbsp;<img src="_images/email.gif" width="21" height="14" /></a></td><tr>';
			}
			echo '<table>';
			
		}
		
	}
}
?>