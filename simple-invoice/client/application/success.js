Template.success.helpers({ 
  shareableUrl: function() {
    return Template.instance().shareableUrl;
  }
}); 

Template.success.onCreated(function() {
  this.shareableUrl = Blaze._globalHelpers.urlFor('pay', {hash: {invoiceId: this.data.invoice._id}});
});
