<?php require_once('../_includes/initialize.php'); ?>
<?php
	
	$strings = array('customer_name', 'room_number', 'nationality', 'passport', 'booking_reference');
	$dates = array('arr_d', 'dep_d');
	$sent_strings = array();
	$date_fields = array();
	$sql;
	
	foreach($strings as $string) {
		if(isset($_POST[$string])) {
			$sent_strings[] = $string;
		}
	}
	
	foreach($dates as $date) {
		if(isset($_POST[$date])) {
			$date_fields[] = $date;
		}
	}
	
	if(count($sent_strings) > 0) {
		if(count($sent_strings) == 1) {
			$sql = "SELECT * FROM room_records WHERE " . $sent_strings[0] . " LIKE '%" . trim($_POST[$sent_strings[0]]) . "%'";
		} else {
			$sql = "SELECT * FROM room_records WHERE ";
			for($i = 0; $i<count($sent_strings); $i++) {
				if($i == (count($sent_strings)-1)) {
					$sql .= $sent_strings[$i] . " LIKE '%" . trim($_POST[$sent_strings[$i]]) . "%'";
				} else {
					$sql .= $sent_strings[$i] . " LIKE '%" . trim($_POST[$sent_strings[$i]]) . "%' AND ";
				}
			}
		}
		
		if(count($date_fields) > 0) {
			if(count($date_fields) == 1) {
				$sql .= " AND " . $date_fields[0] ."='" . trim($_POST[$date_fields[0]]) . "'";
			} else {
				$sql .= " AND arr_d>='" . trim($_POST['arr_d']) . "' AND dep_d<='" . trim($_POST['dep_d']) . "'";
			}
		}
	} else {
		if(count($date_fields) > 0) {
			if(count($date_fields) == 1) {
				$sql = "SELECT * FROM room_records WHERE " . $date_fields[0] ."='" . trim($_POST[$date_fields[0]]) . "'";
			} else {
				$sql = "SELECT * FROM room_records WHERE arr_d>='" . trim($_POST['arr_d']) . "' AND dep_d<='" . trim($_POST['dep_d']) . "'";
			}
		}
	}
	
	$sql .= " ORDER BY arr_d ASC";
	$results = Room::find_by_sql($sql);
	
	if($results) {
		echo '<p class="red">Search found ' . count($results) . ' ';
		if(count($results) > 1) echo 'results'; else echo 'result';
		echo '</p><br />';
		foreach($results as $result) {
			$output = '<div class="availableResults"><p>Booknig#: <span class="red">' . $result->booking_reference . '</span> | ';
			if(isset($_POST['room_number'])) {
				$output .= '<span class="red">';
			}
			$output .= $result->room_number . ' ';
			if(isset($_POST['room_number'])) {
				$output .= '</span>';
			}
			$output .= '| ';
			if(isset($_POST['customer_name'])) {
				$output .= '<span class="red">';
			}
			$output .= $result->customer_name . ' ';
			if(isset($_POST['customer_name'])) {
				$output .= '</span>';
			}
			$output .= '| From ';
			if(isset($_POST['arr_d'])) {
				$output .= '<span class="red">';
			}
			$output .= format_date($result->arr_d) . ' ';
			if(isset($_POST['arr_d'])) {
				$output .= '</span>';
			}
			$output .= '| To ';
			if(isset($_POST['dep_d'])) {
				$output .= '<span class="red">';
			}
			$output .= format_date($result->dep_d) . ' ';
			if(isset($_POST['dep_d'])) {
				$output .= '</span>';
			}
			$output .= '| <a href="#" onclick="Search.showBooking(event,' . $result->booking_reference . ');">more..</a></p></div>';
			echo $output;
		}
	} else {
		echo '<div class="availableResults"><p>Sorry no results found.</p></div>';
	}
	
?>