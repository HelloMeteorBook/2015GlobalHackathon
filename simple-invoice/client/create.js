
Template.create.helpers({ 
  
}); 

Template.create.events({ 
  "keyup input, keyup textarea": function(event, template){ 
     Session.set('form_' + event.target.name, event.target.value);
  } 
}); 
