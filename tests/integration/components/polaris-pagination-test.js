import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers';

const paginationSelector = 'span.Polaris-Pagination';

moduleForComponent('polaris-pagination', 'Integration | Component | polaris pagination', {
  integration: true
});

test('it renders correctly', function(assert) {
  this.render(hbs`{{polaris-pagination}}`);

  let pagination = find(paginationSelector);
  assert.ok(pagination, 'inline-mode - renders correctly');
  assert.notOk(pagination.classList.contains('Polaris-Pagination--plain'), `inline-mode - doesn't have 'plain' class`);

  assert.ok(find('button.Polaris-Pagination__Button[aria-label="Previous"][disabled]'), 'inline-mode - has previous button disabled');
  assert.ok(find('button.Polaris-Pagination__Button > span.Polaris-Icon'), 'inline-mode - previous button has icon');

  assert.ok(find('button.Polaris-Pagination__Button[aria-label="Next"][disabled] > span.Polaris-Icon'), 'inline-mode - has next button disabled');
  assert.ok(find('button.Polaris-Pagination__Button > span.Polaris-Icon'), 'inline-mode - next button has icon');


  // Pagination in plain mode
  this.render(hbs`{{polaris-pagination plain=true}}`);

  pagination = find(paginationSelector);
  assert.ok(pagination.classList.contains('Polaris-Pagination--plain'), 'plain pagination - has proper class');


  // Pagination with previous / next buttons enabled
  this.render(hbs`{{polaris-pagination
    hasPrevious=true
    hasNext=true
  }}`);

  assert.notOk(find('button.Polaris-Pagination__Button[aria-label="Previous"][disabled]'), 'inline-mode - has previous button enabled');
  assert.notOk(find('button.Polaris-Pagination__Button[aria-label="Next"][disabled]'), 'inline-mode - has next button enabled');
 });

test('it fires events correctly', function(assert) {
  this.on('clickPrevious', () => {
    assert.ok(true, 'clicking previus button fires `onPrevious` callback');
  });
  this.on('clickNext', () => {
    assert.ok(true, 'clicking next button fires `onNext` callback');
  });

  this.render(hbs`{{polaris-pagination
    hasPrevious=true
    hasNext=true
    onPrevious=(action 'clickPrevious')
    onNext=(action 'clickNext')
  }}`);

  click('button[aria-label="Previous"]');
  click('button[aria-label="Next"]');
});
