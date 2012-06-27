<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["bkref"])){
  header("Content-type: text/html; charset=utf-8");
  $bkref = $_POST['bkref'];
  $results = ActRecords::find_by_ref($bkref);
  $room = Room::find_by_ref($bkref);
  $count = count($results);
  if($count == 1) {
	 $dis = 'Activity/Service'; 
  } else {
	 $dis = 'Activities/Services'; 
  }
  if($results) {
	 $total = 0;
	 foreach($results as $result) {
		 $total += $result->price;
	 }
	 if(isset($_POST['show'])) {
		 $output = '';
 		 foreach($results as $result) {
	    	 $output .= '- (' . $result->pax . ' Pax) - ' . $result->activity . ' | Price per pax: ' . ($result->price / $result->pax)  . ' L.E | Total Price: ' . $result->price .'L.E<br />';
 	 	} 
	 } else if($_POST['total']) {
		 $output = $total;
	 } else {
		 if($room->room_status == 'Closed') {
			 $output = '<p>Customer has ' . $count . '  ' . $dis . ' in his account with a total of ' . $total . ' L.E</p><br />';
			 foreach($results as $result) {
				 $output .= '<p>(' . $result->pax . ' Pax) - ' . $result->activity . ' | Price per pax: ' . ($result->price / $result->pax)  . ' L.E | Total Price: ' . $result->price . ' L.E</p>';
			 }
		 } else {
			 $output = '<p>Customer has ' . $count . '  ' . $dis . ' in his account with a total of ' . $total . ' L.E</p><br />';
			 $user = User::find_by_id($_SESSION['user_id']);
			 if($user->privillage == 'Administrator' || $user->privillage == 'Acountant') {
				 foreach($results as $result) {
					 $output .= '<p>(' . $result->pax . ' Pax) - ' . $result->activity . ' | Price per pax: ' . ($result->price / $result->pax)  . ' L.E | Total Price: ' . $result->price .' L.E |  <a href="#" onclick="booking.openeditService(event,' . $result->id . ',' . $result->pax . ',' . ($result->price / $result->pax) . ',\'' . $result->activity . '\');">Edit Service</a>  |  <a href="#" onclick="booking.confirmDelService(event,' . $result->id . ');">Delete Service</a></p>';
			 	 }
			 } else {
				 foreach($results as $result) {
					 $output .= '<p>(' . $result->pax . ' Pax) - ' . $result->activity . ' | Price per pax: ' . ($result->price / $result->pax)  . ' L.E | Total Price: ' . $result->price .' L.E</p>';
			 	 }
			 }
			 
 	 	} 
	 }
 	 echo $output; 
  } else {
	 echo '<p>No services found for this booking</p>';
  }
}
?>