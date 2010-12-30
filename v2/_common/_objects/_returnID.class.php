<?php
	class ReturnID {
		
		function ReturnID() {
			$this->methodTable = array(
					"returnContentID" => array(
					"description" => "Echoes the passed argument back to Flash (no need to set the return type)", 
					"access" => "remote", // available values are private, public, remote
					"roles" => "role, list", // currently inactive
					"arguments" => array("arg1")
				)
			);
		}
		
		
		function returnContentID($file,$siteID) {
			global $sid;
			$sid = $siteID;
			global $found;
			$found = 0;
			
			function checkID($id) {
				global $found;
				global $sid;
				$conn = db_connect();
				
				if ($conn) {
					$sql = "SELECT category_id, related_to, level FROM categorisation WHERE category_id = '".$id."';";
					
					$result = mysql_query($sql);
					if ($result) {
						$total = mysql_numrows($result);
						if ($total != 0) {
							while ($r = mysql_fetch_array($result)) {
								if ($r[2] == 0) {
									if ($sid == $r[0]) {
										$found = 1;
										break;
									} 
								} else {
									checkID($r[1]);
								}
							}
						} else {
							$found = 0; // 0 records found
						}
					} else {
						$found = 0; // query failed
					}
				} else {
					$found = 0; // connection failed
				}
				return $found;
			}
			
			function getID($f,$t) {
				global $returnValue;
				global $sid;
				global $found;
				
				$conn = db_connect();
				
				if ($conn) {
					if ($t == "d") {
						$sql = "SELECT category_id FROM categorisation WHERE name LIKE '%".trim($f)."%';";
					} else {
						$sql = "SELECT content_id FROM content WHERE content_title LIKE'%".trim($f)."%';";
					}
					$result = mysql_query($sql);
					
					if ($result) {
						$total = mysql_numrows($result);
						if ($total != 0) {
							while ($r = mysql_fetch_array($result)) {
								$returnValue = $r[0];
								$found = checkID($returnValue);
								
								if ($found == 1) {
									break;
								}
							}
						} else {
							$returnValue = "Query returned 0 records: ".$sql;
						}
					} else {
						$returnValue = "Query failed: ".$sql;
					}
				} else {
					$returnValue = "Could not connect to the database.";
				}
				return $returnValue;
			}
			
			// first strip out both the Get and the protocol version
			$file = eregi_replace ("GET ", "", $file);
			$file = trim(eregi_replace (" HTTP/1.[0-9]", "", $file));
			$getFileName = eregi("[_a-zA-Z0-9-]+(\.php)?$",$file, $parse);
			if($getFileName) {// filename.php found so remove the underscrores and the .php extension
				$file = trim(eregi_replace("[_\]", " " , $parse[0]));
				$file = trim(eregi_replace("\.(php)", " " , $file));
				$type = "f";
			} else { // file name not found find the last /dirname/
				$getDirName = eregi("(/)+[_a-zA-Z0-9-]+(/)?$",$file, $parse);
				// strip slashes and trim the shite space
				$file = trim(eregi_replace("[/\]", "" , $parse[0]));
				$type = "d";
			}
			
			if ($file == "v2") {
				$file = "home";
			}
			
			$id = getId($file,$type);
			$this->thisResult[0] = $id;
			$this->thisResult[1] = $file;
			$this->thisResult[2] = $type;
			return $thisResult;
		}
	}
?>
