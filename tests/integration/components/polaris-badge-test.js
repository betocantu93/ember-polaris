import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-badge', 'Integration | Component | polaris badge', {
  integration: true
});

const badgeSelector = 'span.Polaris-Badge';

test('it renders the correct HTML in basic inline usage', function(assert) {
  this.render(hbs`{{polaris-badge text="Inline badge"}}`);

  const badges = findAll(badgeSelector);
  assert.equal(badges.length, 1, 'renders one badge');
  assert.equal(badges[0].textContent.trim(), 'Inline badge')
});

test('it renders the correct HTML in basic block usage', function(assert) {
  this.render(hbs`
    {{#polaris-badge}}
      Block badge
    {{/polaris-badge}}
  `);

  const badges = findAll(badgeSelector);
  assert.equal(badges.length, 1, 'renders one badge');
  assert.equal(badges[0].textContent.trim(), 'Block badge')
});

test('it renders the correct HTML when status is set', function(assert) {
  this.render(hbs`
    {{#polaris-badge status=status}}
      Block badge
    {{/polaris-badge}}
  `);

  const badge = find(badgeSelector);
  assert.ok(badge, 'renders the badge');

  // With status unset:
  //  - shouldn't apply any status classes
  //  - shouldn't render any visually hidden components
  assert.equal(badge.className.indexOf('Polaris-Badge--'), -1, 'status not set - does not apply status classes');

  const visuallyHiddenSelector = buildNestedSelector(badgeSelector, 'span.Polaris-VisuallyHidden');
  let visuallyHiddenComponents = findAll(visuallyHiddenSelector);
  assert.equal(visuallyHiddenComponents.length, 0, 'status not set - does not render any visually hidden components');

  // With status set to default:
  //  - shouldn't apply any status classes
  //  - should render empty visually hidden component
  this.set('status', 'default');
  assert.equal(badge.className.indexOf('Polaris-Badge--status'), -1, 'status set to default - does not apply status classes');

  visuallyHiddenComponents = findAll(visuallyHiddenSelector);
  assert.equal(visuallyHiddenComponents.length, 1, 'status set to default - renders one visually hidden component');
  assert.equal(visuallyHiddenComponents[0].textContent.trim(), '', 'status set to default - renders correct visually hidden content');

  // With status set to success:
  //  - should apply success status class
  //  - should render visually hidden component with success text
  this.set('status', 'success');
  assert.ok(badge.classList.contains('Polaris-Badge--statusSuccess'), 'status set to success - applies correct status class');

  visuallyHiddenComponents = findAll(visuallyHiddenSelector);
  assert.equal(visuallyHiddenComponents.length, 1, 'status set to success - renders one visually hidden component');
  assert.equal(visuallyHiddenComponents[0].textContent.trim(), 'Success', 'status set to success - renders correct visually hidden content');

  // With status set to info:
  //  - should apply info status class
  //  - should render visually hidden component with info text
  this.set('status', 'info');
  assert.ok(badge.classList.contains('Polaris-Badge--statusInfo'), 'status set to info - applies correct status class');

  visuallyHiddenComponents = findAll(visuallyHiddenSelector);
  assert.equal(visuallyHiddenComponents.length, 1, 'status set to info - renders one visually hidden component');
  assert.equal(visuallyHiddenComponents[0].textContent.trim(), 'Info', 'status set to info - renders correct visually hidden content');

  // With status set to attention:
  //  - should apply attention status class
  //  - should render visually hidden component with attention text
  this.set('status', 'attention');
  assert.ok(badge.classList.contains('Polaris-Badge--statusAttention'), 'status set to attention - applies correct status class');

  visuallyHiddenComponents = findAll(visuallyHiddenSelector);
  assert.equal(visuallyHiddenComponents.length, 1, 'status set to attention - renders one visually hidden component');
  assert.equal(visuallyHiddenComponents[0].textContent.trim(), 'Attention', 'status set to attention - renders correct visually hidden content');

  // With status set to warning:
  //  - should apply warning status class
  //  - should render visually hidden component with warning text
  this.set('status', 'warning');
  assert.ok(badge.classList.contains('Polaris-Badge--statusWarning'), 'status set to warning - applies correct status class');

  visuallyHiddenComponents = findAll(visuallyHiddenSelector);
  assert.equal(visuallyHiddenComponents.length, 1, 'status set to warning - renders one visually hidden component');
  assert.equal(visuallyHiddenComponents[0].textContent.trim(), 'Warning', 'status set to warning - renders correct visually hidden content');
});
