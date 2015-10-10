Template.lineItem.onCreated(function() {
  // create line item price and quantity
  this.price = new ReactiveVar(0);
  this.quantity = new ReactiveVar(0);
  this.newFieldCreated = new ReactiveVar(false);
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
  },
  moreThanOneLineItem:function() {
    return LineItems.find({}).count() > 1 && (_.isEmpty(_.filter(Template.instance().findAll($('input')), function(field) {
      return !field.value;
    })));
  }
}); 

Template.lineItem.events({ 
  // some event that adds the line item to a client side line item collection
  "keyup [name=item-price]": function(event, template){ 
    template.price.set(event.target.value);
  },
  "keyup [name=item-quantity]": function(event, template){ 
    template.quantity.set(event.target.value);
  },
  "keyup input": function(event, template) {
    if(!template.newFieldCreated.get() && _.isEmpty(_.filter(template.findAll($('input')), function(field) {
      return !field.value;
    }))) {
      template.newFieldCreated.set(true);
      LineItems.insert({});
    }
  },
  "click .remove-line-item":function(event, template) {
    LineItems.remove(this._id);
  }
}); 
