<?php 
require_once('database.php');

function display_errors($error_array) {
	echo "<p class=\"errors\">";
	echo "Please review the following fields:<br />";
	foreach($error_array as $error) {
		echo " - " . $error . "<br />";
	}
	echo "</p>";
}

function redirect_to( $location = NULL ) {
	if ($location != NULL) {
		header("Location: {$location}");
		exit;
	}
}

function format_date( $date = " " ) {
	$old_date = strtotime($date);
	$new_date = date('j/F/Y', $old_date);
	return $new_date;
}

function short_format_date( $date = " " ) {
	$old_date = strtotime($date);
	$new_date = date('j/M/Y', $old_date);
	return $new_date;
}

function log_action($action, $message="") {
	$logfile = SITE_ROOT.DS.'_logs'.DS.'logfile.txt';
	$new = file_exists($logfile) ? false : true;
	if($handle = fopen($logfile, 'a')) {
		$timestampe = strftime("%d/%m/%Y %H:%M:%S", time());
		$content = "{$timestampe} | {$action} : {$message}\n";
		fwrite($handle, $content);
		fclose($handle);
	} else {
		echo "Couldn't open file for writing";
	}
}

function chat($user = '', $client = '', $message="") {
	$file = SITE_ROOT.DS.'_chat'.DS.'chat.txt';
	$new = file_exists($file) ? false : true;
	if($handle = fopen($file, 'a')) {
		$content = "<p><span class=\"chatclass\">{$user} says</span> : {$message}</p>\n";
		if($client != '') {
			$content = "<p><span class=\"chatclass2\">{$client} says</span> : {$message}</p>\n";
		}
		fwrite($handle, $content);
		fclose($handle);
	} else {
		echo "Couldn't open file for writing";
	}
}

function vcard($file, $name, $email, $phone) {
	$file = SITE_ROOT.DS.'_directory'.DS.$file.'.vcf';
	if(file_exists($file)) {
		return false;
	} else {
		if($handle = fopen($file, 'w')) {
			$content = "
			BEGIN:VCARD
			VERSION:2.1
			N:" . $name . ";" . $name . "
			FN:
			ORG:
			TITLE:
			TEL;WORK;VOICE:
			TEL;HOME;VOICE:" . $phone . "
			TEL;CELL;VOICE:
			TEL;WORK;FAX:
			ADR;WORK:
			ADR;HOME:
			URL;HOME:
			URL;WORK:
			EMAIL;INTERNET:" . $email . "
			EMAIL;INTERNET:
			END:VCARD
			";
			fwrite($handle, $content);
			fclose($handle);
		} else {
			echo "Couldn't Create Vcard";
		}
	}
}

function datetime_to_text($datetime="") {
	$unixtimestamp = strtotime($datetime);
	return strftime("%B %d, %Y at %I:%M %p", $unixtimestamp);
}

function format_time($datetime="") {
	$unixtimestamp = strtotime($datetime);
	return strftime("%I:%M %p", $unixtimestamp);
}

function getToday() {
	$timezone = new DateTimeZone( "Africa/Cairo" );
	$date = new DateTime();
	$date->setTimezone( $timezone );
	$today = $date->format('Y-m-d');
	return $today;
}

function c2sdecrypt($s){
	$k = 'DTHBS';
	$s = urldecode($s);
	$k = str_split(str_pad('', strlen($s), $k));
	$sa = str_split($s);
	foreach($sa as $i=>$v){
		$t = ord($v)-ord($k[$i]);
		$sa[$i] = chr( $t < 0 ?($t+256):$t);
	}
	return join('', $sa);
}
?>