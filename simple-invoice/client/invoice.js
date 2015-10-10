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
  dueDate: function() {
    if(Session.get('form_due-date')) {
      return moment(Session.get('form_due-date')).format('MM/DD/YYYY');
    } else {
      return 'Due Date'
    }
  },
  clientEmail: function() {
    return Session.get('form_client-email') || 'Client Email';
  }
}); 

Template.invoice.events({ 
}); 
