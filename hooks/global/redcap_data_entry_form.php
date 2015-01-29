<?php
//error_reporting(-1);
//ini_set('display_errors',1);
/**
Custom REDCap Data Entry functions for this project
**/
/*
Enable hook_functions and hook_fields (if not already done)
*/
if (!isset($hook_functions)) {
	$file = dirname(APP_PATH_DOCROOT).DS.'hooks/resources/scan_for_custom_questions.php';
		if (file_exists($file)) {
		include_once $file;
	} else {
	error_log ("ERROR: In Hooks - unable to include required file $file while in " . __FILE__);
	}
}

// @AUTOCOMPLETE
$file = dirname(APP_PATH_DOCROOT).DS.'hooks/resources/autocomplete/autocomplete.php';
if (file_exists($file)) {
	include_once $file;
} else {
	error_log ("Unable to include required file $file while in " . __FILE__);
}


// @TOOLTIP
$file = dirname(APP_PATH_DOCROOT).DS.'hooks/resources/tooltip/tooltip.php';
if (file_exists($file)) {
	include_once $file;
} else {
	error_log ("Unable to include required file $file while in " . __FILE__);
}

/*
	@HIDDEN hides the field
*/
$file = dirname(APP_PATH_DOCROOT).DS.'hooks/resources/utility/hidden.php';
if (file_exists($file)) {
	include_once $file;
} else {
	error_log ("Unable to include required file $file while in " . __FILE__);
}

/*
	@DISABLED hides the field
*/
$file = dirname(APP_PATH_DOCROOT).DS.'hooks/resources/utility/disabled.php';
if (file_exists($file)) {
	include_once $file;
} else {
	error_log ("Unable to include required file $file while in " . __FILE__);
}

?>
