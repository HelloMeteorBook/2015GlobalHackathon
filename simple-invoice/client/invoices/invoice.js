Template.invoice.helpers({ 
  companyName: function(){ 
    return this.companyName || 'Your Company'
  }, 
  clientName: function(){ 
   return this.clientName || 'Client Name'
  }, 
  projectDescription: function(){ 
   return this.projectDescription || 'Project Description'
  },
  dueDate: function() {
    if(this.dueDate) {
      return moment(this.dueDate).format('MM/DD/YYYY');
    } else {
      return 'Due Date'
    }
  },
  clientEmail: function() {
    return this.clientEmail || 'Client Email';
  },
  invoiceNumber: function() {
    return this.invoiceNumber || '';
  },
  lineItems: function() {
    return LineItems.find({});
  }
}); 

Template.invoice.events({ 
}); 
