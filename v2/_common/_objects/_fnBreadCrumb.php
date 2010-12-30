<?php	
	// this function builds up the array, the variables passed are for the display name and it's id
	function setBreadcrumb($path, $id, $dir) {
		global $arBreadcrumb;
		$depth = count($arBreadcrumb);
		$arBreadcrumb[$depth][0] = $path;
		$arBreadcrumb[$depth][1] = $id;
		$arBreadcrumb[$depth][2] = $dir;
	}

	
	// this function is used to grab the next parent element
	function getNextLevel($id) {
		$sql2 = "select categorisation.name, categorisation.level, categorisation.related_to, categorisation.dir_path from categorisation where categorisation.category_id = '".$id."'";
		$result2 = mysql_query($sql2);
		if ($result2) {
			$total2 = mysql_numrows($result2);
			if ($total2 == 1) {
				while ($r2 = mysql_fetch_array($result2)) {
					if ($r2[1] != 0) { // there is another parent level, set the array and then get the next parent
						setBreadcrumb($r2[0], $id, $r[4]);
						getNextLevel($r2[2]);
					} else { // no more parents just set the array
						setBreadcrumb($r2[0], $id, $r[4]);
					}
				}
			} else {
				$msg .= "Query returned unexpected result set (".$total."):<br />".$sql."<br />";
			}
		} else {
			$msg .= "Query failed:<br />".$sql."<br />";
		}
	}
?>