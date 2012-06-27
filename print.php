<?php require_once('_includes/initialize.php'); ?>
<?php 
// check if the user is logged in or not and store the url in a session variable to redirect 
// after user login

if (!$session->is_logged_in()) {
	$_SESSION['page'] = $_SERVER['PHP_SELF'];
	redirect_to("login.php"); 
}
if(isset($_GET['bkref'])) {
	$booking = Room::find_by_ref($_GET['bkref']);
	$services = ActRecords::find_by_ref($_GET['bkref']);
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="_images/favicon.ico" >
<link href="_css/main_css.css" type="text/css" rel="stylesheet" />
<title>Welcome to Hotel Booking System v1 (Beta Mode)</title>
<style type="text/css">
@media print {
	#printBill {
		display:none;
	}
}
</style>
</head>

<body>
<div id="wrraper">
  <div id="print">
  <table>
  <tr><td><input type="button" id="printBill" name="printBill" value="Print Report" onclick="window.print();" /></td></tr>
    <tr>
      <td align="left" valign="top"><fieldset>
        <legend>Customer Information</legend>
        <p>&nbsp;</p>
        <table width="350" border="0" class="table">
          <tr>
            <th width="137"><label for="name" class="label">Name:</label></th>
            <td id="name" width="320"><?php echo $booking->customer_name; ?></td>
          </tr>
          <tr>
            <th><label for="rmnames">Room Mates:</label></th>
            <td id="rmnames"><?php echo $booking->room_mates; ?></td>
          </tr>
          <tr>
            <th><label for="email">Email:</label></th>
            <td id="email"><?php echo $booking->email; ?></td>
          </tr>
          <tr>
            <th height="21"><label for="nationality">Nationality:</label></th>
            <td id="nationality"><?php echo $booking->nationality; ?></td>
          </tr>
        </table>
      </fieldset></td>
      <td align="left" valign="top"><fieldset>
        <legend>Passport and VISA Details</legend>
        <p>&nbsp;</p>
        <table width="350" class="table">
          <tr>
            <th width="146"><label for="dob">Date of Birth:</label></th>
            <td id="dob" width="192"><?php echo $booking->dob; ?></td>
          </tr>
          <tr>
            <th><label for="pass">Passport#:</label></th>
            <td id="pass"><?php echo $booking->passport; ?></td>
          </tr>
          <tr>
            <th><label for="doe">Egypt date of entry:</label></th>
            <td id="doe"><?php echo $booking->doe ?></td>
          </tr>
          <tr>
            <th><label for="boe">Egypt border of entry:</label></th>
            <td id="boe"><?php echo $booking->boe; ?></td>
          </tr>
          <tr>
            <th><label for="pov">Period of VISA</label></th>
            <td id="pov"><?php echo $booking->pov; ?></td>
          </tr>
        </table>
      </fieldset></td>
    </tr>
    <tr>
      <td colspan="2" align="left" valign="top"><fieldset>
        <legend>Room Details</legend>
        <p>&nbsp;</p>
        <table width="747" border="0" class="table">
          <tr>
            <th width="107" align="left" valign="top"><label>Arrival Day</label></th>
            <td width="346" align="left" valign="top" id="arr_date"><?php echo $booking->arr_d; ?></td>
          </tr>
          <tr>
            <th align="left" valign="top"><label>Departure Day</label></th>
            <td id="dep_date" align="left" valign="top"><?php echo $booking->dep_d; ?></td>
          </tr>
          <tr>
            <th width="190" align="left" valign="top"><label for="bookedthrough">Booked Through:</label></th>
            <td id="bookedthrough" width="261" align="left" valign="top"><?php echo $booking->booked_through; ?></td>
          </tr>
          <tr>
            <th align="left" valign="top"><label for="roomprice">Room Price:</label></th>
            <td id="roomprice" align="left" valign="top"><?php echo $booking->room_price; ?></td>
          </tr>
          <tr>
            <th align="left" valign="top"><label for="season">Season:</label></th>
            <td id="season" align="left" valign="top"><?php echo $booking->season; ?></td>
          </tr>
          <tr>
            <th align="left" valign="top"><label for="discount">Discount given:</label></th>
            <td id="discount" align="left" valign="top"><?php echo $booking->discount; ?></td>
          </tr>
          <tr>
            <th align="left" valign="top"><label for="accommodation">Accommodation Days:</label></th>
            <td id="accommodation" align="left" valign="top"><?php echo $booking->days_accommodation; ?></td>
          </tr>
          <tr>
            <th align="left" valign="top"><label for="roomtotal">Accommodation Total:</label></th>
            <td id="roomtotal" align="left" valign="top"><?php echo $booking->profit; $profit = $booking->profit; ?></td>
          </tr>
        </table>
      </fieldset></td>
      </tr>
    <tr>
      <td colspan="2" align="left" valign="top"><fieldset>
        <legend>Services / Activities / Transfers</legend>
        <p>&nbsp;</p>
        <table width="747" border="0" class="table">
          <tr>
            <td id="services" colspan="2" align="left" valign="top">
            <?php if($services) {
				$output = '';
				$price = 0;
				foreach($services as $service) {
					echo '- ' . $service->pax . ' PAX ' . $service->activity . ' | Price per pax: ' . $service->price/$service->pax . 'L.E | Total Price: ' . $service->price . "<br />";
					$price += $service->price;
				}
			} else {
				echo 'No Services listed for this booking.';
			}
			?>
            </td>
          </tr>
          <tr>
            <th width="100" align="left" valign="top"><label>Total</label></th>
            <td id="total" width="262" align="left" valign="top"><?php echo $profit + $price; ?></td>
          </tr>
        </table>
        <p>&nbsp;</p>
        <table width="747" border="0" class="table">
          <tr>
            <th width="195" align="left" valign="top">Requested airport pickup</th>
            <td width="195" align="left" valign="top" id="pickup"><?php if($booking->pickup == 'Yes') echo 'Requested pickup'; ?></td>
          </tr>
          <tr>
            <th width="195" align="left" valign="top">Requested return transfer</th>
            <td align="left" valign="top" id="rpickup"><?php if($booking->rpickup == 'Yes') echo 'Requested return transfer'; ?></td>
          </tr>
        </table>
      </fieldset></td>
      </tr>
  </table>
  <p>&nbsp;</p>
  </div>
</div>
</body>
</html>
