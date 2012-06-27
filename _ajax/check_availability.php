<?php require_once('../_includes/initialize.php'); ?>
<?php
	if(isset($_POST["arr_d"]) && isset($_POST["dep_d"])) {
		
		header("Content-type: text/html; charset=utf-8");
		
		if(isset($_POST['roomType']) && !isset($_POST['roomCat'])) {
			$rooms = RoomSetup::find_by_type($_POST['roomType'], '');
		} else if(!isset($_POST['roomType']) && isset($_POST['roomCat'])) {
			$rooms = RoomSetup::find_by_type('', $_POST['roomCat']);
		} else if(isset($_POST['roomType']) && isset($_POST['roomCat'])) {
			$rooms = RoomSetup::find_by_type($_POST['roomType'], $_POST['roomCat']);
		} else {
			$rooms = RoomSetup::find_all();
		}
		
		if($rooms) {
			$output = '';

			foreach($rooms as $room) {
				$n = $room->room_number;
				$newbooking = new Room();
				$newbooking->room_number = $n;
				$newbooking->arr_d = $_POST["arr_d"];
				$newbooking->dep_d = $_POST["dep_d"];
				
				if($newbooking->chkbookingwithin($newbooking->room_number, '', $newbooking->arr_d, $newbooking->dep_d)) {
					$output .= '';
				} elseif($newbooking->chkovrdbooking($newbooking->room_number, '', $newbooking->arr_d, $newbooking->dep_d)) {
					$output .= '';
				} else {
					if(isset($_POST['control'])) {
						$output .= '<div class="avRooms">' . $n . '</div>';
					} else {
						$output .= '<div class="availableResults" <p>Room #' . $n . ' (<span class="roomtype">' . $room->room_type . '  ' . $room->room_cat . '</span>)' . ' | (<span class="roomtype">' . $room->room_price . ' L.E</span>) | ' . '<a href="#" onclick="userBooking.startBooking(event,' . $room->room_number . ',\'' . $newbooking->arr_d . '\',\'' . $newbooking->dep_d . '\',\'' . $room->room_price . '\');">Click to Book</a></p></div>';
					}					
				}
			}			
			if(empty($output)) echo '<div class="availableResults"><p>Sorry. No rooms available.</p></div>';
			else {
				if(isset($_POST['control'])) {
					echo "<strong><p>Available Rooms from " . format_date($newbooking->arr_d) . " to " . format_date($newbooking->dep_d) . ":</strong></p><br />" . $output;
				} else {
					echo "<strong><p>Available Rooms from " . format_date($newbooking->arr_d) . " to " . format_date($newbooking->dep_d) . " with prices per night in Egyptian Pounds (L.E):</strong></p><br />" . $output;
				}
			}
		} else {
			echo '<div class="availableResults"><p>Sorry. No rooms available.</p></div>';
		}
	}
?>