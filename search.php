<?php require_once('_includes/initialize.php'); ?>
<?php 
// check if the user is logged in or not and store the url in a session variable to redirect 
// after user login

if (!$session->is_logged_in()) {
	$_SESSION['page'] = $_SERVER['PHP_SELF'];
	redirect_to("login.php"); 
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="_images/favicon.ico" >
<link href="_css/main_css.css" type="text/css" rel="stylesheet" />
<link href="_css/alert.css" type="text/css" rel="stylesheet" />
<link href="_css/calendar.css" type="text/css" rel="stylesheet" />
<link href="_css/mainMenu.css" type="text/css" rel="stylesheet" />
<title>Welcome to Hotel Booking System v1 (Beta Mode)</title>
<script type="text/javascript" src="_js/lib/core.js"></script>
<script type="text/javascript" src="_js/detectBrowser.js"></script>
<script type="text/javascript" src="_js/mainMenu.js"></script>
<script type="text/javascript" src="_js/locker.js"></script>
<script type="text/javascript" src="_js/availability.js"></script>
<script type="text/javascript" src="_js/calendar.js"></script>
<script type="text/javascript" src="_js/search.js"></script>
<script type="text/javascript" src="_js/alert.js"></script>
<script type="text/javascript" src="_js/followscroll.js"></script>
<script type="text/javascript" src="_js/countmail.js"></script>
<script type="text/javascript" src="_js/countRems.js"></script>
<script type="text/javascript" src="_js/countReqs.js"></script>
<script type="text/javascript" src="_js/chat.js"></script>
</head>

<body>
<div id="liveSupport">
<div id="msgContainer"><div id="returnmsg"></div>
<form id="frmchat">
<input type="text" name="chatmsg" id="chatmsg" />
</form></div>
<div id="onoff"><img src="_images/livesupport.png" width="15" height="17" align="top" />Live Support</div>
</div>
<div id="systemOverlay"></div>
<div id="systemAlert">
  <div id="alertImg"></div>
  <div id="alertMsg"></div>
  <div id="alertConfirm"><a href="#" id="alertOk">OK</a><a href="#" id="alertYes">YES</a><a href="#" id="alertNo">NO</a></div>
</div>
<div id="overlay"><form id="frmUnlock">
  <p>&nbsp;</p>
  <p>&nbsp;    </p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>
    <input type="password" name="unlockpass" id="unlockpass" />
</p>
  <p>
    <input type="submit" name="unlock" id="unlock" value="unlock" />
    </p>
<div id="unlockLoading"></div>
  <p>&nbsp;</p>
</form></div>
<div id="mainMenu">
<div id="mainMenuTitle">

  <a href="javascript:void(0);" title="Maximize the window" id="maximize"></a>
  <a href="javascript:void(0);" title="Collapse/Expand the Panel" id="collapse"></a>
  <a href="logout.php" title="logout" id="logoutX"></a>
  <a id="mainMenuLogout" href="logout.php"></a>
  <div id="userinfo"><p><img src="_images/userTop.png" width="18" height="17" align="top" /> User: <span class="blue"><?php $user = User::find_by_id($_SESSION['user_id']); echo $user->full_name(); ?></span>&nbsp; Logged In as: <span class="blue"><?php echo $user->privillage; ?></span>&nbsp; &nbsp;Today: 
    <span class="blue"><?php 
		    $timezone = new DateTimeZone( "Africa/Cairo" );
			$date = new DateTime();
			$date->setTimezone( $timezone );
			echo "Today is " . $date->format( 'l | F jS, Y | g:i A' );
	?></span>
  </p></div>
</div>
<div id="mainMenuTabs">
  <ul id="mainMenuTabsItems">
    <li><a href="#" class="menuTab selected">Front Office</a></li>
    <li><a href="#" class="menuTab">Records</a></li>
    <li><a href="#" class="menuTab">Statistics</a></li>
    <li><a href="#" class="menuTab">Accouting</a></li>
    <li><a href="#" class="menuTab">Settings</a></li>
  </ul>
</div>
<div id="mainMenuIconsContainer"><img src="_images/mainMenuIconsBG-LC.png" width="10" height="104" align="left" />
  <div id="mainMenuIconsBG">
    <div id="frontOffice" class="menuTabContent">
      <div class="block2" id="bookingBlock">
      <a href="room_chart.php">Room Chart</a>
      <a href="sys_inbox.php">Main Inbox<span id="countmail"></span></a>
      <a id="reminders" href="reminders.php">Reminders<span id="countreminders"></span></a>
      </div>
      <div class="block2" id="extrasBlock">
      <a href="guest_request.php" id="guestmessages">Requests<span id="countrequests"></span></a>
      <a href="#" id="housekeeping">Live Chat</a>
      <a id="logging" href="logging.php">Logging</a>
      </div>
      <div class="block" id="monthyearBlock">
      <select name="month" class="dropdown" id="month">
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
	  </select>
      <select name="year" class="dropdown" id="year">
          <option value="2009">2009</option>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
	  </select>
      </div>
      <div class="block" id="lockrefreshBlock">
      <a href="#" id="locker">Lock Panel</a>
      <a href="javascript:void(0);" id="refreshBtn">Refresh View</a>
      </div>
    </div>
    <div id="menuRecords" class="menuTabContent">
      <div class="block" id="dbBlock">
      <a href="db_records.php" id="allRecords">All records</a>
      <a href="email_records.php" id="directory">Directory</a>
      </div>
      <div class="block2" id="searchBlock">
      <a href="search.php" id="searchLink">Search</a>
      <a href="checkinout.php" id="checkinoutLink">Check In/Out</a>
      <a href="check_booking.php" id="availLink">Availability</a>
      </div>
    </div>
    <div id="menuStatistics" class="menuTabContent">
      <div class="block3" id="statisticsBlock">
      <a href="room_stats.php" id="roomsstat">Rooms</a>
      <a href="act_stats.php" id="actstat">Activities</a>
      <a href="av_stats.php" id="avstat">Availability</a>
      <a href="nat_stats.php" id="natstat">Nationalities</a>
      </div>
      <div class="block2" id="chartsBlock">
      <a href="all_graph.php" id="overallstat">Overall Charts</a>
      <a href="month_graph.php" id="monthstat">Month Charts</a>
      <a href="year_graph.php" id="yearstat">Year Charts</a>
      </div>
    </div>
    <div id="menuAccounting" class="menuTabContent">
      <div class="block" id="billingBlock">
      <a href="billing.php" id="billingLink">billing</a>
      <a href="all_chash.php" id="allcash">Total Cash</a>
      </div>
    </div>
    <div id="menuSettings" class="menuTabContent">
      <div class="block3" id="settingsBlock">
      <a href="settings.php#general" id="generalset">General</a>
      <a href="settings.php#rooms" id="roomsset">Rooms</a>
      <a href="settings.php#acts" id="servicesset">Services</a>
      <a href="settings.php#users" id="usersser">Users</a>
      </div>
    </div>
    <div id="loadingMSG"></div>
  </div>
  <img src="_images/mainMenuIconsBG-RC.png" width="10" height="104" /></div>
</div>
<div id="wrraper">
  <div id="searchbooking">
  <h1>Search Bookings</h1>
  <p>&nbsp;</p>
  <p>Use the search tool below to find your booking. You can search using customer names, room numbers, nationalities, arrival&nbsp;and departure dates, and passport numbers.</p>
  <p>&nbsp;</p>
  <form id="form1" name="form1" method="post" action="">
  <table width="700">
  <tr>
    <td width="121" align="left" valign="top"><label for="name">Customer Name:</label></td>
    <td width="240" align="left" valign="top"><input name="name" type="text" class="input" id="name" tabindex="10" /></td>
    <td width="117" align="left" valign="top"><label for="room">Room Number</label></td>
    <td width="202" align="left" valign="top"><input name="room" type="text" class="custominputbox" id="room" tabindex="20" /></td>
  </tr>
  <tr>
    <td align="left" valign="top"><label for="nationality">Nationality:</label></td>
    <td align="left" valign="top"><input name="nationality" type="text" class="input" id="nationality" tabindex="30" /></td>
    <td align="left" valign="top"><label for="bkref">Booking Reference</label></td>
    <td align="left" valign="top"><input name="bkref" type="text" class="custominputbox" id="bkref" tabindex="20" /></td>
  </tr>
  <tr>
    <td align="left" valign="top"><label for="pass">Passport</label></td>
    <td colspan="3" align="left" valign="top"><input name="pass" type="text" class="input" id="pass" tabindex="40" /></td>
  </tr>
  <tr>
    <td align="left" valign="top">&nbsp;</td>
    <td colspan="3" align="left" valign="top">&nbsp;</td>
  </tr>
  <tr>
    <td align="left" valign="top"><label for="arrDate">Arrival Date:</label></td>
    <td align="left" valign="top"><input name="arrDate" type="text" class="input" id="arrDate" tabindex="50" /></td>
    <td align="left" valign="top"><label for="depDate">Departure Date:</label></td>
    <td align="left" valign="top"><input name="depDate" type="text" class="input" id="depDate" tabindex="60" /></td>
  </tr>
</table>

  <p>&nbsp;    </p>
  <p>
    <input type="button" id="submit" name="submit" value="Search" />
  </p>
  </form>
  <div id="searchRsults"></div>
</div>
<div id="bookingDetails"></div>
</div>
<div id="systemOverlay"></div>
<div id="systemAlert">
  <div id="alertImg"></div>
  <div id="alertMsg"></div>
  <div id="alertConfirm"><a href="#" id="alertOk">OK</a><a href="#" id="alertYes">YES</a><a href="#" id="alertNo">NO</a></div>
</div>
<script type="text/javascript">calendar.set("arrDate");</script>
<script type="text/javascript">calendar.set("depDate");</script>
<div id="availability">
  <a href="javascript:void(0);" title="Close" id="avX"></a>
  <form id="avDates">
    <p class="menutitle"><strong>Please Select your Arrival/Departure dates to check rooms availability</strong></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <table width="359" border="0">
      <tr>
        <td width="18" height="22" align="left" valign="top"><p>&nbsp;</p></td>
        <td width="113" align="left" valign="top"><p>
          <label>Arrival Day</label>
        </p></td>
        <td width="236" align="left" valign="top"><input name="arr_date2" type="text" class="input" id="uarr_date" value="" /></td>
      </tr>
      <tr>
        <td height="22" align="left" valign="top">&nbsp;</td>
        <td height="22" align="left" valign="top"><p>
          <label>Departure Day</label>
        </p></td>
        <td align="left" valign="top"><input name="dep_date2" type="text" class="input" id="udep_date" /></td>
      </tr>
      <tr class="advSearch">
        <td height="19" align="left" valign="top"><p>&nbsp;</p></td>
        <td height="19" align="left" valign="top"><p>
          <label for="uroom_type">Type:</label>
        </p></td>
        <td align="left" valign="top"><select name="room_type" id="uroom_type" class="dropdown">
          <option value="">Select room type</option>
          <?php 
					  $types = RoomSetup::find_types();
					  while($type = $database->fetch_array($types)) {
						echo"<option value=\"{$type['room_type']}\" >{$type['room_type']}</option>";
					  } 
				  ?>
        </select></td>
      </tr>
      <tr class="advSearch">
        <td height="19" align="left" valign="top"><p>&nbsp;</p></td>
        <td height="19" align="left" valign="top"><p>
          <label for="uroom_cat2">Category:</label>
        </p></td>
        <td align="left" valign="top"><select name="room_cat" id="uroom_cat" class="dropdown">
          <option value="">Select room Category</option>
          <?php 
					  $cats = RoomSetup::find_cats();
					  while($cat = $database->fetch_array($cats)) {
						echo"<option value=\"{$cat['room_cat']}\" >{$cat['room_cat']}</option>";
					  } 
				  ?>
        </select></td>
      </tr>
      <tr>
        <td colspan="2" align="left" valign="top">&nbsp;</td>
        <td align="left" valign="top"><input type="button" name="check" id="ucheckAvBtn" value="Check Vailability" /></td>
      </tr>
    </table>
    <script type="text/javascript">calendar.set("uarr_date");</script>
    <script type="text/javascript">calendar.set("udep_date");</script>
  </form>
  <div id="avResults"></div>
</div>
<audio id="mailAudio" src="_alerts/message.wav" autobuffer="autobuffer"></audio>
</body>
</html>
