<?php

// This class requires the use of The database methods class
// This class uses the Late static binding supplied by PHP 5.3 and later 


require_once(LIB_PATH.DS."database.php");


class Mail extends DatabaseObject {
	
	// ************************ Class attributes starts here ************************ //

	public $id;
	public $mailfrom;
	public $mailto;
	public $body;
	public $created;
	public $status;
	public $store;

	protected static $table_name = "mail";
	protected static $db_fields = array('id', 'mailfrom', 'mailto', 'body', 'created', 'status', 'store');
	protected static $class_name = "Mail";
	
	public static function sys_mail($name = 'Anonymus', $body = '') {
		$mail = new self();
		$mail->mailfrom = $name;
		$mail->mailto = 'System';
		$mail->body = $body;
		$mail->created = strftime("%Y/%m/%d %H:%M:%S", time());
		$mail->status = 'unread';
		$mail->store = 'inbox';
		if($mail->create()) {
			return true;
		} else {
			return false;
		}
	}
}

?>