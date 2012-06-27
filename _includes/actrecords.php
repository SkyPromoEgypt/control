<?php

// This class requires the use of The database methods class
// This class uses the Late static binding supplied by PHP 5.3 and later 


require_once(LIB_PATH.DS."database.php");


class ActRecords extends DatabaseObject {
	
	// ************************ Class attributes starts here ************************ //

	public $id;
	public $bkref;
	public $activity;
	public $pax;
	public $price;

	protected static $table_name = "act_records";
	protected static $db_fields = array('id', 'bkref', 'activity', 'pax', 'price');
	protected static $class_name = "ActRecords";
	
	public static function find_by_ref( $ref = 0 ) {
		global $database;
		$result_array = self::find_by_sql("SELECT * FROM " . self::$table_name . " WHERE bkref = " . $database->escape_value($ref));
		return !empty($result_array) ? $result_array : false;
	}
	
}

?>