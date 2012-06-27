<?php

// This class requires the use of The database methods class
// This class uses the Late static binding supplied by PHP 5.3 and later 


require_once(LIB_PATH.DS."database.php");


class Activities extends DatabaseObject {
	
	// ************************ Class attributes starts here ************************ //

	public $id;
	public $activity;
	public $price;

	protected static $table_name = "activities";
	protected static $db_fields = array('id', 'activity', 'price');
	protected static $class_name = "Activities";
	
	public static function find_by_service($act) {
		global $database;
		$result_array = self::find_by_sql("SELECT * FROM " . self::$table_name . " WHERE activity = '" . $database->escape_value($act) . "' LIMIT 1");
		return !empty($result_array) ? array_shift($result_array) : false;
	}
	
}

?>