<?php
	
/**
	This is a hook function that adds a tooltip to field that have
	@TOOLTIP in the notes area.
	
	Example:
	
	@TOOLTIP="The message that will be used in the tooltip"   //TODO
	
	or
	
	<div class="TOOLTIP" data-msg="The message that will be used in the tooltip"/>

	Bryan Jimenez
	University of Miami
**/

$term = '@TOOLTIP';

error_log("Starting $term");

// Assumes we have populated the hook_functions array
if (!isset($hook_functions)) {
	echo "ERROR: Missing check for hook_functions array in " . __FILE__ . ".  Check your global hook for redcap_data_entry_form.";
	return;
}

// FIX this later

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

# Step 2 - Inject Javascript
echo "<!-- TOOLTIP -->\n";
echo "<script type='text/javascript'>\n";
readfile(dirname(__FILE__) . DS . "tooltip.js");
echo "$(function(){REDCap_Tooltip(".json_encode($hook_functions[$term]).");});\n";
echo "</script>\n";
?>
