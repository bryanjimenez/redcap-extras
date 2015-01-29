function REDCap_Autocomplete(fields){	
	$.each(fields, function(key,data) {
		var tr = $('tr[sq_id='+key+']');
		
		// Replace term from note
		var $note = $('div.note', tr);
		$note.text($note.text().replace(data.term+"="+data.params, ''));
		
		var $dropdown = $('select', tr);
		var $link = $(document.createElement('a'));
		var $input = $(document.createElement('input'));
		
		// Insert html objects and bind events
		$dropdown.after($input);
		$input.after($link);
		
		$link.text(' ↵')
			.attr('title','Autocomplete')
			.css('cursor', 'pointer')
			.css('text-decoration', 'none')
			.bind('click', function (event) {
				$link.text($link.text()==' ↵' ? ' ✘' : ' ↵');
				$dropdown.toggle();
				$input.toggle().val('').focus();
			});
		
		$input.attr('class', 'x-form-text x-form-field').hide();
		
		// Extract list options from dropdown for jquery autocomplete
		var list = $dropdown.children();
		var x = [];
		
		for (var i = list.length; i-->0 ;){
			x.unshift({
				value: list[i].innerHTML,
				code: list[i].value
			});
		}
		
		$input.ui_autocomplete({
			source: x,
			minLength: 1,
			select: function (event, ui) {
				$dropdown.val(ui.item.code);
				$link.click();
			},
		});
	});	
}
