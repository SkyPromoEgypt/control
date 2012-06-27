<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["month"]) && isset($_POST["year"])){
	$month = $_POST["month"];
	$year = $_POST["year"];
	header("Content-type: text/html; charset=utf-8");
    $date = getdate(mktime(0,0,0,$month,1,$year));
    
	// now that the date is ready lets get the first day and the last day of the month from it
	// we make times from this date's month and year and getdates from it;
	
	$firstDay = getdate(mktime(0,0,0,$date['mon'],1,$date['year'])); // first day of the month
	$lastDay  = getdate(mktime(0,0,0,$date['mon']+1,0,$date['year']));  // last day of the month we add 1 to the month and the day will be 0;
	$today    = getdate();  // then we define today
    
	
	// Now we create the table and the heares of it
	echo '<table class="dtcalender">';
	echo '<tr><th colspan="7">'.$date['month']." - ".$date['year']."</th></tr>";  // show date - year
	echo '<tr class="days"><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td><td>Su</td></tr>';  // show days names
	
	
	// The first row of the calender must be perfect positioned 
	// we set a tracker to use in a for loop. if the firstday's weekday is 0 in the array we make it 7
	// so we can start the for loop else we use the weekday that shows in the array
	
	echo '<tr>';
	// shows the empty fields of the row
	if ($firstDay['wday'] == 0) {
		$wdays = 7;
	} else {
		$wdays = $firstDay['wday'];
	}
	for( $i = 1; $i < $wdays; $i++ ){
		echo '<td>&nbsp;</td>';
	}
	
	// shows the day of the month in the first row
	$day = 0;
	for( $i = $wdays; $i <= 7; $i++ ){
		$day++;
		if (($day == $today['mday']) && ($today['mon'] == $month)) {
			$date = $year . '-' . $month . '-' . $day;
			if($rem = Reminder::check($date)) {
				echo "<td class=\"actday event\"><a href=\"#\" onClick=\"rem.view(event, '$date');\">$day</a></td>";
			} else {
				echo "<td class=\"actday free\"><a href=\"#\" onClick=\"rem.setRemDate(event, '$date');\">$day</a></td>";
			}
		} else {
			$date = $year . '-' . $month . '-' . $day;
			if($rem = Reminder::check($date)) {
				echo "<td class=\"event\"><a href=\"#\" onClick=\"rem.view(event, '$date');\">$day</a></td>";
			} else {
				echo "<td class=\"free\"><a href=\"#\" onClick=\"rem.setRemDate(event, '$date');\">$day</a></td>";
			}
		}
	}
	echo '</tr>';
	
	// shows the full weeks of the month with thier days
	$fullWeeks = floor(($lastDay['mday']-$day)/7);
	
	for ( $i = 0; $i < $fullWeeks; $i++ ){
		echo '<tr>';
		for ($j = 0; $j < 7; $j++){
			$day++;
				if (($day == $today['mday']) && ($today['mon'] == $month)) {
				$date = $year . '-' . $month . '-' . $day;
				if($rem = Reminder::check($date)) {
					echo "<td class=\"actday event\"><a href=\"#\" onClick=\"rem.view(event, '$date');\">$day</a></td>";
				} else {
					echo "<td class=\"actday free\"><a href=\"#\" onClick=\"rem.setRemDate(event, '$date');\">$day</a></td>";
				}
			} else {
				$date = $year . '-' . $month . '-' . $day;
				if($rem = Reminder::check($date)) {
					echo "<td class=\"event\"><a href=\"#\" onClick=\"rem.view(event, '$date');\">$day</a></td>";
				} else {
					echo "<td class=\"free\"><a href=\"#\" onClick=\"rem.setRemDate(event, '$date');\">$day</a></td>";
				}
			}
		}
		echo '</tr>';
	}
	
	// shows the last row of the calender perfectly positioned
	if ($day < $lastDay['mday']){
		
		echo '<tr>';
		
		for ( $i = 0; $i < 7; $i++){
			$day++;
			if ($day <= $lastDay['mday']){
				if (($day == $today['mday']) && ($today['mon'] == $month)) {
					$date = $year . '-' . $month . '-' . $day;
					if($rem = Reminder::check($date)) {
						echo "<td class=\"actday event\"><a href=\"#\" onClick=\"rem.view(event, '$date');\">$day</a></td>";
					} else {
						echo "<td class=\"actday free\"><a href=\"#\" onClick=\"rem.setRemDate(event, '$date');\">$day</a></td>";
					}
				} else {
					$date = $year . '-' . $month . '-' . $day;
					if($rem = Reminder::check($date)) {
						echo "<td class=\"event\"><a href=\"#\" onClick=\"rem.view(event, '$date');\">$day</a></td>";
					} else {
						echo "<td class=\"free\"><a href=\"#\" onClick=\"rem.setRemDate(event, '$date');\">$day</a></td>";
					}
				}
			} else {
				echo '<td>&nbsp;</td>';
			}
		}
		echo '</tr>';
	}
	
	echo '</table>';
}
?>