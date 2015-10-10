Template.lineItem.onCreated(function() {
  // create line item price and quantity
});

Template.lineItem.helpers({ 
  lineItemPrice:function() {
    debugger;
  }
}); 

Template.lineItem.events({ 
  // some event that adds the line item to a client side line item collection
  "click #foo": function(event, template){ 
     
  } 
}); 
