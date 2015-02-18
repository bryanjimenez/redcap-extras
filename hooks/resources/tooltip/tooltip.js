function REDCap_Tooltip(fields) {
  $.each(fields,function(key,data){
    // skip if there is no tooltip message for the function
    if(data.params){
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
        .addClass("toolTipIcon");
      
      $tooltip.tooltip({
        relative: true,
        effect: "fade",
        position: "center right",
        events: { def: "click,mouseout" },
        tipClass: "toolTipBox"
      });
    }else{
      console.warn(key+" missing parameters in "+data.term);
    }
  });
}
