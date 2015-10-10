Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'createAndView'
});

Router.route('/about');
