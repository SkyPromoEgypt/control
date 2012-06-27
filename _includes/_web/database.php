<?php
require(LIB_PATH.DS.'config.php');

class MySQLDatabase {
	
	private $connection; // connection to mysql database
	public 	$last_query; // last query : this is to show the last query submitted to mysql with the error
	private $magic_quotes_active;  // checks if magic quotes is on or not
	private $real_escape_string_exists;  // checks if the function mysql_real_escape_string exists or not
	
	// The follwoing will be constructed only once so this will save the processing time
	function __construct() {
		$this->open_connection();
		$this->magic_quotes_active = get_magic_quotes_gpc();
		$this->real_escape_string_exists = function_exists( "mysql_real_escape_string" );
	}
	
	// opens the connection to mysql database
	public function open_connection() {
		$this->connection = mysql_connect(DB_SERVER, DB_USER, DB_PASS);
		if(!$this->connection) {
			die("DATABASE CONNECTION FAILED: " . mysql_error());
		} else {
			$db_select = mysql_select_db(DB_NAME, $this->connection);
			mysql_query("set names utf8");
			if(!$db_select) {
				die("DATABASE SELECTION FAILED: " . mysql_error());
			}
		}
	}
	
	// closes the connection to mysql database
	public function close_connection() {
		if(isset($this->connection)) {
			mysql_close($this->connection);
			unset($this->connection);
		}
	}
	
	public function query($sql) {
		$this->last_query = $sql;
		$result = mysql_query($sql, $this->connection);
		$this->confirm_query($result);
		return $result;
	}
	
	public function escape_value( $value ) {
		if( $this->real_escape_string_exists ) { // PHP v4.3.0 or higher
			// undo any magic quote effects so mysql_real_escape_string can do the work
			if( $this->magic_quotes_active ) { $value = stripslashes( $value ); }
			$value = mysql_real_escape_string( $value );
		} else { // before PHP v4.3.0
			// if magic quotes aren't already on then add slashes manually
			if( !$this->magic_quotes_active ) { $value = addslashes( $value ); }
			// if magic quotes are active, then the slashes already exist
		}
		return $value;
	}
	
	// database - netural functions
	public function fetch_array($result_set) {
		return mysql_fetch_array($result_set);
	}
	
	public function num_rows($result_set) {
		return mysql_num_rows($result_set);
	}
	
	// finds the last inserted id to mysql database
	public function insert_id() {
		return mysql_insert_id($this->connection);
	}
	
	public function affected_rows() {
		return mysql_affected_rows($this->connection);
	}
	
	private function confirm_query($result) {
		if(!$result) {
			$output = "DATABASE QUERY FAILED: " . mysql_error() . "<br />";
			$output .= "Last Query was: " . $this->last_query;
			die($output);
		}
	}
}

$database = new MySQLDatabase();
$db =& $database;

?>