<?php	
	function getPreviousNav($id) {
		$tmpCat = new buildNav;
		$tmpCat->navItems($id);
		if (eregi("QUERY RETURNED 0 RECORDS:", $tmpCat->thisResult[0])) {
			$getPreviousNav = getPreviousNav($returnID[0]);
		}
		return $tmpCat;
	}
?>