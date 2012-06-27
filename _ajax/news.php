<?php
header("Content-type: text/xml; charset=utf-8");
$xml=("http://rss.news.yahoo.com/rss/world");

$xmlDoc = new DOMDocument();
$xmlDoc->load($xml);

//get elements from "<channel>"
$channel = $xmlDoc->getElementsByTagName('channel')->item(0);
$channel_title = $channel->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
$channel_link = $channel->getElementsByTagName('link')->item(0)->childNodes->item(0)->nodeValue;

echo '<?xml version="1.0" encoding="utf-8"?>';
echo '<news>';
//get and output "<item>" elements
$x=$xmlDoc->getElementsByTagName('item');
for ($i=0; $i<=9; $i++) {
	echo '<item>';
  	echo '<title>' . $item_title=$x->item($i)->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue . '</title>';
  	echo '<link>' . $item_link=$x->item($i)->getElementsByTagName('link')->item(0)->childNodes->item(0)->nodeValue . '</link>';
  	echo '</item>';
}
echo '</news>';
?> 