Template.invoice.helpers({ 
  companyName: function(){ 
    return this.companyName || 'Your Company'
  }, 
  createdDate: function() {
    return moment(this.createdDate).format('MMM Do, YYYY') || moment().format('MMM Do, YYYY')
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
    if(this.isPersistedCollection) {
      // do something
    } else {
      return LineItems.find({});
    }
  },
  totalPrice: function() {
    return this.totalPrice || 0;
  }
}); 

Template.invoice.events({ 
}); 
