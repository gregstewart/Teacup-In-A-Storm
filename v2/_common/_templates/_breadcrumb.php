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
_common/_templates/_breadcrumb.php breadcrumb include

|| END INFO || 
---> 
*/
?>
<!-- Start breadcrumb -->
<div id="breadcrumb">
	<h3>Breacrumb</h3>
	<ul>
	<?php
		$path = "/v2/";
		$depth = count($breadcrumb);
		for ($i = 0; $i < $depth; $i++) {
			if ($i !=0 )
				$path = $path.strtolower(eregi_replace("[ ]", "_" , $breadcrumb[$i][0]))."/";
			if ($i==$depth-1) {
				echo("<li><a href=\"".$path."\" title=\"".strtolower($breadcrumb[$i][0])."\">".strtolower($breadcrumb[$i][0])."</a></li>");
			} else {
				echo("<li><a href=\"".$path."\" title=\"".strtolower($breadcrumb[$i][0])."\">".strtolower($breadcrumb[$i][0])."</a> [&#8226;] </li>");
			}
		}
	?>
	</ul>
</div>
<!-- End breadcrumb -->