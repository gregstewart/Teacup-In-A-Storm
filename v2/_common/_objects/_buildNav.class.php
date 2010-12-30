<?php
	class BuildNav {
		function BuildNav() {
			$this->methodTable = array(
					"navItems" => array(
					"description" => "Echoes the passed argument back to Flash (no need to set the return type)", 
					"access" => "remote", // available values are private, public, remote
					"roles" => "role, list", // currently inactive
					"arguments" => array("arg1")
				)
			);
		}
		
		
		/*
			takes to attributes, the ID to look up and the level
			0 = top level navigation
		*/
		function navItems($id) {			
			$conn = db_connect();
			$returnValue = array();
			
			if ($conn) {
				$sql = "SELECT name from categorisation where related_to = '".$id."' ORDER BY priority;";
				
				$result = mysql_query($sql);
				
				if ($result) {
					$total = mysql_numrows($result);
					if ($total != 0) {
						$counter = 0;
						while ($r = mysql_fetch_array($result)) {
							$returnValue[$counter] = $r[0];
							$counter++;
						}
					} else {
						$returnValue[0] = "Query returned 0 records: ".$sql;
					}
				} else {
					$returnValue[0] = "Query failed: ".$sql;
				}
			} else {
				$returnValue[0] = "Could not connect to the database.";
			}
			
			$this->thisResult = $returnValue;
			return $thisResult;
		}
		
		function previousNav($id) {
			$conn = db_connect();
			$returnValue = array();
			
			if ($conn) {
				$sql = "SELECT related_to, category_id from categorisation where category_id = '".$id."' ORDER BY priority;";
				
				$result = mysql_query($sql);
				
				if ($result) {
					$total = mysql_numrows($result);
					if ($total != 0) {
						$counter = 0;
						while ($r = mysql_fetch_array($result)) {
							$returnValue[$counter] = $r[0];
							$tmp_CatId = $r[1];
							$counter++;
						}
					} else {
						$returnValue[0] = "Query returned 0 records: ".$sql;
					}
				} else {
					$returnValue[0] = "Query failed: ".$sql;
				}
			} else {
				$returnValue[0] = "Could not connect to the database.";
			}
			
			$this->thisResult = $returnValue;
			return $thisResult;
		}
		
		function getContentCat($id) {
			$conn = db_connect();
			$returnValue = '';
			
			if ($conn) {
				$sql = "SELECT content_category_id from content where content_id = '".$id."';";
				$result = mysql_query($sql);
				
				if ($result) {
					$total = mysql_numrows($result);
					if ($total != 0) {
						while ($r = mysql_fetch_array($result)) {
							$returnValue = $r[0];
						}
					} else {
						$returnValue[0] = "Query returned 0 records: ".$sql;
					}
				} else {
					$returnValue[0] = "Query failed: ".$sql;
				}
			} else {
				$returnValue[0] = "Could not connect to the database.";
			}
			$this->thisResult = $returnValue;
			return $thisResult;
		}
	}
?>