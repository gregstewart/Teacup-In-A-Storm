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
g/_sub_nav.php sub navigation include

|| END INFO || 
---> 
*/
if (!eregi("QUERY RETURNED 0 RECORDS:", $object2->thisResult[0])) {
	$sub_menu = "
<ul>";
for ($i=0; $i<$total; $i++) {
	//echo($object2->thisResult[$i]);
	$l_value = strtolower($object2->thisResult[$i]);
	$u_value = strtoupper($object2->thisResult[$i]);
	$menu_item = eregi_replace(" ", "_" , $l_value);
	$access_key = $l_value{0};
	$sub_menu .= "
	<li>";
	if ($menu_item != $returnID[1]) {
		$path = eregi_replace("[ ]", "_" , $returnID[1]);
		$sub_menu .= "<a href=\"/v2/".$path."/".$menu_item."/\" title=\"".$u_value." [".$access_key."]\" accesskey=\"".$access_key."\" class=\"subnav\">";
	}
	$sub_menu .= $u_value;
	if ($menu_item != $returnID[1]) {
		$sub_menu .= "</a>";
	}
	$sub_menu .= "</li>"; 
}
$sub_menu .= "
</ul>";
} else {
	$sub_menu = "";
}

?>
			<!-- Sub navigation -->
			<div <?php if ($sub_menu != "") { ?>id="sub_navigation"<?php } ?>>
			<h3>Sub Navigation</h3>
			<?php
				echo($sub_menu);
			?>
			</div>
			<!-- End sub navigation -->
