function REDCap_Tooltip(fields) {
	$.each(fields,function(key,data){
		var tr = $('tr[sq_id='+key+']');
		
		// Replace term from note
		var $note = $('div.note', tr);
		$note.text($note.text().replace(data.term+"="+data.params, ''));
		
		var $element = $note.prev();
		var $tooltip = $(document.createElement("a"));
		$element.after($tooltip);

		$tooltip
			.attr("title",data.params)
			.text(" ★")
			.css("cursor", "pointer")
			.css('text-decoration', 'none');
			
		$tooltip.tooltip({ 
							relative: true, 
							effect: "fade", 
							position: "center right", 
							events: { def: "click,mouseout" }, 
							tipClass: "tooltip"
						});							
	});
}
