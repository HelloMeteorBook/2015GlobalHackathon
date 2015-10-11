Meteor.methods({ 
  createInvoice: function(invoiceData) { 
    check(invoiceData, {
      lineItems: [Object],
      invoiceNumber: String,
      companyName: String,
      clientEmail: String,
      clientName: String,
      projectDescription: String,
      dueDate: Date,
      totalPrice: Number
    });
    
    invoiceData = _.extend(invoiceData, {
      'stripeStatus': 'pending',
      'createdDate': Date.now()
    });
    
    var invoiceId = Invoices.insert(invoiceData);
    return {invoiceId: invoiceId};
  } 
});
