Template.invoice.onCreated(function() {
  LineItems = new Meteor.Collection(null);
  LineItems.insert({});
});

Template.invoice.helpers({ 
  companyName: function(){ 
   return Session.get('form_company-name') || 'Your Company'
  }, 
  clientName: function(){ 
   return Session.get('form_client-name') || 'Client Name'
  }, 
  projectDescription: function(){ 
   return Session.get('form_project-description') || 'Project Description'
  },
  lineItems: function() {
    return LineItems.find({});
  }
}); 

Template.invoice.events({ 
}); 
