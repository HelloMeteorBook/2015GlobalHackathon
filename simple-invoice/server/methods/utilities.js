Meteor.methods({ 
  sendEmail:function(invoiceId) { 
    check(invoiceId, String);
    
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
    
    var invoice = Invoices.findOne({_id: invoiceId});
    
    var text = "You have a new invoice from " + invoice.companyName + "\nInvoice #" + invoice.invoiceNumber + " for " + invoice.projectDescription + "\nView Invoice: https://simpleinvoice.meteor.com/invoices/" + invoiceId + "/pay\n\nSent by Simple Invoice (https://simpleinvoice.meteor.com/).";
    
    Email.send({
      to: invoice.clientEmail,
      from: 'hello@hellometeor.com',
      subject: 'You have an invoice from ' + invoice.companyName,
      text: text
    });
  } 
});
