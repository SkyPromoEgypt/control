<?php
require_once(LIB_PATH.DS."database.php");

class User extends DatabaseObject {
	
	public $id;
	public $username;
	public $hashed_password;
	public $password;
	public $first_name;
	public $last_name;
	public $birthdate;
	public $address;
	public $phone;
	public $job;
	public $salary;
	public $privillage;
	protected $login_status;
	protected $last_logged_in;
	protected static $table_name = "users";
	protected static $db_fields = array('id', 'username', 'hashed_password', 'password', 'first_name', 'last_name', 'birthdate', 'address', 'phone', 'job', 'salary', 'privillage', 'login_status', 'last_logged_in');
	protected static $class_name = "User";
	
	public function full_name() {
		if(isset($this->first_name) && isset($this->last_name)) {
			return $this->first_name . " " . $this->last_name;
		} else {
			return "";
		}
	}
	
	public static function logged_users() {
		$sql = "SELECT * FROM " . self::$table_name . " ";
		$sql .= "WHERE login_status = 'logged in' ";
		$found_users = self::find_by_sql($sql);
		return $found_users;
	}
	
	public function last_logged_in() {
		return $this->last_logged_in;
	}
	
	public function set_login_status($founduser, $status) {
		$founduser->login_status = $status;
		$founduser->last_logged_in = strftime("%Y/%m/%d %H:%M:%S", time());
		$founduser->update();
	}
	
	public function is_admin() {
		if($this->privillage == 'Administrator') {
			return true;
		}
	}
	
	public static function authenticate($username="", $password="") {
		global $database;
		$username = $database->escape_value($username);
		$password = sha1($database->escape_value($password));
		$sql = "SELECT * FROM " . self::$table_name . " ";
		$sql .= "WHERE username = '{$username}' ";
		$sql .= "AND hashed_password = '{$password}' ";
		$sql .= "LIMIT 1";
		$found_user = self::find_by_sql($sql);
		//return $found_user; - testing purposes
		return !empty($found_user) ? array_shift($found_user) : false;
	}
	
	public static function check_user($username="") {
		global $database;
		$username = $database->escape_value($username);
		$sql = "SELECT * FROM " . self::$table_name . " ";
		$sql .= "WHERE username = '{$username}' ";
		$sql .= "LIMIT 1";
		$found_user = self::find_by_sql($sql);
		//return $found_user; - testing purposes
		return !empty($found_user) ? array_shift($found_user) : false;
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
	
}
?>