
Template.invoice.helpers({ 
  companyName: function(){ 
     return Session.get('form_company-name') || 'Your Company'
  }, 
  rendered: function(){ 
     
  }, 
  destroyed: function(){ 
     
  }, 
}); 

Template.invoice.events({ 
  "click #foo": function(event, template){ 
     
  } 
}); 
