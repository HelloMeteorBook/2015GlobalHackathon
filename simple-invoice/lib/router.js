Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'createAndView'
});

Router.route('/about', {
  name: 'about'
});

Router.route(':id/success', {
  name: 'success'
})

Router.route(':id/pay', {
  name: 'pay'
})
