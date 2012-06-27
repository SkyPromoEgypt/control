<?php

// All rights reserved to Dahab TEchnology 
// Based on Max's Calender
// modified by Eng. Mohammed Yehia

class DTCalender{
	
    function makeCalender( $year = 0, $month = 0 ){

    // First we get 1 day to abstract the others upon it
	// consider a day $date if the year and the month are not defined then we set it to today 
	// then we extract the first and the last days of the month from it like the following
	
    if (($year == 0) || ($month == 0)){
       $date = getdate();
	   $month = $date['mon'];
	   $year = $date['mon'];
    } else {
       $date = getdate(mktime(0,0,0,$month,1,$year));
    }
    
	// now that the date is ready lets get the first day and the last day of the month from it
	// we make times from this date's month and year and getdates from it;
	
	$firstDay = getdate(mktime(0,0,0,$date['mon'],1,$date['year'])); // first day of the month
	$lastDay  = getdate(mktime(0,0,0,$date['mon']+1,0,$date['year']));  // last day of the month we add 1 to the month and the day will be 0;
	$today    = getdate();  // then we define today
    
	
	// Now we create the table and the heares of it
	echo '<table class="calender">';
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
			echo "<td class=\"actday\">$day</td>";
		} else {
			echo "<td>$day</td>";
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
				echo "<td class=\"actday\">$day</td>";
			} else {
				echo "<td>$day</td>";
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
					echo "<td class=\"actday\">$day</td>";
				} else {
					echo "<td>$day</td>";
				}
			} else {
				echo '<td>&nbsp;</td>';
			}
		}
		echo '</tr>';
	}
	
	echo '</table>';
}

}
?>