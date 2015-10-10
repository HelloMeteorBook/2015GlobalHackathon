Template.create.onCreated(function() {
  LineItems = new Meteor.Collection(null);
  LineItems.insert({});
});

Template.create.onRendered(function() {
  $('.date-picker').datepicker({
    todayBtn: "linked",
    todayHighlight: true
  });
  $('[name=due-date]').attr('placeholder', moment(Date.now()).add(1, 'week').format('MM/DD/YYYY'));
});

Template.create.helpers({ 
  lineItems: function() {
    return LineItems.find({});
  }
}); 

Template.create.events({ 
  "keyup input, keyup textarea": function(event, template){ 
     Session.set('form_' + event.target.name, event.target.value);
  } 
}); 
