<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["id"])){
  header("Content-type: text/html; charset=utf-8");
  $id = $_POST['id'];
  $result = Mail::find_by_id($id);
  if($result->status == 'read') {
	echo '<div class="emailControl"><img src="_images/delete.png" width="20" height="20" align="top" />&nbsp;<a href="#" onclick="mail.deleteEmail(event, ' . $result->id . ');">Delete</a>&nbsp;<img src="_images/markasread.jpg" width="20" height="20" align="top" />&nbsp;<a href="#" onclick="mail.mark(event, ' . $result->id . ', \'unread\');">Mark as unread</a></div>' . $result->body;  
  } else {
	echo '<div class="emailControl"><img src="_images/delete.png" width="20" height="20" align="top" />&nbsp;<a href="#" onclick="mail.deleteEmail(event, ' . $result->id . ');">Delete</a></div>' . $result->body; 
  }
}
?>