Template.lineItem.onCreated(function() {
  // create line item price and quantity
  this.price = new ReactiveVar(0);
  this.quantity = new ReactiveVar(0);
});

Template.lineItem.helpers({ 
  lineItemPrice:function() {
    var display;
    var totalPrice = Template.instance().price.get() * Template.instance().quantity.get()
    if(totalPrice > 0) {
      display = '$' + totalPrice;
    } else {
      display = '$0'
    }
    return display;
  }
}); 

Template.lineItem.events({ 
  // some event that adds the line item to a client side line item collection
  "keyup [name=item-price]": function(event, template){ 
    template.price.set(event.target.value);
  },
  "keyup [name=item-quantity]": function(event, template){ 
    template.quantity.set(event.target.value);
  }
}); 
