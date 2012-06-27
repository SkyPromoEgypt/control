<?php require_once('../_includes/initialize.php'); ?>
<?php
	
	$strings = array('customer_name', 'room_number', 'nationality', 'passport');
	$dates = array('arr_d', 'dep_d');
	$sent_strings = array();
	$date_fields = array();
	$sql;
	
	foreach($strings as $string) {
		if(isset($_GET[$string])) {
			$sent_strings[] = $string;
		}
	}
	
	foreach($dates as $date) {
		if(isset($_GET[$date])) {
			$date_fields[] = $date;
		}
	}
	
	if(count($sent_strings) > 0) {
		if(count($sent_strings) == 1) {
			$sql = "SELECT * FROM room_records WHERE " . $sent_strings[0] . " LIKE '%" . $_GET[$sent_strings[0]] . "%'";
		} else {
			$sql = "SELECT * FROM room_records WHERE ";
			for($i = 0; $i<count($sent_strings); $i++) {
				if($i == (count($sent_strings)-1)) {
					$sql .= $sent_strings[$i] . " LIKE '%" . $_GET[$sent_strings[$i]] . "%'";
				} else {
					$sql .= $sent_strings[$i] . " LIKE '%" . $_GET[$sent_strings[$i]] . "%' AND ";
				}
			}
		}
		
		if(count($date_fields) > 0) {
			if(count($date_fields) == 1) {
				$sql .= " AND " . $date_fields[0] ."='" . $_GET[$date_fields[0]] . "'";
			} else {
				$sql .= " AND arr_d>='" . $_GET['arr_d'] . "' AND arr_d<='" . $_GET['dep_d'] . "'";
			}
		}
	} else {
		if(count($date_fields) > 0) {
			if(count($date_fields) == 1) {
				$sql = "SELECT * FROM room_records WHERE " . $date_fields[0] ."='" . $_GEt[$date_fields[0]] . "'";
			} else {
				$sql = "SELECT * FROM room_records WHERE arr_d>='" . $_GET['arr_d'] . "' AND dep_d<='" . $_GET['dep_d'] . "'";
			}
		}
	}
	
	$results = Room::find_by_sql($sql);
	
	if($results) {
		echo '<p>Search found ' . count($results) . ' ';
		if(count($results) > 1) echo 'results'; else echo 'result</p>';
		foreach($results as $result) {
			echo '<div class="availableResults"><p>Booknig#: ' .  $result->booking_reference . ' | Room#: ' . $result->room_number . ' | Name: ' . $result->customer_name . ' | From: ' . $result->arr_d .  ' | To: ' . $result->dep_d .  '</p></div>';
		}
	} else {
		echo '<div class="availableResults"><p>SOrry no results found.</p></div>';
	}
	
?>