<?php
	$mes="";
	foreach($_POST as $key=>$value) {
		$mes.=$_POST[$key]."\n";

	}
	echo   json_encode($_POST);
?>