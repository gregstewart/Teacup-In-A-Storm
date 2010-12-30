<?php
			// if this was a file rather than a dir reference
			if ($returnID[2] == 'f' && $returnID[0] != "home") {
				// since we still need the content id for content store it here for a while
				$returnID[0] = $returnedContentID;
			}
			
			
			// get content
			$object3 = new getContent;
			$object3->returnContent($returnID[0],$returnID[1],$returnID[2]);
			$total = count($object3->thisResult);
			// now use the object and generate the page
			ob_start();
				include("_common/_templates/_maincol.php");
				$content['maincol'] .= ob_get_contents();
			ob_end_clean();
			
			
			// time for the breadcrumb
			if ($total>3) {
				if ($object3->thisResult[5] != 0) { // there is another parent level, set the array and then get the next parent
					setBreadcrumb($object3->thisResult[1], $object3->thisResult[0], $object3->thisResult[7]);
					getNextLevel($object3->thisResult[6]);
				} else { // no more parents just set the array
					setBreadcrumb($object3->thisResult[1], $object3->thisResult[0], $object3->thisResult[7]);
				}
				$breadcrumb = array_reverse($arBreadcrumb);
				ob_start();
					include("_common/_templates/_breadcrumb.php");
					$content['header'] .= ob_get_contents();
				ob_end_clean();
			}
			
			
			// the page title is equal to the section
			$depth = count($breadcrumb);
			for ($i = 0; $i < $depth; $i++) {
				$content['pageTitle'] .= " | ".$breadcrumb[$i][0];
			}
			
			
			// and for search engines
			$content['pageTitle'] .= " &lt;&lt; building and designing standards based, usable and accessible web sites | london";
			
			
			// meta data next
			$object4 = new getContent;
			$object4->returnMetaData($returnID[0]);
			if (!is_numeric($object4->thisResult[0])) {
				$content['meta_keywords'] = $object4->thisResult[1];
			} else {
				$content['meta_keywords'] = "Sorry no meta content found";
			}
			
			
			// dropplet
			$object4 = new getContent;
			$object4->returnDropplet($object3->thisResult[0]);
			$total = count($object4->thisResult);
			// time for the dropplet display
			if ($total>2) {
				// dropplet under xcol
				ob_start();
					include("_common/_templates/_dropplet.php");
					$content['xcol'] = $content['xcol'].ob_get_contents();
				ob_end_clean();
			}
	?>
