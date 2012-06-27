<?php require_once('../_includes/initialize.php'); ?>
<?php
if(isset($_POST["types"])){
	header("Content-type: text/xml; charset=utf-8");
    $types = RoomTypes::find_all();
    echo '<?xml version="1.0" encoding="utf-8"?>';
	echo '<types>';
    foreach($types as $type) {
		echo '<type>';
		foreach($type as $tag => $value) {
			
			echo '<' . $tag . '>';
			echo $value;
			echo '</' . $tag . '>';
			
		}
		echo '</type>';
	}
	echo '</types>';
} else {
	header("Content-type: text/xml; charset=utf-8");
    $cats = RoomCats::find_all();
    echo '<?xml version="1.0" encoding="utf-8"?>';
	echo '<cats>';
    foreach($cats as $cat) {
		echo '<cat>';
		foreach($cat as $tag => $value) {
			
			echo '<' . $tag . '>';
			echo $value;
			echo '</' . $tag . '>';
			
		}
		echo '</cat>';
	}
	echo '</cats>';
}
?>