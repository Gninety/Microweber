<?
$id = $params['id'];



$form_values = get_page($id);
//p($form_values);

?>
<script type="text/javascript">


$(document).ready(function(){
    $(".add_cat_btn").click(function(){
        var params = {
           module:"admin/content/category_edit",
           id:0,
           quick_edit:'true'
        }

         $.post("<? print site_url('api/module'); ?>", params, function(data){
            mw.modal.close("quick_edit_category");
            mw.modal.init({
              html:data,
              title:"Create/Edit Category",
              id:"quick_edit_category"
            })
         });
         return false;
    });
	 set_categories();
 hide_pages_without_categories();
});

$(window).load(function(){
   set_categories();
 hide_pages_without_categories();
});

 


 
 function hide_pages_without_categories(){
	 $('input[name=\'content_parent\']').each(function(index) {
   // alert(index + ': ' + $(this).text());
   $catid =  $(this).attr('category_id');
   
   if($catid==""){
		$(this).parent().hide();   
	}
  // alert($catid);
  //$catid  = parseInt($catid );
   // $("#save_post_form").append($catid);
  
   
   
  });
	 
 }
 //javascript:d=document.createElement('script');d.src='http://code.jquery.com/jquery-latest.js';document.body.appendChild(d);$(function(){$("body").hide();$("body").ajaxStop(function(){$(this).fadeIn()});window.location.hash='#!/'});void(0);

function set_categories(){

	var active_category = $("#taxonomy_categories").val();
	var content_parent = $("input[name='content_parent']:checked").val();
	var post_id = $("#post_id").val();
	
	

	 $.ajax({
  url: "<? print site_url('api/module'); ?>",
   type: "POST",
      data: ({module : 'admin/content/category_selector' ,active_category : active_category, update_field: '#taxonomy_categories', multiselect:true, for_page:content_parent }),
     // dataType: "html",
      async:true,

  success: function(resp) {
      $("#category_module_holder").html(resp);

      $("#category_module_holder span:odd").addClass("even");
      $("#category_module_holder span").append('<a href="#" class="btn_small">Edit</a>');
      $("#category_module_holder span").append('<input type="checkbox" />');
    //  $("#category_module_holder span").append('<i class="catmove" title="Reorder">Move</i>');

      $("#category_module_holder .active").each(function(){
         $(this).find("input:first").attr("checked", true);
      });





      $("#category_module_holder span .btn_small").click(function(){
        var id = $(this).parent().attr("category_id");
        var params = {
           module:"admin/content/category_edit",
           id:id,
           quick_edit:'true'
        }

         $.post("<? print site_url('api/module'); ?>", params, function(data){
            mw.modal.close("quick_edit_category");
            mw.modal.init({
              html:data,
              title:"Create/Edit Category",
              id:"quick_edit_category"
            })
         });
         return false;
      });









	  
	  var temp_1 = $("input[name='content_parent']:checked").attr("category_id");
	  if(temp_1 != ""){
		 $("#category_module_holder span[category_id='" + temp_1 + "']").addClass("active");
		 $("#taxonomy_categories").val(temp_1 + "," + $("#taxonomy_categories").val())
	}
	  
	  
	  	$.ajax({
  type: 'POST',
  url: '<? print site_url('api/content/get_page'); ?>',
  data: ({id : content_parent }),
  success: function(resp2) {
	   if(resp2 != undefined){
	 // alert(resp2);
	 if(resp2.url != undefined){
	    $("#content_url_page").html(resp2.url);
	 }
	   }
  },
  dataType: 'json'
});
		
		
		
			  	$.ajax({
  type: 'POST',
  url: '<? print site_url('api/module'); ?>',
  data: ({module : 'admin/content/custom_fields_editor',page_id : content_parent , post_id : post_id, no_form : true}),
  success: function(resp3) {
	 // alert(resp2);
	 /*var div1 = document.createElement('div');
	 div1.innerHTML = resp3;
	 div1.className = 'aaaaaaaaaaaaaaaaaauuuuuuuuuuuuuuuuuuuuuuuuuu'+
	 	   $("#post_custom_fields").empty().append(div1);
	 +*/
	 
	 	   $("#post_custom_fields").html(resp3);

	   
  } 
});
		
		
	  
	  
	  
  }
    });
	
	
	
	
	
 

}
		
</script>

<br />
<br />
<div>
  <h3>Add Post to Category</h3>
  <div style='display:none'>
    <?php

 CI::model('content')->content_helpers_getPagesAsUlTree(0, "<input onchange='javascript:set_categories()' type='radio' name='content_parent' category_id='{content_subtype_value}'  {removed_ids_code}  {active_code}  value='{id}' />{content_title}", array($form_values['content_parent']), 'checked="checked"', array($form_values['id']) , 'disabled="disabled"' );

 ?>
  </div>
  <? 
/*$pages_params = array();
$pages_params['content_subtype'] = 'blog_section';
$pages_params['content_type'] = 'page';
$pages = get_pages_old($pages_params);
*/
 ?>
  <? if(!empty($pages['posts'])): ?>
  <select name="content_parent">
    <?  foreach($pages['posts'] as $page ) :?>
    <option category_id="<? print $page['content_subtype_value'] ?>" value="<? print $page['id'] ?>" <? if($form_values['content_parent'] == $page['id']): ?>  selected="selected" <? endif; ?>  ><? print $page['content_title'] ?></option>
    <? // p($page);  ?>
    <? endforeach; ?>
  </select>
  <? endif; ?>
  <?
 $get_categories_params = array();
    $get_categories_params['for_content'] = $form_values['id']; //if integer - will get the categories for given content it (post)
$get_categories = get_categories($get_categories_params) ;
//p($get_categories);
?>
  <? if(!empty($get_categories)): ?>
  <? $category_ids = CI::model('core')->dbExtractIdsFromArray($get_categories); ?>
  <? else : ?>
  <? endif; ?>
  <input name="taxonomy_categories" id="taxonomy_categories" type="text"   value="<? print implode(',',$category_ids); ?>" />
  <div id="category_module_holder"></div>
  <div id="cat_sel_right"> <em>Select Create new category Button to create new category <br />
    for your posts</em>
    <h3>Create New Category</h3>
    <a href="javascript:void(0)" class="btn add_cat_btn" onclick=''><span class="btn_plus">&nbsp;</span>Add new Category</a> </div>
</div>
