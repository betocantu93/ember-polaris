import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('polaris-page', 'Integration | Component | polaris page', {
  integration: true
});

test('it renders title and content correctly', function(assert) {
  this.render(hbs`
    {{#polaris-page title="This is the title"}}
      <div class="test-page-content">This is some test content</div>
    {{/polaris-page}}`
  );

  const $pages = this.$(' > div.Polaris-Page');
  assert.equal($pages.length, 1, 'renders one page div');

  const $headers = $pages.find(' > div.Polaris-Page__Header');
  assert.equal($headers.length, 1, 'renders one page header div');

  const $displayTexts = $headers.find(' > h1.Polaris-DisplayText.Polaris-DisplayText--sizeLarge');
  assert.equal($displayTexts.length, 1, 'renders one page header display text');
  const titleText = $displayTexts.text().trim();
  assert.equal(titleText, 'This is the title');

  const $contentWrappers = $pages.find(' > div.Polaris-Page__Content');
  assert.equal($contentWrappers.length, 1, 'renders one page content wrapper div');

  const $contents = $contentWrappers.find(' > div.test-page-content');
  assert.equal($contents.length, 1, 'renders one content div');

  const contentText = $contents.text().trim();
  assert.equal(contentText, 'This is some test content', 'renders correct content');
});
