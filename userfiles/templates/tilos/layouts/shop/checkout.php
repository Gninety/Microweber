<script type="text/javascript">
$(document).ready(function(){
    $(".select_qty").each(function(){
      for(var c=2; c<=50; c++){
        $(this).append("<option value='" + c+ "'>" + c + "</option>");
      }
    });
});
</script>

<div id="checkout">
  <h2 class="title"><img src="<? print TEMPLATE_URL ?>img/cartlogo.jpg" style="margin-top: -6px;" align="right" alt="" />Finish your order</h2>
  <div id="cart"> <img src="<? print TEMPLATE_URL ?>img/hc.jpg" style="position: relative;top: 5px;" alt="" />&nbsp;&nbsp;You have 1 item in your cart
   
   
   
   
   
   <mw module="cart/items" />
   
    
    
    
    
    
    <div id="finish"> <a href="#"><img src="<? print TEMPLATE_URL ?>img/cshopping.jpg" align="left" /></a> <a href="#"><img src="<? print TEMPLATE_URL ?>img/pvia.jpg" align="right" style="margin:16px -110px 0 0; " /></a> <strong>OR</strong> </div>
  </div>
  <!-- /#cart -->
</div>