<?php
/*
<!--- 
|| START  INFO || 

|| VSS HISTORY || 
$Revision: 1 $ 
$Author: Greg $ 
$Modtime: 20/06/03 16:04 $ 
$Date: 20/06/03 16:14 $ 



|| PROPERTIES || 
Created By: Greg 
Created On: 01/08/2003 

|| FUNCTION || 
g/_login.php login include

|| END INFO || 
---> 
*/
?>
		<div id="login">
			<h2>Client login</h2>
			<br />
			<form action="http://www.teacupinastorm.com/clients/login/login.php" method="post" name="frm_login" id="frm_login" enctype="application/x-www-form-urlencoded">
				<fieldset>
					<legend>Client login</legend>
					<p>username<img src="/v2/i/s.gif" alt="*" width="5" height="1" /><label for="r_username"><input type="text" name="r_username" id="r_username" title="Text input: username" value="your username" size="10" /></label><br />
					password<img src="/v2/i/s.gif" alt="*" width="8" height="1" /><label for="r_password"><input type="password" name="r_password" id="r_password" title="Text input: password" value="" size="9" /></label><br />
					<input type="submit" name="btn_submit" id="btn_submit" value="login" class="button" />
					</p>
				</fieldset>
			</form>
		</div>
