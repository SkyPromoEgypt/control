<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["id"])){
  header("Content-type: text/html; charset=utf-8");
  if(isset($_POST['create'])) {
	  $user = new User();
	  $user->username = $_POST['userName'];
	  $user->hashed_password = sha1($_POST['userPass']);
	  $user->password = $_POST['userPass'];
	  $user->first_name = $_POST['userfName'];
	  $user->last_name = $_POST['userlName'];
	  $user->birthdate = $_POST['userDob'];
	  $user->address = $_POST['userAddress'];
	  $user->phone = $_POST['userPhone'];
	  $user->job = $_POST['userJob'];
	  $user->salary = $_POST['userSallary'];
	  $user->privillage = $_POST['userPrivilege'];
	  if($user->create()) {
		 echo 'done'; 
	  }
  } else if(isset($_POST['update'])) {
	  $user = User::find_by_id($_POST["id"]);
	  $user->username = $_POST['userName'];
	  $user->hashed_password = sha1($_POST['userPass']);
	  $user->password = $_POST['userPass'];
	  $user->first_name = $_POST['userfName'];
	  $user->last_name = $_POST['userlName'];
	  $user->birthdate = $_POST['userDob'];
	  $user->address = $_POST['userAddress'];
	  $user->phone = $_POST['userPhone'];
	  $user->job = $_POST['userJob'];
	  $user->salary = $_POST['userSallary'];
	  $user->privillage = $_POST['userPrivilege'];
	  if($user->update()) {
		 echo 'done'; 
	  }
  } else {
	  $user = User::find_by_id($_POST["id"]);
	  if($user->delete()) {
		  echo 'done';
	  }
  }
}
?>