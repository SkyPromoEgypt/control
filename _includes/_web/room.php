<?php

// This class requires the use of The database methods class
// This class uses the Late static binding supplied by PHP 5.3 and later 


require_once(LIB_PATH.DS."database.php");


class Room extends DatabaseObject {
	
	// ************************ Class attributes starts here ************************ //
	public $room_number;
	public $room_status;
	public $booking_reference;
	public $booked_by;	
	public $customer_name;
	public $room_mates; 	
	public $email; 	
	public $nationality; 	
	public $booked_through; 	
	public $arr_d;	
	public $dep_d;
	public $room_price;
	public $season;
	public $discount;
	public $dob;
	public $passport;
	public $doe;
	public $boe;
	public $pov;
	public $pickup;
	public $rpickup;
	public $total_price;
	public $days_accommodation;
	public $profit; 	
	public $notes;
	
	protected static $table_name = "room_records";
	protected static $db_fields = array('room_number', 'room_status', 'booking_reference', 'booked_by', 'customer_name', 'room_mates', 'email', 'nationality',
										'booked_through','arr_d', 'dep_d', 'room_price', 'season', 'discount', 'dob', 'passport', 'doe', 'boe', 'pov', 'pickup', 'rpickup', 'total_price', 'days_accommodation', 'profit', 'notes');
	protected static $class_name = "Room";
	
	// ************************ Class attributes ends here ************************ //
	
	
	// ************************ Class methods starts here ************************ //
	// ************************ Format Methods ************************** //
	
	// Date format method
	private function format_date( $date = " " ) {
		$old_date = strtotime($date);
		$new_date = date('j/F/Y', $old_date);
		return $new_date;
	}
	
	// Convert date for clacualtion used in dateDiff() method
	private function convert( $date = " " ) {
		$old_date = strtotime($date);
		$new_date = strftime("%m/%d/%Y", $old_date);
		return $new_date;
	}
	
	// Calculate the difference between two days in numbers
	
	public function dateDiff($dformat, $endDate, $beginDate) {
		$endDate = $this->convert($endDate);
		$beginDate = $this->convert($beginDate);
  	    $date_parts1 = explode($dformat, $beginDate);
   	    $date_parts2 = explode($dformat, $endDate);
   	    $start_date = gregoriantojd($date_parts1[0], $date_parts1[1], $date_parts1[2]);
   	    $end_date = gregoriantojd($date_parts2[0], $date_parts2[1], $date_parts2[2]);
   	    return $end_date - $start_date;
	}
	// ************************ End of format methods ************************** //
	
	
	// ************************ Room status methods ************************ //
	
	// This method checks if the room is bookd or not and then returns and output
	// to the user telling him that the room is booked for Customer_name
	
	private function roomstatus($room_number){
	$sql = "SELECT * From " . self::$table_name . " where room_number = {$room_number}";
	$results = self::find_by_sql($sql);
		foreach($results as $result) {
			$date = strtotime(date('Y-m-d'));
			$arr_d = strtotime($result->arr_d);
			$dep_d = strtotime($result->dep_d);
			if(!empty($arr_d) && !empty($dep_d)){
				if(($date >= $arr_d) && ($date < $dep_d)){
					$output = "<td bgcolor=\"#FF0000\" title=\"Reserved to Mr/Mrs. {$result->customer_name}\"><p>&nbsp;&nbsp;{$room_number} Reserved from ";
					$output .= $result->format_date($result->arr_d) . " to " . $result->format_date($result->dep_d) . "</p></td>";
					
				}
			}
		}
		return $output;
	}
	
	// This method is used if roomstatus is bypassed to check if the room has any 
	// further bookings or free
	private function avialability_status($room_number){
		global $database;
		$sql = "SELECT * From " . self::$table_name . " where room_number = {$room_number} AND CURDATE() < arr_d ORDER BY arr_d LIMIT 1";
		$result = array_shift(self::find_by_sql($sql));
			if ($result) {
				$date = $result->format_date($result->arr_d);
				$output = "<td bgcolor=\"#999900\"><p>&nbsp;&nbsp;Room {$room_number} is Available until {$date}</p></td>";
			} else {
				$output = "<td bgcolor=\"#009900\"><p>&nbsp;&nbsp;Free and has no further booking</p></td>";	
			}
		return $output;
	}
	
	// This method shows the rooms status back to the user
	public static function show_room_status($room_number) {
		if(self::roomstatus($room_number)){ 
			$output  = self::roomstatus($room_number); 
		} else { 
			$output .= self::avialability_status($room_number); 
		}
		return $output;
	}
	
	public static function check_status($room_number) {
		if(self::roomstatus($room_number)) {
			return true;
		}
	}
	
	public static function check_room($room_number, $day) {
		$sql = "SELECT * From " . self::$table_name . " where room_number = {$room_number} AND arr_d <= '{$day}' AND dep_d > '{$day}' LIMIT 1";
		$result = array_shift(self::find_by_sql($sql));
		if($result) {
			return $result;
		} else {
			return "free";
		}
	}
	
	public static function get_monthly_booking($month, $year) {
		$sql  =  "SELECT * FROM " . self::$table_name . " WHERE arr_d >= '{$year}-{$month}-01' AND arr_d <= '{$year}-{$month}-31' ORDER BY arr_d ASC";
		$results = self::find_by_sql($sql);
		if($results) return $results;
	}
	
	public static function get_checkin() {
		$timezone = new DateTimeZone( "Africa/Cairo" );
		$date = new DateTime();
		$date->setTimezone( $timezone );
		$curr_date = $date->format( 'Y-m-d' );
		$sql = "SELECT * FROM " . self::$table_name . " WHERE arr_d = '{$curr_date}' ORDER BY room_number ASC";
		$results = self::find_by_sql($sql);
		if($results) return $results;
		
	}
	
	public static function get_checkout($bkref = '') {
		$timezone = new DateTimeZone( "Africa/Cairo" );
		$date = new DateTime();
		$date->setTimezone( $timezone );
		$curr_date = $date->format( 'Y-m-d' );
		if($date) {
			$sql = "SELECT * FROM " . self::$table_name . " WHERE booking_reference = '{$bkref}' LIMIT 1";
		} else {
			$sql = "SELECT * FROM " . self::$table_name . " WHERE dep_d = '{$curr_date}' ORDER BY room_number ASC";
		}
		$results = self::find_by_sql($sql);
		if($results) return $results;
		
	}
	// ************************ End of room status methods ************************ //
	
	
	// ************************ Booking conflicts methods ************************ //
	
	// Avoids booking override when creating a new record - case if dates overrides existing dates
	public function chkovrdbooking($room_number,$booking_reference,$arrday,$depday){
		if(!empty($booking_reference)) {
			$sql = "SELECT * From " . self::$table_name . " where room_number = {$room_number} AND booking_reference != {$booking_reference}";
		} else {
			$sql = "SELECT * From " . self::$table_name . " where room_number = {$room_number}";
		}
		$results = self::find_by_sql($sql);
		$arrdate = strtotime($arrday);
		$depdate = strtotime($depday);
		foreach($results as $result){
			$arr_d = strtotime($result->arr_d);
			$dep_d = strtotime($result->dep_d);
			if($arrdate >= $arr_d && $arrdate < $dep_d){
				$output = "New arrival date overrides booking " . $result->booking_reference . " of " . $result->customer_name;			
			}elseif($depdate > $arr_d && $depdate < $dep_d){
				$output = "New Departure date overrides booking " . $result->booking_reference . " of " . $result->customer_name;
			}
		}
		return $output;
	}
	
	// Avoids booking override when creating a new record - case if there is a booking 
	// exists between the new dates
	public function chkbookingwithin($id,$booking_reference,$arrday,$depday){
		if(!empty($booking_reference)) {
			$sql = "SELECT * From " . self::$table_name . " where room_number = {$id} AND booking_reference != {$booking_reference}";
		} else {
			$sql = "SELECT * From " . self::$table_name . " where room_number = {$id}";
		}
		$results = self::find_by_sql($sql);
		$arrdate = strtotime($arrday);
		$depdate = strtotime($depday);
		foreach($results as $result){
			$arr_d = strtotime($result->arr_d);
			if($arr_d > $arrdate && $arr_d < $depdate){
				$output = "Booking overrides booking " . $result->booking_reference . " of " . $result->customer_name;
			}
		}
		return $output;
	}

	// Extending a one day booking - check if the booking is a one day booking
	public function ext1daybooking($booking_reference){
		$result = find_by_ref($booking_reference);
		$dd = dateDiff("/", $result->dep_d, $result->arr_d);
		if($dd == 1){
			return true;
		}
	}
	
	// ************************ End of Booking conflicts methods ************************ //
	
	
	// ************************ Database Related Methods *****************************//
	
	public static function find_by_ref( $ref = 0 ) {
		global $database;
		$result_array = self::find_by_sql("SELECT * FROM " . self::$table_name . " WHERE booking_reference = " . $database->escape_value($ref) . " LIMIT 1");
		return !empty($result_array) ? array_shift($result_array) : false;
	}
	
	public static function find_by_room( $room = 0 ) {
		global $database;
		$result_array = self::find_by_sql("SELECT * FROM " . self::$table_name . " WHERE room_number = " . $database->escape_value($room));
		return !empty($result_array) ? $result_array : false;
	}
	
	public static function count_bookings($room, $month, $year) {
		$start = "$year-$month-01";
		$end = "$year-$month-31";
		$sql = "SELECT booking_reference FROM room_records WHERE room_number = '$room' ";
		$sql .= "AND arr_d >='" . $start . "'";
		$sql .= "AND dep_d <='" . $end . "'";
		$results = self::find_by_sql($sql);
		return (!empty($results)) ? $results : false;
	}
	
	public function delete_booking() {
		global $database;
		// Don't forget your sql syntax and good habits:
		// - DELETE FROM table WHERE CONDITION LIMIT 1 
		// - escape all values to prevent sql injection 
		// - Use LIMIT 1
		$sql  = "DELETE FROM " . self::$table_name;
		$sql .= " WHERE booking_reference = " . $database->escape_value($this->booking_reference);
		$sql .= " LIMIT 1";
		$database->query($sql);
		return ($database->affected_rows() == 1) ? true : false;
	}
	
	public function update_booking() {
		global $database;
		// Don't forget your sql syntax and good habits:
		// - UPDATE table SET key='value', key='value' WHERE CONDITION
		// - single-quotes arround all the values 
		// - escape all values to prevent sql injection 
		$attributes = $this->sanitized_attributes();
		$attribute_pairs = array();
		foreach($attributes as $attribute => $value) {
			$attribute_pairs[] = "{$attribute} = '{$value}'";
		}
		$sql  = "UPDATE " . self::$table_name . " SET ";
		$sql .= join(", ", $attribute_pairs);
		$sql .= " WHERE booking_reference = " . $database->escape_value($this->booking_reference);
		$database->query($sql);
		return ($database->affected_rows() == 1) ? true : false;
	}
	
	// Common database methods
	public static function find_all() {
		return self::find_by_sql("SELECT * FROM " . self::$table_name);
	}
	
	public static function find_by_id( $id = 0 ) {
		global $database;
		$result_array = self::find_by_sql("SELECT * FROM " . self::$table_name . " WHERE id = " . $database->escape_value($id) . " LIMIT 1");
		return !empty($result_array) ? array_shift($result_array) : false;
	}
	
	public static function find_by_sql( $sql = "" ) {
		global $database;
		$result_set = $database->query($sql);
		$object_array = array();
		while($row = $database->fetch_array($result_set)) {
			$object_array[] = self::instantiate($row);
		}
		return $object_array;
	}

	private static function instantiate($record) {
		// check that $record exists and is an array;
		// simple, long-form approach;
		$object = new self;
		//$object->id 				= $record['id'];
		//$object->username 		= $record['username'];
		//$object->password 		= $record['password'];
		//$object->first_name       = $record['first_name'];
		//$object->last_name 		= $record['last_name'];
		
		// more dynamic short-form approatch
		foreach($record as $attribute => $value) {
			if($object->has_attribute($attribute)) {
				$object->$attribute = $value;
			}
		}
		return $object;
	}
	
	private function has_attribute($attribute) {
		$object_vars = $this->attributes();
		return array_key_exists($attribute, $object_vars);
	}
	
	protected function attributes() {
		$attributes = array();
		foreach(self::$db_fields as $field) {
			if(property_exists($this, $field)) {
				$attributes[$field] = $this->$field;
			}
		}
		return $attributes;
	}
	
	protected function sanitized_attributes() {
		global $database;
		$clean_attributes = array();
		foreach($this->attributes() as $key => $value) {
			$clean_attributes[$key] = $database->escape_value($value);
		}
		return $clean_attributes;
	}
	
	public function save() {
		return isset($this->id) ? $this->update() : $this->create();
	}
	
	public function create() {
		global $database;
		// Don't forget your sql syntax and good habits:
		// - INSERT INTO table (key, key) VALUES ('value', 'value')
		// - single-quotes arround all the values 
		// - escape all values to prevent sql injection 
		$attributes = $this->sanitized_attributes();
		$sql  = "INSERT INTO " . self::$table_name . " (";
		$sql .= join(", ", array_keys($attributes));
		$sql .= ") VALUES ('";
		$sql .= join("', '", array_values($attributes));
		$sql .= "')";
		if($database->query($sql)) {
			$this->id = $database->insert_id();
			$this->booking_reference = $database->insert_id();
			return true;
		} else {
			return false;
		}
	}
	
	public function update() {
		global $database;
		// Don't forget your sql syntax and good habits:
		// - UPDATE table SET key='value', key='value' WHERE CONDITION
		// - single-quotes arround all the values 
		// - escape all values to prevent sql injection 
		$attributes = $this->sanitized_attributes();
		$attribute_pairs = array();
		foreach($attributes as $attribute => $value) {
			$attribute_pairs[] = "{$attribute} = '{$value}'";
		}
		$sql  = "UPDATE " . self::$table_name . " SET ";
		$sql .= join(", ", $attribute_pairs);
		$sql .= " WHERE id = " . $database->escape_value($this->id);
		$database->query($sql);
		return ($database->affected_rows() == 1) ? true : false;
	}
	
	public function delete() {
		global $database;
		// Don't forget your sql syntax and good habits:
		// - DELETE FROM table WHERE CONDITION LIMIT 1 
		// - escape all values to prevent sql injection 
		// - Use LIMIT 1
		$sql  = "DELETE FROM " . self::$table_name;
		$sql .= " WHERE id = " . $database->escape_value($this->id);
		$sql .= " LIMIT 1";
		$database->query($sql);
		return ($database->affected_rows() == 1) ? true : false;
	}
	
		public function notify($id, $room, $name, $rmates, $email, $nationality, $arrdate, $depdate, $bksource, $price, $season, $discount, $dob, $pass, $doe, $boe, $pov, $pickup, $rpickup, $notes) {
		// Building the html email  
		$services = ActRecords::find_by_ref($id); 
		$body = "<html>
				<head>
				<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
				<title>Customer Voucher</title>
				<style type=\"text/css\">@import URL('http://www.dahabtech.com/test/hotel/_css/bookingcss.css');</style>
				</head>
				<body>
				<div id=\"results\">
				<img src=\"http://www.dahabtech.com/test/hotel/_images/logo.png\" style=\"margin-bottom:25px;\" />
				<h1>Customer Voucher # HBS-PNG-" . $id . "</h1>
				<p>Please hand this copy of the voucher to the reception operator upon your arrival:</p>";
		 
		$body .= '<table>
		<tr><th>Assigned Room #</th><td>' . $room . '</td></tr>
		<tr><th>Customer Name</th><td>' . $name . '</td></tr>
		<tr><th>Room Mates</th><td>' . $rmates . '</td></tr>
		<tr><th>E-mail</th><td>' . $email . '</td></tr>
		<tr><th>Country</th><td>' . $nationality . '</td></tr>
		<tr><th>Arrival Date</th><td>' . $arrdate . '</td></tr>
		<tr><th>Departure Date</th><td>' . $depdate . '</td></tr>
		<tr><th>Booking Source</th><td>' . $bksource . '</td></tr>
		<tr><th>Room Price Per Night</th><td>' . $price . '</td></tr>
		<tr><th>Season Time</th><td>' . $season . '</td></tr>
		<tr><th>Disount Given</th><td>' . $discount . '</td></tr>
		<tr><th>Date of Birth</th><td>' . $dob . '</td></tr>
		<tr><th>Passport #</th><td>' . $pass . '</td></tr>
		<tr><th>Egypt Date of Entry</th><td>' . $doe . '</td></tr>
		<tr><th>Egypt Border of Entry</th><td>' . $boe . '</td></tr>
		<tr><th>Period of Visa</th><td>' . $pov . '</td></tr>
		<tr><th>Requested Services</th><td>';
		$output ='';
		if($services) {
			foreach($services as $service) {
				$output .= $service->pax . ' PAX ' . $service->activity . ', ';
			}
		}
		$body .= $output . '</td></tr>
		<tr><th>Request a Pickup from Airport</th><td>' . $pickup . '</td></tr>
		<tr><th>Request a Return Transfer to Airport</th><td>' . $rpickup . '</td></tr>
		<tr><th>Additional Requests</th><td>' . $notes . '</td></tr>
		</table>
		';
			
		$body .= "</div>
		          </body>
				  </html>";
		
		// Building sys mail body
		
		$sysbody = "<div id=\"results\">
		<img src=\"http://www.dahabtech.com/test/hotel/_images/logo.png\" style=\"margin-bottom:25px;\" />
				<h1>Customer Voucher # HBS-PNG-" . $id . "</h1>
				<p>&nbsp;</p>";
		 
		$sysbody .= '<table>
		<tr><th>Assigned Room #</th><td>' . $room . '</td></tr>
		<tr><th>Customer Name</th><td>' . $name . '</td></tr>
		<tr><th>Room Mates</th><td>' . $rmates . '</td></tr>
		<tr><th>E-mail</th><td>' . $email . '</td></tr>
		<tr><th>Country</th><td>' . $nationality . '</td></tr>
		<tr><th>Arrival Date</th><td>' . $arrdate . '</td></tr>
		<tr><th>Departure Date</th><td>' . $depdate . '</td></tr>
		<tr><th>Booking Source</th><td>' . $bksource . '</td></tr>
		<tr><th>Room Price Per Night</th><td>' . $price . '</td></tr>
		<tr><th>Season Time</th><td>' . $season . '</td></tr>
		<tr><th>Disount Given</th><td>' . $discount . '</td></tr>
		<tr><th>Date of Birth</th><td>' . $dob . '</td></tr>
		<tr><th>Passport #</th><td>' . $pass . '</td></tr>
		<tr><th>Egypt Date of Entry</th><td>' . $doe . '</td></tr>
		<tr><th>Egypt Border of Entry</th><td>' . $boe . '</td></tr>
		<tr><th>Period of Visa</th><td>' . $pov . '</td></tr>
		<tr><th>Requested Services</th><td>';
		$output ='';
		if($services) {
			foreach($services as $service) {
				$output .= $service->pax . ' PAX ' . $service->activity . ', ';
			}
		}
		$sysbody .= $output . '</td></tr>
		<tr><th>Request a Pickup from Airport</th><td>' . $pickup . '</td></tr>
		<tr><th>Request a Return Transfer to Airport</th><td>' . $rpickup . '</td></tr>
		<tr><th>Additional Requests</th><td>' . $notes . '</td></tr>
		</table>
		';
			
		$sysbody .= "</div>";
		
		
		// change this to the email that you want the server to send from and to	
		$system_email = "info@dahabtech.com";
		$from = $email;
		$to = $system_email; 
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		$headers .= 'From: Hotel Booking System<' . $system_email . '>' . "\r\n";
		$subject = "Booking Confirmation - Your Customer Voucher";  // subject of the email that will be send to you
		
		// sending mail and confirm then set a successful or failure message
		$send = mail($to, $subject, $body, $headers);
		$send2 = mail($from, $subject, $body, $headers);
		
		if($send && $send2) {
			return $sysbody;
		}
	}
}
?>