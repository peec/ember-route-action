import Ember from 'ember';
const { Helper, assert, computed, getOwner, get } = Ember;

export default Helper.extend({
  router: computed(function() {
    return getOwner(this).lookup('router:main');
  }).readOnly(),

  compute([routeName, ...params]) {
    const router = get(this, 'router');
    assert('[ember-transition-helper] Unable to lookup router', router);

    return function(...invocationArgs) {
      const args = params.concat(invocationArgs);
      const transitionArgs = args.length ? [routeName, ...args] : [routeName];

      router.transitionTo(...transitionArgs);

      return args;
    };
  }
});
