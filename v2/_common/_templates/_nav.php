<?php
/*
<!--- 
|| START  INFO || 

|| VSS HISTORY || 
$Revision: 2 $ 
$Author: Greg $ 
$Modtime: 02/08/03 00:23 $ 
$Date: 01/08/03 23:00 $ 



|| PROPERTIES || 
Created By: Greg 
Created On: 01/08/2003 

|| FUNCTION || 
_common/_templates/_nav.php navigation include

|| END INFO || 
---> 
*/

$menu = "
	<ul>";
	$total = count($object1->thisResult);
	for ($i=0; $i<$total; $i++) {
		$l_value = strtolower($object1->thisResult[$i]);
		$u_value = strtoupper($object1->thisResult[$i]);
		$menu_item = eregi_replace(" ", "_" , $l_value);
		$access_key = $l_value{0};
		$menu .= "
		<li>";
		if ($menu_item != $returnID[1]) {
			$menu .= "<a href=\"/v2/".$menu_item."/\" title=\"".$u_value." [".$access_key."]\" accesskey=\"".$access_key."\">";
		}
		$menu .= $u_value;
		if ($menu_item != $returnID[1]) {
			$menu .= "</a>";
		}
		$menu .= "</li>"; 
	}
	$menu .= "
	</ul>";

?>

<!-- Navigation -->
<div id="navigation">

<h3>Navigation</h3>
<?php
	// display the menu
	echo($menu);
?>
</div>
<br />
<!-- End navigation -->
