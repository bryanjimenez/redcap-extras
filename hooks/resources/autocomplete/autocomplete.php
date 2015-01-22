<?php
	
/**
	This is a hook utility function that converts input fields to autocomplete fields when they have
	@AUTOCOMPLETE in the notes area.

	Bryan Jimenez
	University of Miami
**/

$term = '@AUTOCOMPLETE';

error_log("Staring $term");

// Assumes we have populated the hook_functions array
if (!isset($hook_functions)) {
	echo "ERROR: Missing check for hook_functions array in " . __FILE__ . ".  Check your global hook for redcap_survey_page.";
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
echo "<script type='text/javascript'>


$(function() {
	var disabledFields = ".json_encode($startup_vars).";
	$(disabledFields).each(function() {
		var tr = $('tr[sq_id='+this+']');
		
		// Replace term from note
		var note = $('div.note', tr);
		$(note).text($(note).text().replace('".$term."', ''));

        //var dropdown = $(this).closest('td').find('select');
        var dropdown = $('select', tr);
        var link = document.createElement('a');
        var input = document.createElement('input');

        $(dropdown).after(input);
        $(input).after(link);

        $(link).text(' Lookup 🔎').bind('click', function (event) {
            $(dropdown).toggle();
            $(input).toggle().val('').focus();
        }).css('cursor', 'pointer');

        $(input).attr('class', 'x-form-text x-form-field').hide();


        var list = $(dropdown).children();
        var x = [];

        for (var i = list.length; i-->0 ;)
        x.unshift({
            value: list[i].innerHTML,
            code: list[i].value
        });

        $(input).ui_autocomplete({
            source: x,
            minLength: 1,
            select: function (event, ui) {
                $(dropdown).val(ui.item.code);
                $(link).click();
            },
        });
	});
});
</script>";

?>
