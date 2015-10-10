Template.create.onCreated(function() {
  LineItems = new Meteor.Collection(null);
  LineItems.insert({});
});

Template.create.helpers({ 
  lineItems: function() {
    return LineItems.find({});
  }
}); 

Template.create.events({ 
  "keyup input, keyup textarea": function(event, template){ 
     Session.set('form_' + event.target.name, event.target.value);
  } 
}); 
