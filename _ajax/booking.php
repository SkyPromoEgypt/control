<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["room"])){
	if(isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["arr_d"]) && isset($_POST["dep_d"])) {
		
		header("Content-type: text/html; charset=utf-8");
		
		$newbooking = new Room();
		$newbooking->room_number = $_POST['room'];
		
		$newbooking->room_status = 'Opened';
		
		$user = User::find_by_id($_SESSION['user_id']);
		if($user) {
			$newbooking->booked_by = $user->username;
		} else {
			$newbooking->booked_by = 'Customer';
		}
			
		
		$newbooking->customer_name = $_POST['name'];
		
		if(isset($_POST["rmNames"])) {
			$newbooking->room_mates = $_POST['rmNames']; 	
		}
		 	
		$newbooking->email = $_POST['email'];
		$newbooking->arr_d = $_POST['arr_d'];	
		$newbooking->dep_d = $_POST['dep_d'];
		
		if(isset($_POST["nationality"])) {
			$newbooking->nationality = $_POST['nationality']; 	
		}
		
		if(isset($_POST["bkSource"])) {
			$newbooking->booked_through = $_POST['bkSource']; 	
		} else {
			$newbooking->booked_through = 'Our Website';
		}
		
		if(isset($_POST["roomPrice"])) {
			$newbooking->room_price = $_POST['roomPrice']; 	
		} else {
			$result = RoomSetup::find_by_room($_POST["room"]);
			$newbooking->room_price = $result->room_price;
		}
		
		if(isset($_POST["season"])) {
			$newbooking->season = $_POST['season']; 	
		} else {
			$newbooking->season = 'Normal';
		}
		
		if(isset($_POST["discount"])) {
			$newbooking->discount = $_POST['discount']; 	
		}
		
		if(isset($_POST["dob"])) {
			$newbooking->dob = $_POST['dob']; 	
		}
		
		if(isset($_POST["pass"])) {
			$newbooking->passport = $_POST['pass']; 	
		}
		
		if(isset($_POST["doe"])) {
			$newbooking->doe = $_POST['doe']; 	
		}
		
		if(isset($_POST["boe"])) {
			$newbooking->boe = $_POST['boe']; 	
		}
		
		if(isset($_POST["pov"])) {
			$newbooking->pov = $_POST['pov']; 	
		}
		
		if(isset($_POST["pickup"])) {
			$newbooking->pickup = 'Yes'; 	
		}
		
		if(isset($_POST["returnPickup"])) {
			$newbooking->rpickup = 'Yes'; 	
		}
		
		if($newbooking->arr_d && $newbooking->dep_d) {
			$newbooking->days_accommodation = $newbooking->dateDiff("/", $newbooking->dep_d, $newbooking->arr_d);
		}
		
		if($newbooking->days_accommodation && $newbooking->room_price) {
			$newbooking->total_price = ($newbooking->days_accommodation * $newbooking->room_price);
		}
		
		if($newbooking->days_accommodation && $newbooking->room_price) {
			if($newbooking->discount) {
				$newbooking->profit = $newbooking->total_price - ($newbooking->days_accommodation * $newbooking->discount);
			} else {
				$newbooking->profit = $newbooking->total_price;
			}
		}
		
		if(isset($_POST["notes"])) {
			$newbooking->notes = $_POST['notes']; 	
		}
		
		if($newbooking->chkbookingwithin($newbooking->room_number, '', $newbooking->arr_d, $newbooking->dep_d)) {
			echo $newbooking->chkbookingwithin($newbooking->room_number, '', $newbooking->arr_d, $newbooking->dep_d);
		} elseif($newbooking->chkovrdbooking($newbooking->room_number, '', $newbooking->arr_d, $newbooking->dep_d)) {
			echo $newbooking->chkovrdbooking($newbooking->room_number, '', $newbooking->arr_d, $newbooking->dep_d);
		} else {
			echo "done";
			$newbooking->create();
			$bkref = $newbooking->booking_reference;
			if(isset($_POST['multi']) && isset($_POST['multipax'])) {
				$multi = explode(',', $_POST['multi']);
				$multipax = explode(',', $_POST['multipax']);
				for($i = 0; $i < count($multi); $i++) {
					  $activity = new ActRecords();
					  $activity->bkref = $bkref;
					  $activity->activity = $multi[$i];
					  $activity->pax = $multipax[$i];
					  $result = Activities::find_by_service($multi[$i]);
					  $price = $result->price;
					  $activity->price = $price * $activity->pax;
					  $activity->create();
				}
			}
			if(isset($_POST['confirmEmail'])) {
				$body = $newbooking->notify($bkref, $newbooking->room_number, $newbooking->customer_name, $newbooking->room_mates, $newbooking->email, $newbooking->nationality, $newbooking->arr_d, $newbooking->dep_d, $newbooking->booked_through, $newbooking->room_price, $newbooking->season, $newbooking->discount, $newbooking->dob, $newbooking->passport, $newbooking->doe, $newbooking->boe, $newbooking->pov, $newbooking->pickup, $newbooking->rpickup, $newbooking->notes);
				if($body && isset($_POST['sysMail'])) {
					$sys_mail = Mail::sys_mail($newbooking->email, $body);
				}
			}
		}
	}
}
?>
<?php
if(isset($_POST["bkref"])){
	if(isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["arr_d"]) && isset($_POST["dep_d"])) {
		
		header("Content-type: text/html; charset=utf-8");
		
		$booking = Room::find_by_ref($_POST['bkref']);
		
		$user = User::find_by_id($_SESSION['user_id']);
		if($user) {
			$booking->booked_by = $user->username;
		} else {
			$booking->booked_by = 'Customer';
		}	
		
		$booking->customer_name = $_POST['name']; 
		
		if(isset($_POST["rmNames"])) {
			$booking->room_mates = $_POST['rmNames']; 	
		}
			
		$booking->email = $_POST['email'];
		$booking->arr_d = $_POST['arr_d'];	
		$booking->dep_d = $_POST['dep_d'];
		
		if(isset($_POST["nationality"])) {
			$booking->nationality = $_POST['nationality']; 	
		}
		
		if(isset($_POST["bkSource"])) {
			$booking->booked_through = $_POST['bkSource']; 	
		} else {
			$booking->booked_through = 'Our Website';
		}
		
		if(isset($_POST["roomPrice"])) {
			$booking->room_price = $_POST['roomPrice']; 	
		} else {
			$result = RoomSetup::find_by_room($booking->room_number);
			$booking->room_price = $result->room_price;
		}	
		
		if(isset($_POST["season"])) {
			$booking->season = $_POST['season']; 	
		} else {
			$booking->season = 'Normal';
		}
		
		if(isset($_POST["discount"])) {
			$booking->discount = $_POST['discount']; 	
		}
		
		if(isset($_POST["dob"])) {
			$booking->dob = $_POST['dob']; 	
		}
		
		if(isset($_POST["pass"])) {
			$booking->passport = $_POST['pass']; 	
		}
		
		if(isset($_POST["doe"])) {
			$booking->doe = $_POST['doe']; 	
		}
		
		if(isset($_POST["boe"])) {
			$booking->boe = $_POST['boe']; 	
		}
		
		if(isset($_POST["pov"])) {
			$booking->pov = $_POST['pov']; 	
		}
		
		if(isset($_POST["pickup"])) {
			$booking->pickup = 'Yes'; 	
		}
		
		if(isset($_POST["returnPickup"])) {
			$booking->rpickup = 'Yes'; 	
		}
		
		if($booking->arr_d && $booking->dep_d) {
			$booking->days_accommodation = $booking->dateDiff("/", $booking->dep_d, $booking->arr_d);
		}
		
		if($booking->days_accommodation && $booking->room_price) {
			$booking->total_price = ($booking->days_accommodation * $booking->room_price);
		}
		
		if($booking->days_accommodation && $booking->room_price) {
			if($booking->discount) {
				$booking->profit = $booking->total_price - ($booking->days_accommodation * $booking->discount);
			} else {
				$booking->profit = $booking->total_price;
			}
		}
		
		if(isset($_POST["notes"])) {
			$booking->notes = $_POST['notes']; 	
		}
		
		if($booking->chkbookingwithin($booking->room_number, $booking->booking_reference, $booking->arr_d, $booking->dep_d)) {
			echo $booking->chkbookingwithin($booking->room_number, $booking->booking_reference, $booking->arr_d, $booking->dep_d);
		} elseif($booking->chkovrdbooking($booking->room_number, $booking->booking_reference, $booking->arr_d, $booking->dep_d)) {
			echo $booking->chkovrdbooking($booking->room_number, $booking->booking_reference, $booking->arr_d, $booking->dep_d);
		} else {
			echo "done";
			$booking->update_booking();
			if(isset($_POST['confirmEmail'])) {
				$booking->notify($booking->booking_reference, $booking->room_number, $booking->customer_name, $booking->room_mates, $booking->email, $booking->nationality, $booking->arr_d, $booking->dep_d, $booking->booked_through, $booking->room_price, $booking->season, $booking->discount, $booking->dob, $booking->passport, $booking->doe, $booking->boe, $booking->pov, $booking->pickup, $booking->rpickup, $booking->notes);
			}
		}
	}
}
?>
