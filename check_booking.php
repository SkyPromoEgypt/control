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
<script type="text/javascript" src="_js/locker.js"></script>
<script type="text/javascript" src="_js/detectBrowser.js"></script>
<script type="text/javascript" src="_js/mainMenu.js"></script>
<script type="text/javascript" src="_js/check_availability.js"></script>
<script type="text/javascript" src="_js/userbooking.js"></script>
<script src="_js/calendar.js" type="text/javascript"></script>
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

        <div id="chkAvContainer"><form id="checkAvailability">
          <p><strong>Please Select your Arrival/Departure dates to check rooms availability</strong></p>
          <p>&nbsp;</p>
          <table width="381" border="0">
            <tr>
              <td width="94" height="30" align="left" valign="top"><label>Arrival Day</label></td>
              <td width="277" align="left" valign="top"><input name="arr_date" type="text" class="input" id="arr_date" value="" />
              </td>
            </tr>
            <tr>
              <td height="34" align="left" valign="top"><label>Departure Day</label></td>
              <td align="left" valign="top"><input name="dep_date" type="text" class="input" id="dep_date" /></td>
            </tr>
            <tr class="advSearch">
              <td height="19" align="left" valign="top"><label for="room_type">Type:</label></td>
              <td align="left" valign="top">
                <select name="room_type" id="room_type" class="dropdown">
                  <option value="">Select room type</option>
                  <?php 
					  $types = RoomSetup::find_types();
					  while($type = $database->fetch_array($types)) {
						echo"<option value=\"{$type['room_type']}\" >{$type['room_type']}</option>";
					  } 
				  ?>
                </select> 
              </td>
            </tr>
            <tr class="advSearch">
              <td height="19" align="left" valign="top"><label for="room_cat">Category:</label></td>
              <td align="left" valign="top">
                <select name="room_cat" id="room_cat" class="dropdown">
                  <option value="">Select room Category</option>
                  <?php 
					  $cats = RoomSetup::find_cats();
					  while($cat = $database->fetch_array($cats)) {
						echo"<option value=\"{$cat['room_cat']}\" >{$cat['room_cat']}</option>";
					  } 
				  ?>
                </select> 
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">&nbsp;</td>
              <td align="left" valign="top"><input type="button" name="check" id="checkAvBtn" value="Check Vailability" /></td>
            </tr>
            <tr>
              <td height="37" align="left" valign="top">&nbsp;</td>
              <td align="left" valign="middle"><p><a id="advancedSearch" href="#">Advanced Search.</a></p></td>
              
            </tr>
          </table><script type="text/javascript">calendar.set("arr_date");</script>
			<script type="text/javascript">calendar.set("dep_date");</script>
</form>
        
        <div id="bookingData"></div></div>
        <div id="bkformContainer">
          <form id="frmCustomerBooking" name="frmCustomerBooking" method="post" action="">
            <fieldset>
              <legend>Personal Details</legend>
              <p>&nbsp;</p>
              <table>
                <tr>
                  <td width="146"><label for="cname">Name:</label></td>
                  <td width="297"><input type="text" name="cname" tabindex="10" id="cname" class="input" /></td>
                </tr>
                <tr>
                  <td><label for="crmnames">Room Mates:<br />
                    separate names with &quot;,&quot;</label></td>
                  <td><input name="crmnames" type="text" class="input" id="crmnames" tabindex="20" /></td>
                </tr>
                <tr>
                  <td><label for="cemail">E-mail:</label></td>
                  <td><input name="cemail" type="text" class="input" tabindex="30"  id="cemail" /></td>
                </tr>
                <tr>
                  <td><label for="cnationality" class="label">Nationality:</label></td>
                  <td>
        <select name="cnationality" class="dropdown" tabindex="40" id="cnationality">
          <option>Select a Country</option>
          <option value="Afghanistan">Afghanistan</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="American Samoa">American Samoa</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Anguilla">Anguilla</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Antigua And Barbuda">Antigua And Barbuda</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Aruba">Aruba</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Barbados">Barbados</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Belize">Belize</option>
          <option value="Benin">Benin</option>
          <option value="Bermuda">Bermuda</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
          <option value="Botswana">Botswana</option>
          <option value="Bouvet Island">Bouvet Island</option>
          <option value="Brazil">Brazil</option>
          <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
          <option value="Brunei">Brunei</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Burkina Faso">Burkina Faso</option>
          <option value="Burundi">Burundi</option>
          <option value="Cambodia">Cambodia</option>
          <option value="Cameroon">Cameroon</option>
          <option value="Canada">Canada</option>
          <option value="Cape Verde">Cape Verde</option>
          <option value="Cayman Islands">Cayman Islands</option>
          <option value="Central African Republic">Central African Republic</option>
          <option value="Chad">Chad</option>
          <option value="Chile">Chile</option>
          <option value="China">China</option>
          <option value="Christmas Island">Christmas Island</option>
          <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
          <option value="Colombia">Colombia</option>
          <option value="Comoros">Comoros</option>
          <option value="Congo">Congo</option>
          <option value="Cook Islands">Cook Islands</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Cote D'Ivoire (Ivory Coast)">Cote D'Ivoire (Ivory Coast)</option>
          <option value="Croatia (Hrvatska)">Croatia (Hrvatska)</option>
          <option value="Cuba">Cuba</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="D.P.R. Korea">D.P.R. Korea</option>
          <option value="Dem Rep of Congo (Zaire)">Dem Rep of Congo (Zaire)</option>
          <option value="Denmark">Denmark</option>
          <option value="Djibouti">Djibouti</option>
          <option value="Dominica">Dominica</option>
          <option value="Dominican Republic">Dominican Republic</option>
          <option value="East Timor">East Timor</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Egypt">Egypt</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Equatorial Guinea">Equatorial Guinea</option>
          <option value="Eritrea">Eritrea</option>
          <option value="Estonia">Estonia</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
          <option value="Faroe Islands">Faroe Islands</option>
          <option value="Fiji">Fiji</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="French Guiana">French Guiana</option>
          <option value="French Polynesia">French Polynesia</option>
          <option value="French Southern Territories">French Southern Territories</option>
          <option value="Gabon">Gabon</option>
          <option value="Gambia">Gambia</option>
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="Ghana">Ghana</option>
          <option value="Gibraltar">Gibraltar</option>
          <option value="Greece">Greece</option>
          <option value="Greenland">Greenland</option>
          <option value="Grenada">Grenada</option>
          <option value="Guadeloupe">Guadeloupe</option>
          <option value="Guam">Guam</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guinea">Guinea</option>
          <option value="Guinea-Bissau">Guinea-Bissau</option>
          <option value="Guyana">Guyana</option>
          <option value="Haiti">Haiti</option>
          <option value="Heard and McDonald Islands">Heard and McDonald Islands</option>
          <option value="Honduras">Honduras</option>
          <option value="Hong Kong SAR, PRC">Hong Kong SAR, PRC</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Iran">Iran</option>
          <option value="Iraq">Iraq</option>
          <option value="Ireland">Ireland</option>
          <option value="Israel">Israel</option>
          <option value="Italy">Italy</option>
          <option value="Jamaica">Jamaica</option>
          <option value="Japan">Japan</option>
          <option value="Jordan">Jordan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kenya">Kenya</option>
          <option value="Kiribati">Kiribati</option>
          <option value="Korea">Korea</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Lao">Lao</option>
          <option value="Latvia">Latvia</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Lesotho">Lesotho</option>
          <option value="Liberia">Liberia</option>
          <option value="Libya">Libya</option>
          <option value="Liechtenstein">Liechtenstein</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Macao">Macao</option>
          <option value="Macedonia">Macedonia</option>
          <option value="Madagascar">Madagascar</option>
          <option value="Malawi">Malawi</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Maldives">Maldives</option>
          <option value="Mali">Mali</option>
          <option value="Malta">Malta</option>
          <option value="Marshall Islands">Marshall Islands</option>
          <option value="Martinique">Martinique</option>
          <option value="Mauritania">Mauritania</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Mayotte">Mayotte</option>
          <option value="Mexico">Mexico</option>
          <option value="Micronesia">Micronesia</option>
          <option value="Moldova">Moldova</option>
          <option value="Monaco">Monaco</option>
          <option value="Mongolia">Mongolia</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Morocco">Morocco</option>
          <option value="Mozambique">Mozambique</option>
          <option value="Myanmar">Myanmar</option>
          <option value="Namibia">Namibia</option>
          <option value="Nauru">Nauru</option>
          <option value="Nepal">Nepal</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Netherlands Antilles">Netherlands Antilles</option>
          <option value="New Caledonia">New Caledonia</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Niger">Niger</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Niue">Niue</option>
          <option value="Norfolk Island">Norfolk Island</option>
          <option value="Northern Mariana Islands">Northern Mariana Islands</option>
          <option value="Norway">Norway</option>
          <option value="Oman">Oman</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Palau">Palau</option>
          <option value="Panama">Panama</option>
          <option value="Papua new Guinea">Papua new Guinea</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Peru">Peru</option>
          <option value="Philippines">Philippines</option>
          <option value="Pitcairn">Pitcairn</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Puerto Rico">Puerto Rico</option>
          <option value="Qatar">Qatar</option>
          <option value="Reunion">Reunion</option>
          <option value="Romania">Romania</option>
          <option value="Russia">Russia</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Saint Kitts And Nevis">Saint Kitts And Nevis</option>
          <option value="Saint Lucia">Saint Lucia</option>
          <option value="Saint Vincent And The Grenadines">Saint Vincent And The
            
            Grenadines</option>
          <option value="Samoa">Samoa</option>
          <option value="San Marino">San Marino</option>
          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Senegal">Senegal</option>
          <option value="Seychelles">Seychelles</option>
          <option value="Sierra Leone">Sierra Leone</option>
          <option value="Singapore">Singapore</option>
          <option value="Slovak Republic">Slovak Republic</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Solomon Islands">Solomon Islands</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="Spain">Spain</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="St Helena">St Helena</option>
          <option value="St Pierre and Miquelon">St Pierre and Miquelon</option>
          <option value="Sudan">Sudan</option>
          <option value="Suriname">Suriname</option>
          <option value="Svalbard And Jan Mayen Islands">Svalbard And Jan Mayen Islands</option>
          <option value="Swaziland">Swaziland</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Syria">Syria</option>
          <option value="Taiwan">Taiwan</option>
          <option value="Tajikistan">Tajikistan</option>
          <option value="Tanzania">Tanzania</option>
          <option value="Thailand">Thailand</option>
          <option value="Togo">Togo</option>
          <option value="Tokelau">Tokelau</option>
          <option value="Tonga">Tonga</option>
          <option value="Trinidad And Tobago">Trinidad And Tobago</option>
          <option value="Tunisia">Tunisia</option>
          <option value="Turkey">Turkey</option>
          <option value="Turkmenistan">Turkmenistan</option>
          <option value="Turks And Caicos Islands">Turks And Caicos Islands</option>
          <option value="Tuvalu">Tuvalu</option>
          <option value="Uganda">Uganda</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="United States Minor Outlying Islands">United States Minor
            
            Outlying Islands</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Vanuatu">Vanuatu</option>
          <option value="Vatican City State (Holy See)">Vatican City State (Holy See)</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Virgin Islands (British)">Virgin Islands (British)</option>
          <option value="Virgin Islands (US)">Virgin Islands (US)</option>
          <option value="Wallis And Futuna Islands">Wallis And Futuna Islands</option>
          <option value="Western Sahara">Western Sahara</option>
          <option value="Yemen">Yemen</option>
          <option value="Yugoslavia">Yugoslavia</option>
          <option value="Zambia">Zambia</option>
          <option value="Zimbabwe">Zimbabwe</option>
        </select></td>
                </tr>
              </table>
              <input type="hidden" name="carr_date" id="carr_date" />
              <input type="hidden" name="cdep_date" id="cdep_date" />
              <input type="hidden" name="bkSource" id="bkSource" value="Our Website" />
              <input type="hidden" name="roomPrice" id="roomPrice" />
              <input type="hidden" name="season" id="season" value="Normal" />
              <input type="hidden" name="discount" id="discount" value="0" />
            </fieldset>
            <fieldset>
            <legend>Passport and Visa Details</legend>
            <p>&nbsp;</p>
            <table width="451">
              <tr>
                <td width="150"><label for="cdob">Date of Birth:</label></td>
                <td width="289"><input name="cdob" type="text" class="input" id="cdob" tabindex="50" /><script type="text/javascript">calendar.set("cdob");</script></td>
              </tr>
              <tr>
                <td><label for="cpass">Passport#:</label></td>
                <td><input name="cpass" type="text" class="input" id="cpass" tabindex="60" /></td>
              </tr>
              <tr>
                <td><label for="cdoe">Egypt date of entry:</label></td>
                <td><input name="cdoe" type="text" class="input" id="cdoe" tabindex="70" /><script type="text/javascript">calendar.set("cdoe");</script></td>
              </tr>
              <tr>
                <td><label for="eboe">Egypt border of entry:</label></td>
                <td><input name="eboe" type="text" class="input" id="eboe" tabindex="80" /></td>
              </tr>
              <tr>
                <td><label for="pov">Period of VISA</label></td>
                <td><input name="pov" type="text" class="input" id="pov" tabindex="90" /></td>
              </tr>
            </table>
            </fieldset>
            <fieldset>
            <legend>Requested Services</legend>
            <p>&nbsp;</p>
            <table width="517">
              <tr id="services">
                <td height="149" colspan="2" align="left" valign="top"><label for="multi" class="label"><strong>Services/Activities</strong><br />
                  please choose your service/activity from the list and enter how many pax then press add.
                      <br />
                      <br />
                </label>
                  
                    <select name="actlist" class="dropdown" id="actlist" style="width:350px;">
                      <?php 
					  $activities = Activities::find_all();
					  foreach($activities as $activity) {
						echo'<option value="' . $activity->activity . '">' . $activity->activity . ' | ' . $activity->price . 'L.E' . '</option>';
					  } 
				?>
                    </select> <label for="pax" class="label">Pax</label>                  <input name="pax" type="text" class="custominputbox" id="pax" />
                    &nbsp;  <input type="button" id="submitActivity" name="submitActivity" value="Add" />
                    <p>&nbsp;</p>
                    <div id="addedServices"></div>
                    </td>
              </tr>
              <tr>
                <td width="150" height="36" align="left" valign="bottom">&nbsp;</td>
                <td width="289" align="left" valign="bottom"><input type="checkbox" name="pickup" id="pickup" tabindex="110" />
                <label for="pickup">Request Airport Pickup</label></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td><input type="checkbox" name="returnPickup" id="returnPickup" tabindex="120" />
                <label for="returnPickup">Request Return Transfer</label></td>
              </tr>
              <tr>
                <td><label for="requests" class="label">Additional Requests:</label></td>
                <td><textarea name="requests" class="notes" id="requests" tabindex="130"></textarea></td>
              </tr>
            </table>
            <div id="bookingStatus"></div>
            <input type="button" id="submitBooking" value="Submit Booking" tabindex="140" />
            </fieldset>
          </form>
</div>
</div>
<audio id="mailAudio" src="_alerts/message.wav" autobuffer="autobuffer"></audio>
</body>
</html>
