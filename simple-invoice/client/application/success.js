Template.success.helpers({
  shareableUrl: function() {
    return Template.instance().shareableUrl;
  }
});

Template.success.onCreated(function() {
  this.shareableUrl = Spacebars.SafeString(Blaze._globalHelpers.urlFor('pay', {hash: {invoiceId: this.data.invoice._id}}));
});

Template.success.onRendered(function() {
  var clippy = new Clipboard('.btn-copy-link');
  clippy.on('success', function(e) {
    console.info('Action:', e.action);
  });
})
