<?php require_once('_includes/initialize.php'); ?>
<?php

/*
// This is a test to excute a sql query and retrive a list of all the customers activities
// The idea of this is to calculate all the activities payment from one string
// I store all the activities of the customer in one column each one is followed by a semicolumn
// and in this example i explain how to explode the string into an array and then calculate
// the payment based on it

// suppose this is the main activities prices array
$trips = array('tripa' => 300, 'trips' => 150, 'tripd' => 130, 'tripf' => 260, 'tripg' => 430);
// and this is the results from the sql as one string
$guest = 'tripa(2),trips(3),tripd(2),tripf(1)';
// make an array of the string
$array1 = explode(',', $guest);
// extract the numbers from array1
$array2 = array();
foreach($array1 as $key => $value) {
	$array2[] = preg_replace("/[^0-9]/", '', $value);
}
// extract the trips names from array1
$array3 = array();
foreach($array1 as $key => $value) {
	$array3[] = preg_replace("/[^a-zA-Z]/", '', $value);
}
$price = 0;
for($i=0; $i<count($array1); $i++) {
	$price += ($trips[$array3[$i]] * $array2[$i]);
}
echo $price;
echo "<hr />";
*/

?>

<?php 
/*
// testing find by reference method
$booking = Room::find_by_ref(214);
if($booking->dateDiff("/", $booking->dep_d, $booking->arr_d) == 1) {
	echo 'hello';
}
*/
?>

<?php
	/*
	$newbooking = new Room();
	$newbooking->room_number = 103;
	$newbooking->booking_reference;
	$newbooking->booked_by = 'firefox';	
	$newbooking->customer_name = 'Jimmy Strasburg'; 	
	$newbooking->email = 'john@example.com'; 	
	$newbooking->nationality = 'English'; 	
	$newbooking->booked_through = 'Hostel Bookers'; 	
	$newbooking->arr_d = '2010-8-1';	
	$newbooking->dep_d = '2010-8-3';
	$newbooking->room_type = 'Double';
	$newbooking->room_price = '150';
	$newbooking->season = '2';
	//$newbooking->discount;
	//$newbooking->total_price;
	//$newbooking->days_accommodation;
	//$newbooking->profit; 	
	$newbooking->notes = 'testing purposes';	
	
	if($newbooking->chkbookingwithin(103, '', $newbooking->arr_d, $newbooking->dep_d)) {
		echo $newbooking->chkbookingwithin(103, '', $newbooking->arr_d, $newbooking->dep_d);
	} elseif($newbooking->chkovrdbooking(103, '', $newbooking->arr_d, $newbooking->dep_d)) {
		echo $newbooking->chkovrdbooking(103, '', $newbooking->arr_d, $newbooking->dep_d);
	} else {
		echo "done";
		$newbooking->create();	
	}
	*/
?>

<?php
/*
$newroom = new RoomSetup();
$newroom->room_number = 122;
$newroom->room_type = Triple;
$newroom->room_price = 220;
$newroom->create();
*/
?>

<?php
/*
$rooms = RoomSetup::find_all();

foreach($rooms as $room) {
	echo $room->room_number . "<br />";
}
*/
?>

<?php
/*
$types = array('Dorm', 'Double', 'Trible', 'Twin', 'Single');
$cat = array('Sea View', 'Back View');

$newroom = new RoomSetup();
$newroom->room_number = 122;
$newroom->room_type = $types[3];
$newroom->room_cat = $cat[1];
$newroom->room_price = 160;
$newroom->local_price = 220;
$newroom->high_price = 240;
$newroom->create();
*/

?>

<?php
/*
$newactivitiy = new Activities();
$newactivitiy->activity = 'AUC SPECIAL (HT 8)';
$newactivitiy->price = '550';
$newactivitiy->create();
*/

?>

<?php
/*
//Search a user
$customer_name = 'Mohammed Yehia';
$string = strtolower($customer_name);
$results = Room::find_all();
foreach($results as $result) {
	if(preg_match('/' . $string . '/i', $result->customer_name)) {
		echo "match found in booking " . $result->booking_reference . "<br />";
	}
}
*/
//echo md5(microtime().rand(1,9999999999999999999999999));
	/*
	$db_sql_array = array(
	
	"test1" => 
	"CREATE TABLE IF NOT EXISTS `test` (
	`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`test` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`status` int(5) NOT NULL
	) ENGINE=MyISAM CHARACTER SET utf8 COLLATE utf8_general_ci",
	
	"test2" => 
	"CREATE TABLE IF NOT EXISTS `test2` (
	`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`test` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`status` int(5) NOT NULL
	) ENGINE=MyISAM CHARACTER SET utf8 COLLATE utf8_general_ci",
	
	"test3" =>
	"CREATE TABLE IF NOT EXISTS `test3` (
	`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`test` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`status` int(5) NOT NULL
	) ENGINE=MyISAM CHARACTER SET utf8 COLLATE utf8_general_ci",
	
	"test4" =>
	"CREATE TABLE IF NOT EXISTS `test4` (
	`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`test` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`status` int(5) NOT NULL
	) ENGINE=MyISAM CHARACTER SET utf8 COLLATE utf8_general_ci",
	
	"test5" =>
	"CREATE TABLE IF NOT EXISTS `test5` (
	`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`test` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`status` int(5) NOT NULL
	) ENGINE=MyISAM CHARACTER SET utf8 COLLATE utf8_general_ci");
	
	foreach($db_sql_array as $table => $sql) {
		if($database->query($sql)) echo 'Table ' . $table . ' successfully installed...' . '<br />';
	}
*/

echo realpath(__FILE__);

?>

