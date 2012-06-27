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
<link rel="shortcut icon" href="_images/favicon.ico" />
<link href="_css/main_css.css" type="text/css" rel="stylesheet" />
<link href="_css/alert.css" type="text/css" rel="stylesheet" />
<link href="_css/calendar.css" type="text/css" rel="stylesheet" />
<link href="_css/mainMenu.css" type="text/css" rel="stylesheet" />
<title>Welcome to Hotel Booking System v1 (Beta Mode)</title>
<script type="text/javascript" src="_js/lib/core.js"></script>
<script type="text/javascript" src="_js/lib/php.js"></script>
<script type="text/javascript" src="_js/detectBrowser.js"></script>
<script type="text/javascript" src="_js/mainMenu.js"></script>
<script type="text/javascript" src="_js/locker.js"></script>
<script type="text/javascript" src="_js/availability.js"></script>
<script type="text/javascript" src="_js/quickextend.js"></script>
<script type="text/javascript" src="_js/monthlyBooking.js"></script>
<script type="text/javascript" src="_js/booking.js"></script>
<script type="text/javascript" src="_js/drag.js"></script>
<script type="text/javascript" src="_js/calendar.js"></script>
<script type="text/javascript" src="_js/alert.js"></script>
<script type="text/javascript" src="_js/followscroll.js"></script>
<script type="text/javascript" src="_js/countmail.js"></script>
<script type="text/javascript" src="_js/countRems.js"></script>
<script type="text/javascript" src="_js/countReqs.js"></script>
<script type="text/javascript" src="_js/context.js"></script>
<script type="text/javascript" src="_js/tooltip.js"></script>
<script type="text/javascript" src="_js/chat.js"></script>

</head>

<body>

<div id="systemOverlay"></div>
<div id="systemAlert">
  <div id="alertImg"></div>
  <div id="alertMsg"></div>
  <div id="alertConfirm"><a href="#" id="alertOk">OK</a><a href="#" id="alertYes">YES</a><a href="#" id="alertNo">NO</a></div>
</div>
<div id="liveSupport">
<div id="msgContainer"><div id="returnmsg"></div>
<form id="frmchat">
<input type="text" name="chatmsg" id="chatmsg" />
</form></div>
<div id="onoff"><img src="_images/livesupport.png" width="15" height="17" align="top" />Live Support</div>
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
<div id="wrraper">
<div id="feedback" class="drag">
  <div id="feedbackClose"><a href="#" name="feedbackClosebtn" id="feedbackClosebtn"></a></div>
  <a id="deleteRecord" href="#"><img src="_images/delete.png" width="20" height="20" align="top" /> Delete Booking</a>
  <a id="showServices" href="#"><img src="_images/services.gif" width="20" height="20" align="top" /> Show Services</a>
  <a id="openBooking" href="#"><img src="_images/open.png" width="20" height="20" align="top" /> Open Booking</a>
  <div id="bookedBy"></div>
  <form method="post" id="frmbooking">
  <table width="808">
    <tr align="left" valign="top">
      <td width="392" height="180"><fieldset class="fieldsetwidth">
  <legend>Customer Information:</legend>
  <p>&nbsp;</p>
  <table width="401" border="0">
    <tr>
      <td width="132"><p>
        <label for="name2" class="label">Customer Name:&nbsp; </label>
      </p></td>
      <td width="258"><input name="name" type="text" class="input" id="name" tabindex="10" value="" /></td>
    </tr>
    <tr>
      <td><p>
        <label for="rmnames" class="label">Room Mates:<br />
        </label>
      </p></td>
      <td><input name="rmnames" type="text" class="input" id="rmnames" tabindex="20" /></td>
    </tr>
    <tr>
      <td><p>
        <label for="email3" class="label">Customer Email: &nbsp;</label>
      </p></td>
      <td><input name="email" type="text" tabindex="20" class="input" id="email" value="" /></td>
    </tr>
    <tr>
      <td height="21"><p>
        <label for="nationality2" class="label">Nationality: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </label>
      </p></td>
      <td><p><select name="nationality" class="dropdown" tabindex="30" id="nationality">
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
      </select></p></td>
    </tr>
  </table>
  <p>&nbsp; </p>
  <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
  </fieldset></td>
      <td width="380"><fieldset class="fieldsetwidth2">
      <legend>Date Information:</legend>
      <p>&nbsp;</p>
      <p><strong>Please Choose the Arrival and The Departure dates</strong></p>
      <p>&nbsp;</p>
      <table border="0">
        <tr>
          <td align="left" valign="top"><p><strong>
            <label class="label"> Arrival Day   &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
              </label>
          </strong></p></td>
          <td align="left" valign="top"><strong>
            <input name="arr_date" type="text" tabindex="40" class="input" id="arr_date" value="" />
			<script type="text/javascript">calendar.set("arr_date");</script>
          </strong></td>
        </tr>
        <tr>
          <td align="left" valign="top"><p><strong>
            <label class="label">Departure Day&nbsp;
              
            </label>
          </strong></p></td>
          <td align="left" valign="top"><strong>
            <input name="dep_date" type="text" tabindex="50" class="input" id="dep_date" />
			<script type="text/javascript">calendar.set("dep_date");</script>
          </strong></td>
        </tr>
      </table>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      </fieldset></td>
    </tr>
    <tr align="left" valign="top">
      <td><fieldset class="fieldsetwidth">
        <legend>Passport and Visa Details</legend>
        <p>&nbsp;</p>
        <table width="400">
          <tr>
            <td width="138"><p>
              <label for="dob" class="label">Date of Birth:</label>
            </p></td>
            <td width="250"><input name="dob" type="text" class="input" id="dob" tabindex="50" />
              <script type="text/javascript">calendar.set("dob");</script></td>
          </tr>
          <tr>
            <td><p>
              <label for="pass" class="label">Passport#:</label>
            </p></td>
            <td><input name="pass" type="text" class="input" id="pass" tabindex="60" /></td>
          </tr>
          <tr>
            <td><p>
              <label for="doe" class="label">Egypt date of entry:</label>
            </p></td>
            <td><input name="doe" type="text" class="input" id="doe" tabindex="70" />
              <script type="text/javascript">calendar.set("doe");</script></td>
          </tr>
          <tr>
            <td><p>
              <label for="boe" class="label">Egypt border of entry:</label>
            </p></td>
            <td><input name="boe" type="text" class="input" id="boe" tabindex="80" /></td>
          </tr>
          <tr>
            <td><p>
              <label for="pov" class="label">Period of VISA</label>
            </p></td>
            <td><input name="pov" type="text" class="input" id="pov" tabindex="90" /></td>
          </tr>
        </table>
      </fieldset></td>
      <td><fieldset class="fieldsetwidth2">
      <legend>Room Details:</legend>
      <p>&nbsp;</p>
      <table border="0">
        <tr>
          <td width="101" align="left" valign="top"><p>
            <label for="bookedthrough2" class="label">Booked Through:&nbsp; </label>
          </p></td>
          <td width="233" align="left" valign="top"><p><select name="bookedthrough" class="dropdown" id="bookedthrough" tabindex="60">
            <option value="">Select the reservation source</option>
            <option value="Our Website">Our Website</option>
            <option value="Hostel World">Hostel World</option>
            <option value="Hostel Bookers">Hostel Bookers</option>
            <option value="Telephone">Phone Call</option>
            <option value="Agent">Agent / Tourism Company</option>
          </select></p></td>
        </tr>
        <tr>
          <td align="left" valign="top"><p>
            <label for="roomprice2" class="label">Room Price:&nbsp;</label>
</p></td>
          <td align="left" valign="top">
            <p> <input type="text" class="custominputbox" name="roomprice" id="roomprice" />(type a value if the rate is not fixed).
              <label for="roomprice5" class="label">&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; </label>
  &nbsp;</p></td>
        </tr>
        <tr>
          <td align="left" valign="top"><p>
            <label for="season2" class="label">Season:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; </label>
          </p></td>
          <td align="left" valign="top"><p><select name="season" class="dropdown" id="season" tabindex="90">
            <option value="">Select the season time</option>
            <option value="Normal">Normal</option>
            <option value="Local">Local</option>
            <option value="High">High</option>
          </select></p></td>
        </tr>
        <tr>
          <td align="left" valign="top"><p>
            <label for="discount2" class="label">Discount given:&nbsp;&nbsp;&nbsp; &nbsp; </label>
          </p></td>
          <td align="left" valign="top"><p><input name="discount" type="text" class="custominputbox" id="discount" tabindex="100" value="" size="5" /></p></td>
        </tr>
      </table>
      </fieldset></td>
    </tr>
    <tr></tr>
  </table>

    
    <fieldset class="fieldsetwidth3">
      <legend>Finish Booking</legend>
      <p>&nbsp;</p>
      <table width="649" border="0">
        <tr>
          <td width="128" align="left" valign="top"><p>
            <label for="requests2" class="label">Additional Requests:</label>
          </p></td>
          <td align="left" valign="top"><textarea name="notes" class="notes" id="notes" tabindex="130"></textarea></td>
          </tr>
        <tr>
          <td align="left" valign="top"><p><strong>Requested<br />
Services:</strong></p></td>
          <td align="left" valign="top"><p class="label">
            <input type="checkbox" name="pickup" id="pickup" tabindex="110" />
            <label for="pickup">Request Airport Pickup</label>
          </p>
            <p class="label">
              <input type="checkbox" name="returnPickup" id="returnPickup" tabindex="120" />
              <label for="returnPickup4">Request Return Transfer</label>
            </p>
            <p class="label">
              <input type="checkbox" name="notify" id="notify" />
              <label for="confirmEmail3">Send a confirmation mail to the customer</label>
            </p></td>
        </tr>
      </table>
      <div id="bookingStatus"></div>
      <input type="button" id="submit" value="Add Booking" tabindex="140" />
    </fieldset>
    <p>&nbsp;</p>
    
  </form>
  <form method="post" id="frmactivities">
    <fieldset class="fieldsetwidth3">
    <legend>Services and Activities</legend>
    <p>&nbsp;</p>
    <p class="orange"><strong>Add activity</strong></p>
    <p> choose the ctivity from the activities list, define how many pax are interested&nbsp;then type you price. If you have a fixed price leave it blank.</p>
    <p>&nbsp;</p>
    <p>
      <input type="radio" name="radio" id="enableList" value="enableList" checked="checked" />
      <label for="enableList">Choose from a list</label>
   &nbsp; &nbsp;&nbsp; &nbsp; 
   <input type="radio" name="radio" id="enableCustom" value="enableCustom" />
   <label for="enableCustom">Type a custom services / activity</label>
    </p>
    <p>&nbsp;</p>
<select name="actlist" class="dropdown" id="actlist" style="width:350px;">
  <?php 
					  $activities = Activities::find_all();
					  foreach($activities as $activity) {
						echo'<option value="' . $activity->activity . '">' . $activity->activity . '</option>';
					  } 
				?>
</select>
      &nbsp;
      <label for="pax" class="label">Pax</label>
      <input name="pax" type="text" class="custominputbox" id="pax" />
      &nbsp; 
      <label for="actprice" class="label">Price per pax:</label>
      <input name="actprice" type="text" class="custominputbox" id="actprice" />
      &nbsp; &nbsp;<input type="button" id="submitActivity" name="submitActivity" value="Add Activity" />
    <p>&nbsp;</p>
<input name="customService" type="text" class="input" id="customService" />
    
    <p>&nbsp;</p><p class="orange"><strong>Activities List</strong></p>
 <div id="activitiesResults"></div>
 <p>&nbsp;</p><p>&nbsp;</p>
 <div id="editservice">
 <div id="currentEdit"></div>
 <label class="label" for="editpax">Pax:</label><input type="text" class="custominputbox" id="editpax" name="editpax" />
 <label class="label" for="editprice">Price per pax:</label><input type="text" class="custominputbox" id="editprice" name="editprice" /> 
&nbsp; <input type="button" id="editservicesubmit" value="Edit Service" /></div>
</fieldset>
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
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
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
      <div class="mycontrol" id="monthControls"> 
      <a id="prevMonth" href="#"><img src="_images/prev.png" width="18" height="20" /></a>
      <a id="nextMonth" href="#"><img src="_images/next.png" width="18" height="20" /></a>
      </div>
      <div class="mycontrol" id="yearControls">
      <a id="prevYear" href="#"><img src="_images/prev.png" width="18" height="20" /></a>
      <a id="nextYear" href="#"><img src="_images/next.png" width="18" height="20" /></a>
      </div>
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
<div id="data"></div>
<input id="userPrivilege" type="hidden" value="<?php if($user->privillage == "Administrator") { echo 'Administrator'; }?>" />
</div>
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
<div id="exOverlay"></div><div id="extend">
<a href="javascript:void(0);" title="Close" id="extX"></a>
<form id="exDates">
    <p class="menutitle"><strong>Choose Arival / Departure dates and press update</strong></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <table width="359" border="0">
      <tr>
        <td width="96" height="22" align="left" valign="top"><p>
            <label>Arrival Day</label>
        </p></td>
        <td width="253" align="left" valign="top"><input name="earr_date" type="text" class="input" id="earr_date" value="" /></td>
      </tr>
      <tr>
        <td height="22" align="left" valign="top"><p>
          <label>Departure Day</label>
        </p></td>
        <td align="left" valign="top"><input name="edep_date" type="text" class="input" id="edep_date" /></td>
      </tr>
      <tr>
        <td height="43" rowspan="2" align="left" valign="top">&nbsp;</td>
        <td height="30" align="left" valign="top" id="exLoading">&nbsp;</td>
      </tr>
      <tr>
        <td align="left" valign="bottom"><input type="button" name="eupdateBtn" id="eupdateBtn" value="Update Booking" /></td>
      </tr>
    </table>
    <script type="text/javascript">calendar.set("earr_date");</script>
    <script type="text/javascript">calendar.set("edep_date");</script>
  </form>
</div>
<div id="loadingBox"><img src="_images/loadingBar.gif" width="220" height="19" /></div>
<audio id="mailAudio" src="_alerts/message.wav" autobuffer="autobuffer"></audio>
</body>
</html>
