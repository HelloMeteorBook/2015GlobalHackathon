Template.createAndView.onCreated(function() {
  LocalInvoices = new Meteor.Collection(null);
  this.invoice = LocalInvoices.insert({});
});
  
Template.createAndView.helpers({ 
  localInvoice: function() {
    if(Template.instance().invoice)
      return LocalInvoices.findOne(Template.instance().invoice);
  }
}); 

Template.createAndView.events({ 
  "click #foo": function(event, template){ 
     
  } 
}); 
