import Component from '@ember/component';
import layout from '../templates/components/polaris-form-layout';
import wrapChildren from '../utils/wrap-children';

/**
 * Polaris form layout component.
 * See https://polaris.shopify.com/components/forms/form-layout
 *
 * @component polaris-form-layout
 */
export default Component.extend({
  classNames: ['Polaris-FormLayout'],

  layout,

  /**
   * The content to display inside the layout
   *
   * @property text
   * @type {string}
   * @default null
   * @public
   */
  text: null,

  'data-test-form-layout': true,

  didRender() {
    this._super(...arguments);

    // Wrap each child element that isn't already a group or an item.
    var wrapper = document.createElement('div');

    wrapper.classList.add('Polaris-FormLayout__Item');
    wrapper.setAttribute('data-test-form-layout-item', true);

    wrapChildren(this.element.children, wrapper, function(el) {
      return !el.classList.contains('Polaris-FormLayout__Item') && el.getAttribute('role') !== 'group';
    });
  },
});
