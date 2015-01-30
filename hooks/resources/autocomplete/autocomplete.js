function REDCap_Autocomplete(fields){
  
  var imgDropDown = "../Resources/images/dropdown.png";
  var imgTextBox = "../Resources/images/form-text-box.gif";
  var btnClass = "jqbuttonsm field-auto-suggest-a ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only";
  var divClass = "field-auto-suggest-div nowrap";
  var spanClass = "ui-button-text";
  var inputClass = "x-form-text x-form-field field-auto-suggest ui-autocomplete-input";
  
	$.each(fields, function(key,data) {
		var $tr = $('tr[sq_id='+key+']');
		
		// Replace term from note
		var $note = $('div.note', $tr);
		$note.text($note.text().replace(data.term, ''));
		
		var $div = $(document.createElement('div'));
 		var $dropdown = $('select', $tr);
		var $input = $(document.createElement('input'));
 		var $button = $(document.createElement('button'));
		var $span = $(document.createElement('span'));
		var $img = $(document.createElement('img'));
		
    // css
    $span.addClass(spanClass);
    $div.addClass(divClass)
        .css('display', 'block');
    $img.attr("src",imgTextBox)
        .css('vertical-align','middle');
    
    
    
		// Insert html objects
    $button.append($span.append($img));
    
    $('td.data',$tr).append(
      $div.append($dropdown)
    );

		$dropdown.after($input);
		$input.after($button);

		$button
      .prop('type','button')
			.attr('title','Autocomplete')
			.addClass(btnClass)
			.bind('click', function (event) {
				$img.attr("src",$img.attr("src")== imgTextBox ? imgDropDown : imgTextBox);
				$dropdown.toggle();
				$input.toggle().val('').focus();
			});
		
		$input.addClass(inputClass)
          .hide();
		
		// Extract list options from dropdown for jquery autocomplete
		var list = $dropdown.children();
		var x = [];
		
		for (var i = 0; i<list.length; i++){
			x.push({
				value: list[i].innerHTML,
				code: list[i].value
			});
		}
		
		$input.ui_autocomplete({
			source: x,
			minLength: 1,
			select: function (event, ui) {
				$dropdown.val(ui.item.code);
				$button.click();
			},
		});
	});	
}
