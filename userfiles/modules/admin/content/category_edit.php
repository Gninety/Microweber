<? if($params['id'] == false){

	$params['id'] =url_param('id');
}

$rand = rand();
//p($params);
?>
<? 

if($params['save']){
	$save = CI::model('taxonomy')->taxonomySave($params, $preserve_cache = false) ;
	
	
	?>
<script type="text/javascript">
	
	
	$(document).ready(function () {
								
								
				
					
					
	if(typeof update_category_list == 'function'){
		update_category_list();
	}						
								
    
 });






</script>
<?
	//print('Saved id-' .$save);
	return;
}



//p($params);
$cat = get_category(intval($params['id']));
//p($cat)

 $the_page =  CI::model('content')->contentsGetTheFirstBlogSectionForCategory($cat['id']);
//p($the_page);




?>
<script type="text/javascript" language="javascript">
 

 
  
 

 


<? if(intval($the_page['id']) != 0): ?>
$(document).ready(function () {
$.ajax({
  type: 'POST',
  url: '<? print site_url('api/module'); ?>',
  data: ({module : 'admin/content/custom_fields_editor',page_id : <? print $the_page['id'] ?>, 'for' : 'category', category_id:"<? print intval($params['id']) ?>" }),
  success: function(resp3) {
	 // alert(resp2);
	  
	   $("#cat_custom_fields").html(resp3);
	   
	   
  } 
  
});
 });
<? endif; ?>		


 
  function save_the_category1($form){
	
$f = '#'+$form;
	 data1 = ($($f).serialize());
	 
	 data1=data1+'&module=admin/content/category_edit';
	//  data1=data1+'&page_id=<? print $params['page_id'] ?>';
	   data1=data1+'&save=true';
	 
	 
	
	 $.ajax({
  url: '<? print site_url('api/module'); ?>',
   type: "POST",
      data: (data1),
      dataType: "html",
      async:true,
	  success: function(resp) {
		  $("#save_category_resp").html(resp);
		
	  }
    });
	
 

}
 


$(document).ready(function() {


 
 // toggles the slickbox on clicking the noted link  
$('#category_edit_advanced_<? print intval($cat['id']) ?>_show').die('click');
  $('#category_edit_advanced_<? print intval($cat['id']) ?>_show').click(function() {
    $('#category_edit_advanced_<? print intval($cat['id']) ?>').toggle(400);
    return false;
  });
});
</script>

<div id="save_category_resp"></div>
<? if($cat['parent_id'] == false): ?>
<? $cat['parent_id'] =  $params['taxonomy_parent']; ?>
<? endif; ?>
<form id="save_category">
  <input name="taxonomy_type" type="hidden" value="category" />
  <label style="position: absolute;bottom:0;left:0">Id: <? print intval($cat['id']) ?></label>
  <input name="id" type="hidden" value="<? print intval($cat['id']) ?>" />
  <label>Category Title:</label>
  <input class="field3" name="taxonomy_value" type="text" value="<? print $cat['taxonomy_value'] ?>" />
  <label>Parent Category </label>
  <input class="field3" name="parent_id" id="cat_parent_id" type="hidden" value="<? print $cat['parent_id'] ?>" />
  <div class="drop drop_white"> <span class="drop_arr"></span> <span class="val">Choose Category</span>
    <div class="drop_list" style="display: none; top: 34px;height: auto">
      <microweber module="admin/content/category_selector" active_category="<? print $cat['parent_id'] ?>" update_field="#cat_parent_id"  />
    </div>
  </div>
  
  <br />

  <a id="category_edit_advanced_<? print intval($cat['id']) ?>_show">Advanced</a>
  <div id="category_edit_advanced_<? print intval($cat['id']) ?>" style="display:none;">
  
  
  <?                if($params['quick_edit'] == false){             ?>
  <label>Content Type: </label>
  <input class="field3" name="content_type" type="text" value="<? print $cat['content_type'] ?>" />
  <label>Description:</label>
  <input class="field3" name="taxonomy_description" type="text" value="<? print $cat['taxonomy_description'] ?>" />
  <label>Full Description:</label>
  <input class="field3" name="content_body" type="text" value="<? print $cat['content_body'] ?>" />
  <label>Users can create subcategories:</label>
  <input class="field3" name="users_can_create_subcategories" type="text" value="<? print $cat['users_can_create_subcategories'] ?>" />
  <label>Users can create subcategories user level required:</label>
  <input class="field3" name="users_can_create_subcategories_user_level_required" type="text" value="<? print $cat['users_can_create_subcategories_user_level_required'] ?>" />
  <label>Users can create content:</label>
  <input class="field3" name="users_can_create_content" type="text" value="<? print $cat['users_can_create_content'] ?>" />
  <div id="cat_custom_fields"></div>
  <? } ?>
  
  </div>
  
  
  
  <input class="field3" name="taxonomy_content_type" type="hidden" value="inherit" />
  <br />
  <a href="javascript:void(0);" class="delete_cat">Delete</a> <a href="javascript:save_the_category1('save_category')" class="btn2 right">Save</a> <br />
</form>
