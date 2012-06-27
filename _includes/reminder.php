<?php

// This class requires the use of The database methods class
// This class uses the Late static binding supplied by PHP 5.3 and later 


require_once(LIB_PATH.DS."database.php");


class Reminder extends DatabaseObject {
	
	// ************************ Class attributes starts here ************************ //

	public $id;
	public $reminder;
	public $created;

	protected static $table_name = "reminders";
	protected static $db_fields = array('id', 'reminder', 'created');
	protected static $class_name = "Reminder";
	
	public static function check($date) {
		$sql = "SELECT * FROM " . self::$table_name . " WHERE created = '" . $date . "'";
		$result_array = self::find_by_sql($sql);
		return !empty($result_array) ? $result_array : false;
	}
		
}

?>