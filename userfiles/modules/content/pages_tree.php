<div class="pages-tree"><?php


$par =  CI::model('content')->getParentPagesIdsForPageIdAndCache($page['id']);



$last =  end($par); // last

if($last == 0){
$from = 	$page['id'];
} else {
	$from = 	$last;
}

 





	?>
	<ul class="<? print $params['ul_class'] ?> first_item"><li><a href="<? print page_link($from);?>"><? print page_title($from);?></a></li>

				 

 <?
 CI::model('content')->content_helpers_getPagesAsUlTree($from , "<a href='{link}'   {removed_ids_code}  {active_code}  value='{id}' >{content_title}</a>", array($form_values['content_parent']), 'class="active"', array($form_values['id']) , 'class="hidden"' , false, false, $params['ul_class'] );

 ?>
 
 </ul>
 
 </div>