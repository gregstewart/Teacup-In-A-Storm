<?php

class SaveContent {
	var $content;
	var $f;
	function clear() {
		ob_end_clean(); //clear buffer, end collection of content
						//without returning the contents of the buffer
	}
	function close($f) {
		include($f);
		$content = ob_get_contents(); //get stuff out of buffer to variable
		ob_end_clean(); //clear buffer, end collection of content
		return $buf; // return the contents of the buffer--
					 // requires that the calling template receives this value like so:
					 // $SaveContent = $SC->close();
	}
	function SaveContent($filePath) {
		ob_start(); //start the output buffer
		close($filePath);
	}
}
?>