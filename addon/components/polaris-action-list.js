import Component from '@ember/component';
import { computed } from '@ember/object';
import { gt } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { isArray } from '@ember/array';
import { assert } from '@ember/debug';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-action-list';

/**
 * Polaris action list component.
 * See https://polaris.shopify.com/components/actions/action-list
 */
@tagName('')
@layout(template)
export default class PolarisActionList extends Component {
  /**
   * Collection of actions for list
   *
   * @property items
   * @public
   * @type {Array}
   * @default null
   */
  items = null;

  /**
   * Collection of sectioned action items
   *
   * @property sections
   * @public
   * @type {Array}
   * @default null
   */
  sections = null;

  /**
   * Defines a specific role attribute for each action in the list
   *
   * @property actionRole
   * @public
   * @type {String}
   * @default null
   */
  actionRole = null;

  /**
   * Callback when any item is clicked or keypressed
   *
   * @property onActionAnyItem
   * @public
   * @type {function}
   * @default no-op
   */
  onActionAnyItem() {}

  /**
   * @private
   */
  @gt('finalSections.length', 1)
  hasMultipleSections;

  /**
   * @private
   */
  @computed('items', 'sections.[]')
  get finalSections() {
    let finalSections = [];

    let items = this.get('items');
    if (isPresent(items)) {
      finalSections.push({ items });
    }

    let sections = this.get('sections') || [];
    assert(
      `ember-polaris::polaris-action-list - sections must be an array, you passed ${sections}`,
      isArray(sections)
    );
    finalSections.push(...sections);

    return finalSections;
  }
}
