<? if (!empty($data)) : ?>
<? $vals = $params['value']; 

if( $vals == false){
	$vals = $data['param_values']; 
	
	
}
if( $vals != false){
	$vals = explode(',',$vals);
}
?>

<label class="custom_field_label custom_field_label_<?  print $data['param'];  ?>"> <span>
  <?  print $data['name'];  ?>
  </span>
  <select  <?  if( $data['help']) : ?> title="<?  print addslashes($data['help']);  ?>"   <? endif; ?> name="custom_field_<?  print $data['param'];  ?>" class="custom_field_<?  print $data['param'];  ?>">
    <? if(!empty($vals)) :?>
    <? foreach($vals as $val): ?>
    <option value="<? print $val  ?>"     <?  if( $data['param_default'] == $val) : ?> selected="selected"   <? endif; ?>      ><? print $val  ?></option>
    <? endforeach; ?>
    <? endif; ?>
  </select>
</label>
<?  endif; ?>
