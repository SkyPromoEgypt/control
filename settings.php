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
<link href="_css/calendar.css" type="text/css" rel="stylesheet" />
<title>Welcome to Hotel Booking System v1 (Beta Mode)</title>
<script type="text/javascript" src="_js/lib/core.js"></script>
<script type="text/javascript" src="_js/lib/php.js"></script>
<script type="text/javascript" src="_js/detectBrowser.js"></script>
<script type="text/javascript" src="_js/calendar.js"></script>
<script type="text/javascript" src="_js/mainMenu.js"></script>
<script type="text/javascript" src="_js/locker.js"></script>
<script type="text/javascript" src="_js/availability.js"></script>
<script type="text/javascript" src="_js/calendar.js"></script>
<script type="text/javascript" src="_js/settings.js"></script>
<script type="text/javascript" src="_js/ctabs.js"></script>
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
<div id="overlay">
<form id="frmUnlock">
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
</form>
</div>
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
      <a href="settings.php#general" id="generalset" class="ctabs">General</a>
      <a href="settings.php#rooms" id="roomsset" class="ctabs">Rooms</a>
      <a href="settings.php#acts" id="servicesset" class="ctabs">Services</a>
      <a href="settings.php#users" id="usersser" class="ctabs">Users</a>
      </div>
    </div>
    <div id="loadingMSG"></div>
  </div>
  <img src="_images/mainMenuIconsBG-RC.png" width="10" height="104" /></div>
</div>
<div id="wrraper">
  <div id="settingsContainer">
    <div id="generalSettings" class="tabDiv">
      <h2>General Settings</h2>
    <p>Modify Hotel Booking System General Settings Here.</p>
    <p>&nbsp;</p>
    <div style="overflow:hidden">
      <div id="generalControls">
        <table width="500">
          <tr>
          <td width="230" align="left" valign="top">&nbsp;</td>
          <td width="258">&nbsp;</td>
        </tr>
        <tr>
          <td align="left" valign="top">&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="left" valign="top"></td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td width="230" align="left" valign="top">&nbsp;</td>
          <td width="258">&nbsp;</td>
        </tr>
        <tr>
          <td width="230" align="left" valign="top">&nbsp;</td>
          <td width="258">&nbsp;</td>
        </tr>
        <tr>
          <td width="230" align="left" valign="top">&nbsp;</td>
          <td width="258">&nbsp;</td>
        </tr>
  </table>
    </div></div>
</div>
  <div id="roomSettings" class="tabDiv">
    <h2>Rooms Settings</h2>
    <p>Add, Edit and Delete you rooms in this section</p>
    <p>&nbsp;</p>
    <div style="overflow:hidden"><div id="roomControls">
      <h1>Add / Edit Rooms:</h1>
      <p>Please enter the room details and presss add / edit </p>
      <p>to submit the record to the database.</p>
      <p>&nbsp;</p>
      <table width="500">
        <tr>
          <td width="230" align="left" valign="top"><label for="roomNO">Room Number:</label></td>
          <td width="258"><input name="roomNO" type="text" class="custominputbox" id="roomNO" /></td>
        </tr>
        <tr>
          <td align="left" valign="top"><label for="roomtypes">Room Type:</label><div id="typeLoading"></div></td>
          <td><select name="roomtypes" class="dropdown" id="roomtypes">
            
          </select></td>
        </tr>
        <tr>
          <td align="left" valign="top"><label for="roomcats">Room Category:</label><div id="catLoading"></div></td>
          <td><select name="roomcats" class="dropdown" id="roomcats">
            
          </select></td>
        </tr>
        <tr>
          <td width="230" align="left" valign="top"><label for="normalprice">Price in Normal Days:</label></td>
          <td width="258"><input name="normalprice" type="text" class="custominputbox" id="normalprice" /></td>
        </tr>
        <tr>
          <td width="230" align="left" valign="top"><label for="localprice">Price in Local Seasons:</label></td>
          <td width="258"><input name="localprice" type="text" class="custominputbox" id="localprice" /></td>
        </tr>
        <tr>
          <td width="230" align="left" valign="top"><label for="highprice">Price in high Seasons:</label></td>
          <td width="258"><input name="highprice" type="text" class="custominputbox" id="highprice" /></td>
        </tr>
        <tr>
          <td><p>&nbsp;
            </p>
            <p>
              <input type="button" id="addroom" name="addroom" value="Add Room" />
              <input type="button" id="resetroom" name="resetroom" value="Reset" />
              <input type="button" id="delroom" name="delroom" value="Delete Room" />
            </p></td>
          <td id="loadingRoomResults">&nbsp;</td>
          </tr>
      </table>
    </div>
    <div id="roomList"></div></div>
    <div style="overflow:hidden; margin-top:30px;">
    <div id="typecontrol">
      <h1>Add/Edit Room Types:</h1>
      <p>Please enter the room type and presss add / edit </p>
      <p>to submit the record to the databas</p>
      <p>&nbsp;</p>
      <table width="500">
        <tr>
          <td width="74" height="38" align="left" valign="top"><label for="typename">Room Type:</label></td>
          <td width="200" align="left" valign="top"><input name="typename" type="text" class="input" id="typename" /></td>
          <td width="210" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><p>
            <input type="button" id="addtype" name="addtype" value="Add Type" />
              <input type="button" id="resettype" name="resettype" value="Reset" />
              <input type="button" id="deltype" name="deltype" value="Delete Type" />
            </p></td>
          <td id="loadingTypeResults">&nbsp;</td>
        </tr>
    </table>
    </div>
    <div id="typelist"></div>
    </div>
    <div style="overflow:hidden; margin-top:30px;">
    <div id="catcontrol">
      <h1>Add/Edit Room Categoris:</h1>
      <p>Please enter the room category and presss add / edit </p>
      <p>to submit the record to the databas</p>
      <p>&nbsp;</p>
      <table width="500">
        <tr>
          <td width="95" height="38" align="left" valign="top"><label for="catname">Room Category:</label></td>
          <td width="200" align="left" valign="top"><input name="catname" type="text" class="input" id="catname" /></td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><p>
            <input type="button" id="addcat" name="addcat" value="Add Category" />
              <input type="button" id="resetcat" name="resetcat" value="Reset" />
              <input type="button" id="delcat" name="delcat" value="Delete Category" />
            </p></td>
          <td id="loadingCatResults">&nbsp;</td>
        </tr>
    </table>
    </div>
    <div id="catlist"></div>
    </div>
</div>
  <div id="actSettings" class="tabDiv">
    <h2>Activities / Services Settings</h2>
    <p>Add, Edit and Delete you activities/services in this section</p>
    <p>&nbsp;</p>
    <div id="actControls">
      <table width="500">
        <tr>
          <td width="95" height="38" align="left" valign="top"><label for="actname">Activity Description:</label></td>
          <td width="200" align="left" valign="top"><input name="actname" type="text" class="input" id="actname" /></td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td height="41" align="left" valign="top"><label for="actprice">Activity Price:</label></td>
          <td align="left" valign="top"><input name="actprice" type="text" class="custominputbox" id="actprice" /></td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><p>
            <input type="button" id="addact" name="addact" value="Add" />
            <input type="button" id="resetact" name="resetact" value="Reset" />
            <input type="button" id="delact" name="delact" value="Delete" />
          </p></td>
          <td id="loadingActResults">&nbsp;</td>
        </tr>
      </table>
      <p>&nbsp;</p>
</div>
    <div id="actlist"></div>
<p>&nbsp;</p>
  </div>
  <div id="userSettings" class="tabDiv">
    <h2>Users Settings</h2>
    <p>Add, Edit and Delete you pannel users in this section</p>
    <p>&nbsp;</p>
    <div id="userControls">
      <table width="500">
        <tr>
          <td width="95" height="38" align="left" valign="top"><label for="username">Username:</label></td>
          <td width="200" align="left" valign="top"><input name="username" type="text" class="input" id="username" /></td>
          <td width="189" align="left" valign="top" id="checkUserAvailable">&nbsp;</td>
        </tr>
        <tr>
          <td height="41" align="left" valign="top"><label for="userpass">Password:</label></td>
          <td align="left" valign="top"><input name="userpass" type="password" class="input" id="userpass" /></td>
          <td align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td height="41" align="left" valign="top"><label for="firstname">First Name:</label></td>
          <td align="left" valign="top"><input name="firstname" type="text" class="input" id="firstname" /></td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td height="41" align="left" valign="top"><label for="lastname">Last Name:</label></td>
          <td align="left" valign="top"><input name="lastname" type="text" class="input" id="lastname" /></td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td height="41" align="left" valign="top"><label for="birthday">Birth Date:</label></td>
          <td align="left" valign="top"><input name="birthday" type="text" class="input" id="birthday" /></td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td height="41" align="left" valign="top"><label for="address">Address:</label></td>
          <td align="left" valign="top"><input name="address" type="text" class="input" id="address" /></td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td height="41" align="left" valign="top"><label for="phone">Phone:</label></td>
          <td align="left" valign="top"><input name="phone" type="text" class="input" id="phone" /></td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td height="41" align="left" valign="top"><label for="job">Job
            :</label></td>
          <td align="left" valign="top"><input name="job" type="text" class="input" id="job" /></td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td height="41" align="left" valign="top"><label for="sallary">Sallary:</label></td>
          <td align="left" valign="top"><input name="sallary" type="text" class="custominputbox" id="sallary" /></td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td height="41" align="left" valign="top"><label for="privilege">Privilege
            :</label></td>
          <td align="left" valign="top">
          <select id="privilege" name="privilege" class="dropdown">
          <option value="Administrator">Administrator</option>
          <option value="Accountant">Accountant</option>
          <option value="User">User</option>
          </select>
          </td>
          <td width="189" align="left" valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="2"><p>
            <input type="button" id="adduser" name="adduser" value="Add" />
            <input type="button" id="resetuser" name="resetuser" value="Reset" />
            <input type="button" id="deluser" name="deluser" value="Delete" />
            </p></td>
          <td id="loadingUserResults">&nbsp;</td>
        </tr>
      </table>
      <p>&nbsp;</p>
</div>
    <div id="userlist"></div>
<p>&nbsp;</p>
  </div>
</div>
</div>
<div id="systemOverlay"></div>
<div id="systemAlert">
  <div id="alertImg"></div>
  <div id="alertMsg"></div>
  <div id="alertConfirm"><a href="#" id="alertOk">OK</a><a href="#" id="alertYes">YES</a><a href="#" id="alertNo">NO</a></div>
</div>
<script type="text/javascript">calendar.set("birthday");</script>
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