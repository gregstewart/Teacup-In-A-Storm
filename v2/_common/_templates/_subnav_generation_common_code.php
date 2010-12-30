<?php
			// build sub navigation
			// first if it's a file get the category
			if ($returnID[2] == 'f') {
				$getContentCat = new buildNav;
				$getContentCat->getContentCat($returnID[0]);
				// since we still need the content id for content store it here for a while
				$returnedContentID = $returnID[0];
				$returnID[0] = $getContentCat->thisResult;
			}
			
			$object2 = new buildNav;
			$object2->navItems($returnID[0]);
			// check there was a result
			if (eregi("QUERY RETURNED 0 RECORDS:", $object2->thisResult[0])) {
				// if not try the next one up and keep on trying, see class
				$previousCat = new buildNav;
				$previousCat->previousNav($returnID[0]);
				$object2->navItems($previousCat->thisResult[0]);
			}
			$total = count($object2->thisResult);
			// save the sub menu content in left col [subcol]
			ob_start();
				include("_common/_templates/_sub_nav.php");
				$content['subcol'] = ob_get_contents();
			ob_end_clean();
	?>
