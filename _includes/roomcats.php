<?php

// This class requires the use of The database methods class
// This class uses the Late static binding supplied by PHP 5.3 and later 


require_once(LIB_PATH.DS."database.php");


class RoomCats extends DatabaseObject {
	
	// ************************ Class attributes starts here ************************ //

	public $id;
	public $room_cat;

	protected static $table_name = "room_cats";
	protected static $db_fields = array('id', 'room_cat');
	protected static $class_name = "RoomCats";
	
}

?>