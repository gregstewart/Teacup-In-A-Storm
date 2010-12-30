<?php
	class CreatePage {
		function CreatePage() {
			$this->methodTable = array(
					"buildPage" => array(
					"description" => "Echoes the passed argument back to Flash (no need to set the return type)", 
					"access" => "remote", // available values are private, public, remote
					"roles" => "role, list", // currently inactive
					"arguments" => array("arg1")
				)
			);
		}
		
		/* This function will take the content array as input */
		function buildPage($content) {			
			$js = $content['javascript'];
			$javaScript = "";
			/*for ($i=0;$i<=count($js)-1;$i++) {
				$javaScript .= "<script language=\"JavaScript1.2\" type=\"text/javascript\" src=\"".$js[$i]."\"></script>
";
			}*/
			
			$returnValue = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>
<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">
<head>
<title>".$content['pageTitle']."</title>
<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\" />
<meta name=\"language\" content=\"en\" />
<meta http-equiv=\"Content-Language\" content=\"en-uk\" />
<meta name=\"author\" content=\"Greg Stewart.\" />
<meta name=\"Copyright\" content=\"Copyright (c) 1995-2003 Teacup In A Storm\" />
<meta name=\"description\" content=\"".$content['meta_description']."\" />
<meta name=\"keywords\" content=\"".$content['meta_keywords']."\" />

<!-- to correct the unsightly Flash of Unstyled Content. http://www.bluerobot.com/web/css/fouc.asp -->
<script type=\"text/javascript\"></script>

<style type=\"text/css\">@import \"/v2/_common/_styles/".$content['stylesheet']."\";</style>
<style type=\"text/css\">
	/* Default widths */
	#content { width:".$content['css_content']."px; }
	.maincol { width:".$content['css_maincol']."px; }
	.subcol { width:".$content['css_subcol']."px; }
	.xcol { width:".$content['css_xcol']."px; }
	.col-MSX .wrap, .col-SMX .wrap { width:".$content['css_wrap']."px; }
	/* Overiding widths */
	.col-MSX .maincol, .col-SMX .maincol { width:".$content['css_col1']."px; }
	.col-MSX .subcol, .col-SMX .subcol { width:".$content['css_col2']."px; }
</style>
".$javaScript."
</head>

<body class=\"col-".$content['colSequence']."\">
".$content['header']."
<!-- Start content -->
<div id=\"content\">

	<!-- Start wrap -->
	<div class=\"wrap\">
	
		<!-- Main Column -->
		<div class=\"maincol\" id=\"central\">
			<h3>Main col</h3>
			".$content['maincol']."
		</div>
		<!-- End Main Column -->
		
		<!-- Sub Column -->
		<div class=\"subcol\">
			<h3>Left col</h3>
			".$content['subcol']."
		</div>
		<!-- End Sub Column -->
	
	</div>
	<!-- End wrap -->
	
	<!-- Xtra Column -->
	<div class=\"xcol\">
		<h3>Right col</h3>
		".$content['xcol']."
	</div>
	<!-- End Xtra Column -->

</div>
<!-- End content -->
".$content['footer']."
</body>
</html>";
			
			$this->thisResult = $returnValue;
			return $this->thisResult;
		}
	}
?>