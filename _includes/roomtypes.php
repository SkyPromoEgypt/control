<?php

// This class requires the use of The database methods class
// This class uses the Late static binding supplied by PHP 5.3 and later 


require_once(LIB_PATH.DS."database.php");


class RoomTypes extends DatabaseObject {
	
	// ************************ Class attributes starts here ************************ //

	public $id;
	public $room_type;

	protected static $table_name = "room_types";
	protected static $db_fields = array('id', 'room_type');
	protected static $class_name = "RoomTypes";
	
}

?>