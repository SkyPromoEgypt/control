<?php

// This class requires the use of The database methods class
// This class uses the Late static binding supplied by PHP 5.3 and later 


require_once(LIB_PATH.DS."database.php");


class RoomSetup extends DatabaseObject {
	
	// ************************ Class attributes starts here ************************ //
	public $room_number;
	public $room_type;
	public $room_cat;
	public $room_price;
	public $local_price;
	public $high_price;

	protected static $table_name = "rooms";
	protected static $db_fields = array('room_number', 'room_type', 'room_cat', 'room_price', 'local_price', 'high_price');
	protected static $class_name = "RoomSetup";
	
	public static function find_types() {
		global $database;
		$sql = "SELECT room_type FROM " . self::$table_name . " GROUP BY (room_type)";
		$results = $database->query($sql);
		if($results) {
			return $results;
		}
	}
	
	public static function find_cats() {
		global $database;
		$sql = "SELECT room_cat FROM " . self::$table_name . " GROUP BY (room_cat)";
		$results = $database->query($sql);
		if($results) {
			return $results;
		}
	}
	
	public static function find_by_type($type = '', $cat = '') {
		if(!empty($type) && empty($cat)) {
			$sql = "SELECT * FROM " . self::$table_name . " WHERE room_type = '" . $type . "'";
		} else if (!empty($cat) && empty($type)) {
			$sql = "SELECT * FROM " . self::$table_name . " WHERE room_cat = '" . $cat . "'";
		} else {
			$sql = "SELECT * FROM " . self::$table_name . " WHERE room_type='" . $type . "' AND room_cat='" . $cat . "'";
		}
		$results = self::find_by_sql($sql);
		if($results) {
			return $results;
		}
	}
	
	public static function find_by_room( $room = 0 ) {
		global $database;
		$result_array = self::find_by_sql("SELECT * FROM " . self::$table_name . " WHERE room_number = " . $database->escape_value($room) . " LIMIT 1");
		return !empty($result_array) ? array_shift($result_array) : false;
	}
	
	public function update_room() {
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
		$sql .= " WHERE room_number = " . $database->escape_value($this->room_number);
		$database->query($sql);
		return ($database->affected_rows() == 1) ? true : false;
	}
	
	public function delete_room() {
		global $database;
		// Don't forget your sql syntax and good habits:
		// - DELETE FROM table WHERE CONDITION LIMIT 1 
		// - escape all values to prevent sql injection 
		// - Use LIMIT 1
		$sql  = "DELETE FROM " . self::$table_name;
		$sql .= " WHERE room_number = " . $database->escape_value($this->room_number);
		$sql .= " LIMIT 1";
		$database->query($sql);
		return ($database->affected_rows() == 1) ? true : false;
	}
}

?>