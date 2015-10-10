Template.create.onCreated(function() {
  LineItems = new Meteor.Collection(null);
  LineItems.insert({});
});

Template.create.onRendered(function() {
  //Plugin Activation
  $('.date-picker').datepicker({
    todayBtn: "linked",
    todayHighlight: true
  });
  $('[name=due-date]').attr('placeholder', moment(Date.now()).add(1, 'week').format('MM/DD/YYYY'));
  $('form').parsley({
    trigger: 'change',
    errorClass: 'has-error',
    successClass: 'has-success',
    classHandler: function (ParsleyField) {
      return ParsleyField.$element.parents('.form-group');
    },
    errorsWrapper: '<div class="help-block with-errors"></div>'
  });
});

Template.create.helpers({ 
  lineItems: function() {
    return LineItems.find({});
  },
  totalPrice: function() {
    var total = 0;
    LineItems.find({}).map(function(doc) {
      if(doc.price && doc.quantity)
        total += doc.price * doc.quantity;
    });
    return total;
  }
});

Template.create.events({ 
  "keyup input, keyup textarea": function(event, template) {
     Session.set('form_' + event.target.name, event.target.value);
  },
  "changeDate .date-picker": function(event, template) {
    Session.set('form_due-date', event.date);
  },
  'submit form': function(event, template) {
    event.preventDefault();
  }
}); 
