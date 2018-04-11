import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click, find, findAll } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';

moduleForComponent('polaris-tag', 'Integration | Component | polaris tag', {
  integration: true,

  beforeEach() {
    this.register('component:svg-jar', MockSvgJarComponent);
  }
});

const tag = 'Wholesale';
const componentSelector = 'span.Polaris-Tag';
const buttonSelector = 'button.Polaris-Tag__Button';
const iconSelector = 'span.Polaris-Icon';

const tagValueSelector = buildNestedSelector(
  componentSelector,
  'span'
);
const tagButtonSelector = buildNestedSelector(
  componentSelector,
  buttonSelector
);
const tagIconSelector = buildNestedSelector(
  buttonSelector,
  iconSelector
);

test('it renders the correct HTML in inline usage', function(assert) {
  this.set('text', tag);
  this.render(hbs`{{polaris-tag text=text}}`);

  const tagComponent = findAll(componentSelector);
  assert.equal(tagComponent.length, 1, 'it renders a single tag component');

  const tagValue = find(tagValueSelector);
  assert.ok(tagValue, 'it renders a span to hold the `text` value');
  assert.equal(tagValue.textContent.trim(), tag, 'it renders the `text` value correctly');

  const tagButton = find(tagButtonSelector);
  assert.ok(tagButton, 'it renders a tag button');

  const tagIcon = find(tagIconSelector);
  const { iconSource } = tagIcon.querySelector('svg').dataset;
  assert.ok(tagIcon, 'it renders an icon inside the tag button');
  assert.equal(iconSource, 'polaris/cancel', 'it uses the correct polaris/cancel icon as the icon source');
});

test('it renders the correct HTML in block usage', function(assert) {
  this.set('tag', tag);

  this.render(hbs`
    {{#polaris-tag}}
      {{tag}}
    {{/polaris-tag}}
  `);

  const tagComponent = findAll(componentSelector);
  assert.equal(tagComponent.length, 1, 'it renders a single tag component');

  const tagValue = find(tagValueSelector);
  assert.ok(tagValue, 'it renders a span to hold the `tag` value');
  assert.equal(tagValue.textContent.trim(), tag, 'it renders the `tag` value correctly');

  const tagButton = find(tagButtonSelector);
  assert.ok(tagButton, 'it renders a tag button');

  const tagIcon = find(tagIconSelector);
  const { iconSource } = tagIcon.querySelector('svg').dataset;
  assert.ok(tagIcon, 'it renders an icon inside the tag button');
  assert.equal(iconSource, 'polaris/cancel', 'it uses the correct polaris/cancel icon as the icon source');
});

test('it calls an `onRemove` action when the button is clicked', function(assert) {
  this.set('onRemoveActionFired', false);

  this.render(hbs`
    {{polaris-tag
      onRemove=(action (mut onRemoveActionFired) true)
    }}
  `);

  click(tagButtonSelector);
  assert.ok(this.get('onRemoveActionFired'), 'button clicked - onRemove action is called');
});