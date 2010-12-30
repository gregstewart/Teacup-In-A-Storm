<?php 
	class GetContent {
		function GetContent() {
			$this->methodTable = array(
					"returnContent" => array(
					"description" => "Echoes the passed argument back to Flash (no need to set the return type)", 
					"access" => "remote", // available values are private, public, remote
					"roles" => "role, list", // currently inactive
					"arguments" => array("arg1")
				)
			);
		}
	
		/*
			takes two attributes, the ID to look up the content (can a content id or a category id)
			secondly Takes the file name to make sure when selecting a category they match 
			(many files may belong to a category but files names are unique)
			thridly takes the file type to use the right query
		*/
		function returnContent($id,$n,$t) {
			// debug
			// echo("The id is ".$id." the name is: ".$n." the type is".$t."<br />");			
			$conn = db_connect();
			$returnValue = array();
			/* start content */
			if (isset($t) && (trim($t) == 'f')) {
				$sql = "SELECT co.content_id, co.content_title, co.content, co.content_category_id, ca.name, ca.level, ca.related_to, ca.dir_path FROM content co, categorisation ca
WHERE co.content_id = '".$id."' AND co.content_category_id = ca.category_id";
			}	else if (isset($t) && trim($t) == 'd') {
				$sql = "SELECT co.content_id, co.content_title, co.content, co.content_category_id, ca.name, ca.level, ca.related_to, ca.dir_path FROM content co, categorisation ca WHERE co.content_category_id = '".$id."' AND co.content_category_id = ca.category_id AND co.content_title LIKE '%".$n."%';";
		 	}	
			$result = mysql_query($sql);
			if ($conn) {
				if ($result) {
					$total = mysql_numrows($result);
					if ($total != 0) {
						while($r = mysql_fetch_array($result)) {
							$returnValue[0] = $r[0];
							$returnValue[1] = stripslashes($r[1]);
							$returnValue[2] = stripslashes($r[2]);
							$returnValue[3] = $r[3];
							$returnValue[4] = $r[4];
							$returnValue[5] = $r[5];
							$returnValue[6] = $r[6];
							$returnValue[7] = $r[7];
							if ($t == 'f') {
								$returnValue[6] = $r[3];
							}
						}
					} else {
						$returnValue[0] = "0";
						$returnValue[1] = "Query returned 0 records:<br />".$sql."<br />";
					}
				} else {
					$returnValue[0] = "1";
					$returnValue[1] = "Query failed:<br />".$sql."<br />";
				}
			} else {
				$returnValue[0] = "2";
				$returnValue[1] = "Database connection failed.<br />";
			}
		$this->thisResult = $returnValue;
		return $thisResult;
		/* end content */
		}
		
		/*
			takes one attribute: the ID to look up the content (can a content id or a category id).
		*/
		function returnMetaData($id) {
			$conn = db_connect();
			$returnValue = array();
			
			$sql = "SELECT cat_id, meta_data FROM meta_data WHERE cat_id = '".$id."';";
			$result = mysql_query($sql);
			if ($conn) {
				if ($result) {
					$total = mysql_numrows($result);
					if ($total != 0) {
						while($r = mysql_fetch_array($result)) {
							$returnValue[0] = $r[0];
							$returnValue[1] = stripslashes($r[1]);
						}
					} else {
						$returnValue[0] = "0";
						$returnValue[1] = "Query returned 0 records:<br />".$sql."<br />";
					}
				} else {
					$returnValue[0] = "1";
					$returnValue[1] = "Query failed:<br />".$sql."<br />";
				}
			} else {
				$returnValue[0] = "2";
				$returnValue[1] = "Database connection failed.<br />";
			}
			$this->thisResult = $returnValue;
			return $thisResult;
		}
		
		/*
			takes one attribute: the ID to look up the dropplet content (can be a content id).
		*/
		function returnDropplet($id) {
			$resourceType = '68989546b0202d644ba506857b51ff80';
			$conn = db_connect();
			$returnValue = array();
			
			$sql = "SELECT rrtc.resource_id, r.display_name, r.description FROM related_resources_to_content rrtc, resources r WHERE rrtc.resource_id = r.resource_id AND rrtc.content_id = '".$id."' AND rrtc.type= '".$resourceType."';";
			$result = mysql_query($sql);
			if ($conn) {
				if ($result) {
					$total = mysql_numrows($result);
					if ($total != 0) {
						while($r = mysql_fetch_array($result)) {
							$returnValue[0] = $r[0];
							$returnValue[1] = stripslashes($r[1]);
							$returnValue[2] = stripslashes($r[2]);
						}
					} else {
						$returnValue[0] = "0";
						$returnValue[1] = "Query returned 0 records:<br />".$sql."<br />";
					}
				} else {
					$returnValue[0] = "1";
					$returnValue[1] = "Query failed:<br />".$sql."<br />";
				}
			} else {
				$returnValue[0] = "2";
				$returnValue[1] = "Database connection failed.<br />";
			}
			$this->thisResult = $returnValue;
			return $thisResult;
		}
	}
?>
