<?php 
	
	// global variables
	global $http;
	$http = "http://www.tcias.co.uk/";
	$page_title = ":: www.teacupinastorm.com :: form follows function";
	$site_id = "fa01e7eaf18e24cadd93632335820dfe";
	
	// top level nav
	$id = '445f1d8a212395fcd9080c953f570149';
	
	// params
	/*** default columns sequence
	 	Column sequence specified in the body tag
		SMX - left main right
		MSX - main left right
		SM - left main
		MS - main left
		M - only
	*/
	param($content['colSequence'],"MSX");
	// default content areas
	param($content['meta_keywords'],"");
	param($content['meta_description'],"Web design and development agency based in London England with clients from around the globe. We specialise in simple and effective web development solutions and reliable hosting, using web standards (xHTML and css) based design with a focus on usability and accessiibility, as well as a raft of technology solutions for th back end.");
	param($content['stylesheet'],"d.css"); // for specific style sheets, override here or in your fuseactions
	param($content['javascript'][0],"");
	param($content['onload'],"");
	param($content['subcol'],"");
	param($content['maincol'],"");
	param($content['xcol'],"");
	param($content['header'],"");
	param($content['footer'],"");
	// default page widths 
	param($content['css_content'],755); // adjust the full width of the body area
	param($content['css_maincol'],560); // adjusts the width of the main content area
	param($content['css_subcol'],140); // adjusts the width of the left content area
	param($content['css_xcol'],180); // adjusts the width of the right content area
	// overriding widths
	param($content['css_wrap'],560); // for column layout: MSX/SMX set the wrap width (this includes left and main content)
	// BEWARE: make sure that the combined width of subcol and maincol is not greater than wrap. if you do this will force sub under main
	param($content['css_col1'],410); // for column layout: MSX/SMX set the maincol width.
	param($content['css_col2'],130); // for column layout: MSX/SMX set the subcol width.
	// page specific default values
	param($content['pageTitle'],"");
	param($fuseaction,"");
	
	// database connectivity
	function db_connect() {
		// database parameters
		// alter this as per your configuration
		$database="wild_tciasdb";
		$user = "wild_gregs";
		$pass = "M966ald";
		$hostname = "localhost";
		
		$connect = mysql_connect($hostname, $user, $pass);
		if (!$connect) 
			return false;
		if (!mysql_select_db($database))
			return false;
			
		return $connect;
	}
	
	// UDF
	function param(&$var, $default) {
		if (!isset($var) || !$var) {
			$var = $default;
		}
	}

?>
