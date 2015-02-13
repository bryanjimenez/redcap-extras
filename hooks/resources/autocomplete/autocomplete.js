function REDCap_Autocomplete(fields){


  var imgDropDown = "../Resources/images/dropdown.png";
  var imgTextBox = "../Resources/images/form-text-box.gif"
  var btnClass = "jqbuttonsm field-auto-suggest-a ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only my-autocomplete";
  var divClass = "field-auto-suggest-div nowrap my-autocomplete";
  var inputClass = "my-autocomplete x-form-text x-form-field field-auto-suggest ui-autocomplete-input ";
  var selectClass="my-autocomplete";

	$.each(fields, function(key,data) {

		// elements
		var $tr = $('tr[sq_id='+key+']');
 		var $dropdown = $('select', $tr);
		var $note = $('div.note', $tr);
		var $div = $(document.createElement('div'));
		var $input = $(document.createElement('input'));
 		var $button = $(document.createElement('button'));
		var $span = $(document.createElement('span'));
		var $img = $(document.createElement('img'));

    // css
    $div.addClass(divClass);
 		$dropdown.addClass(selectClass);
		$input.addClass(inputClass);
 		$button.addClass(btnClass);
		$span.addClass("ui-button-text");
		$img.addClass("my-autocomplete");

		// Insert html objects
    $('td.data',$tr).prepend($div);
    $div.append($dropdown)
    $dropdown.after($input)
    $input.after($button);
    $button.append($span.append($img));
    
    // properties & attributes  
    $img.attr("src",imgTextBox);
		$button
      .prop('type','button')
			.attr('title','Autocomplete')
			.bind('click', function (event) {
				$img.attr("src",$img.attr("src")== imgTextBox ? imgDropDown : imgTextBox);
				$dropdown.toggle();
				$input.toggle().val('').focus();
			});
		$input.hide();
    
    // Extract options from dropdown for jquery autocomplete
		var list = $dropdown.children();
		var x = [];

		for (var i = 0; i<list.length; i++){
			x.push({
				value: list[i].innerHTML,
				code: list[i].value
			});
		}

    // jqueryui autocomplete
		$input.ui_autocomplete({
			source: x,
			minLength: 1,
			select: function (event, ui) {
				$dropdown.val(ui.item.code);
				$button.click();
			}
		});

		// Replace term from note
		$note.text($note.text().replace(data.term, ''));
	});
}
