<?php
/*
<!--- 
|| START  INFO || 

|| VSS HISTORY || 
$Revision: 1 $ 
$Author: Greg $ 
$Modtime: 20/06/03 16:04 $ 
$Date: 20/06/03 16:14 $ 



|| PROPERTIES || 
Created By: Greg 
Created On: 01/08/2003 

|| FUNCTION || 
_common/_templates/_maincol.php main column content include

|| END INFO || 
---> 
*/

if ($total > 3) {
	for ($i=0; $i<$total; $i++) {
		if ($i == 0) {
			$cid = $object3->thisResult[$i];
		} else if ($i == 1) {
			$section = stripslashes($object3->thisResult[$i]);
		} else if ($i == 2) {
			$body .= stripslashes($object3->thisResult[$i]);
		} else if ($i == 3) {
			$catid = $object3->thisResult[$i];
		}
	}
} else {
	$section = "Section header";
	$body .= "<div class=\"content_item\">
		<p>Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum.</p>
		<p align=\"right\"><a href=\"\" title=\"more details\">Click here for more details <img src=\"/v1/i/tcias_more.gif\" alt=\"next case study\" align=\"absmiddle\" width=\"16\" height=\"16\" border=\"0\" /></a></p>
		</div>
		<div class=\"content_item\">
		<h4>Sub header</h4>
		<p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta</p>
		<p align=\"right\"><a href=\"\" title=\"more details\">Click here for more details <img src=\"/v2/i/tcias_more.gif\" alt=\"next case study\" align=\"absmiddle\" width=\"16\" height=\"16\" border=\"0\" /></a></p>
		</div>";
}

?>
			<h2><?php echo($section); ?></h2>
			<hr />
			<?php echo($body); ?>
