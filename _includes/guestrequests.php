<?php

// This class requires the use of The database methods class
// This class uses the Late static binding supplied by PHP 5.3 and later 


require_once(LIB_PATH.DS."database.php");


class Requests extends DatabaseObject {
	
	// ************************ Class attributes starts here ************************ //

	public $id;
	public $room_number;
	public $created;
	public $request;

	protected static $table_name = "requests";
	protected static $db_fields = array('id', 'room_number', 'created', 'request');
	protected static $class_name = "Requests";
	
	public static function check($date, $room_number) {
		$sql = "SELECT * FROM " . self::$table_name . " WHERE created = '" . $date . "' AND room_number = '" . $room_number . "'";
		$result_array = self::find_by_sql($sql);
		return !empty($result_array) ? $result_array : false;
	}
}

?>