<?php
	include("app_globals.php");
	include("_common/_objects/_createPage.class.php");
	include("_common/_objects/_saveContent.class.php");
	
	// function includes
	include ("_common/_objects/_fnBreadCrumb.php");
	// object includes
	include ("_common/_objects/_returnID.class.php");
	include ("_common/_objects/_buildNav.class.php");
	include ("_common/_objects/_getContent.class.php");
	
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
	
	// page generation
	// common components [read executed for each page call]
	
	// get the content id
	$object1 = new ReturnID;
	$object1->returnContentID($file,$id);	
	$returnID = $object1->thisResult;
			
	switch($returnID[1]) {
		case "home":
			$fuseaction = trim($returnID[1]);
			break;
		
		case "confirmation":
			$fuseaction = trim($returnID[1]);
			break;
			
		case "contact_us":
			$fuseaction = trim($returnID[1]);
			break;
		
		default:
			$fuseaction = trim($returnID[1]);
			break;
	}
	

	// grab and save the header content
	ob_start();
		include("_common/_templates/_header.php");
		$content['header'] = ob_get_contents();
	ob_end_clean();
	
	
	// go build the nvaigation
	$object1 = new buildNav;
	$object1->navItems($id);
	// now append the menu to the header
	ob_start();
		include("_common/_templates/_nav.php");
		$content['header'] = $content['header'].ob_get_contents();
	ob_end_clean();	
	
	
	// right col [xcol]
	ob_start();
		include("_common/_templates/_login.php");
		$content['xcol'] = ob_get_contents();
	ob_end_clean();
	// dropplet under xcol
	//ob_start();
	//	include("_common/_templates/_dropplet.php");
	//	$content['xcol'] = $content['xcol'].ob_get_contents();
	//ob_end_clean();
	
	
	// page specific functions
	switch($fuseaction) {
		case "home":
			$content['colSequence'] = "SMX";
			include("_common/_templates/_content_generation_common_code.php");
			break;
		
		case "contact_us":
			$content['colSequence'] = "SMX";
			include("_common/_templates/_subnav_generation_common_code.php");
			include("_common/_templates/_content_generation_common_code.php");
			$content['javascript'] = $js = array('/v2/_common/_scripts/c_validation.js');
			break;
		
		case "confirmation":
			$content['colSequence'] = "SMX";
			//do some form validation
			/*if (isset($_POST['r_name'])) {
				// added these lines to prevent SPAM submissions
				$_POST['r_email'] = preg_replace("/\r/", "", $_POST['r_email']); 
				$_POST['r_email'] = preg_replace("/\n/", "", $_POST['r_email']);
				if (eregi("\r",$_POST['r_email']) || eregi("\n",$_POST['r_email'])){
    				 die("Why ?? :(");
   				}
				// it's ok so now set the content
				$contact_email = "gregs@teacupinastorm.com";
				$contact_name = "Greg Stewart";
				$headers = "From: ".$_POST["r_name"]." <".$_POST["r_email"].">\r\n";
				$headers .= "To: ".$contact_name." <".$contact_email.">\r\n";
				$subject = "Some feedback from the web site";
				$mail_message = "Hey you have had a message from the contact us section:
".$_POST['r_name']." (e-mail:".$_POST['r_email'].") sent a message : ".date('Y-m-d H:i:s')."
He was interested in: ".$_POST['r_about']."
Message:
".$_POST['r_note']."				
				";
				// Send the message
				mail($contact_email, $subject, $mail_message, $headers);
			} else {
				$returnID[1] = "contact_us";
				$body .= "<div class=\"error\"><p>There were some errors submitting the form, please try again.</p></div>";
			}*/
			include("_common/_templates/_subnav_generation_common_code.php");
			include("_common/_templates/_content_generation_common_code.php");
			break;	
		
		default:
			$content['colSequence'] = "SMX";
			include("_common/_templates/_subnav_generation_common_code.php");
			include("_common/_templates/_content_generation_common_code.php");
			break;
	}
	
	
	// grab and save the footer content
	ob_start();
		include("_common/_templates/_footer.php");
		$content['footer'] = ob_get_contents();
	ob_end_clean();

	// go create the page 
	$object1 = new CreatePage;
	$object1->buildPage($content);	
	echo($object1->thisResult);
	
?>
