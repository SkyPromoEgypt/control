<?php

// Directory separator is a pre-defined constant that uses the "\" for UNIX and "/" for WINDOWS
defined('DS') 		    	? null : define('DS', DIRECTORY_SEPARATOR);

// This constant defines the site root 
defined('SITE_ROOT')	    ? null : define('SITE_ROOT', DS.'wamp'.DS.'www'.DS.'control');

// This constant defines the liberary path
defined('LIB_PATH') 	    ? null : define('LIB_PATH', SITE_ROOT.DS.'_includes');

// Setting reporting errors for the applicaton
error_reporting(E_ALL & ~(E_STRICT | E_NOTICE | E_DEPRECATED));

// First load config file
require_once(LIB_PATH.DS.'config.php');
require_once(LIB_PATH.DS.'settings.php');

// First load functions so that everything after can use them
require_once(LIB_PATH.DS.'functions.php');

// First core objects
require_once(LIB_PATH.DS.'session.php');
require_once(LIB_PATH.DS.'database.php');
require_once(LIB_PATH.DS.'database_object.php');
require_once(LIB_PATH.DS.'pagination.php');


// First load database-related classes
require_once(LIB_PATH.DS.'user.php');
require_once(LIB_PATH.DS.'room.php');
require_once(LIB_PATH.DS.'roomsetup.php');
require_once(LIB_PATH.DS.'roomtypes.php');
require_once(LIB_PATH.DS.'roomcats.php');
require_once(LIB_PATH.DS.'activities.php');
require_once(LIB_PATH.DS.'actrecords.php');
require_once(LIB_PATH.DS.'reminder.php');
require_once(LIB_PATH.DS.'mail.php');
require_once(LIB_PATH.DS.'guestrequests.php');


// Calender Class
require_once(LIB_PATH.DS.'calender.php');


?>