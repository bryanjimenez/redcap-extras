<?php
	
/**
	This is a hook utility function that converts dropdown fields to jQuery autocomplete fields when they have
	@AUTOCOMPLETE in the notes area.

	Bryan Jimenez
	University of Miami
**/

$term = '@AUTOCOMPLETE';

error_log("Starting $term");

// Assumes we have populated the hook_functions array
if (!isset($hook_functions)) {
	echo "ERROR: Missing check for hook_functions array in " . __FILE__ . ".  Check your global hook for redcap_data_entry_form.";
	return;
}

if (!isset($hook_functions[$term])) {
	// Skip this page - term not called
	error_log ("Skipping - no $term functions called.");
	return;
} 


# Step 1 - Create array of fields to hide and inject
$startup_vars = array();
foreach($hook_functions[$term] as $field => $details) {
	$startup_vars[] = $field;
}

# Step 2 - Inject CSS
echo "<!-- AUTOCOMPLETE -->\n";
echo "<style type='text/css'>\n";
readfile(dirname(__FILE__) . DS . "autocomplete.css");
echo "</style>\n";

# Step 3 - Inject Javascript
echo "<!-- AUTOCOMPLETE -->\n";
echo "<script type='text/javascript'>\n";
readfile(dirname(__FILE__) . DS . "autocomplete.js");
echo "$(function(){REDCap_Autocomplete(".json_encode($hook_functions[$term]).");});\n";
echo "</script>\n";

?>
