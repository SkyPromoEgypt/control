<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["put"])){
  header("Content-type: text/html; charset=utf-8");
  if(isset($_POST['user'])) {
	  $user = $_POST['user'];
	  $message = trim($_POST['msg']);
	  if($user && $message) {
		  chat($user, $user, $message);
		  echo 'done';
	  }
  } else {
	  $user = User::find_by_id($_SESSION['user_id']);
	  $user = $user->username;
	  $message = trim($_POST['msg']);
	  if($user && $message) {
		  chat($user, '', $message);
		  echo 'done';
	  } 
  }
	  
} else if(isset($_POST["get"])){
  header("Content-type: text/html; charset=utf-8");
  $file = SITE_ROOT.DS.'_chat'.DS.'chat.txt';
   if( file_exists($file) && is_readable($file) && $handle = fopen($file, 'r')) { 
		while(!feof($handle)) {
			$entry = fgets($handle);
			if(trim($entry) != "") {
				echo "{$entry}";
			}
		}
    fclose($handle);
   } else {
	   echo "Could not read from {$file}.";
   }
} else if(isset($_POST["clear"])){
  header("Content-type: text/html; charset=utf-8");
  $file = SITE_ROOT.DS.'_chat'.DS.'chat.txt';
   if( file_exists($file) && is_readable($file) && $handle = fopen($file, 'r')) {
	    file_put_contents($file, '');
    	fclose($handle);
   } else {
	   echo "Could not read from {$file}.";
   }
}
?>