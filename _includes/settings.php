<?php

class Settings {
	
	public $id;
	public $username;
	public $password;
	
	
	function __construct() {
		include(SITE_ROOT.DS.'_logs'.DS.'conf.php');
		foreach($settings as $key => $value) {
			$this->$key = $value;
		}
	}
	
	public function writeSettings() {
		$content  = "<?php\r\n";
		$content .= "\$settings = array();\r\n";
		$content .= "\$settings['id'] = '" . $this->id . "';\r\n";
		$content .= "\$settings['username'] = '" . $this->username . "';\r\n";
		$content .= "\$settings['password'] = '" . $this->password . "';\r\n";
		$content .= "?>";
		$file = SITE_ROOT.DS.'_logs'.DS.'conf.php';
		if($handle = fopen($file, 'w+')) {
			fwrite($handle, $content);
			fclose($handle);
		}
	}
}

$conf = new Settings();
?>