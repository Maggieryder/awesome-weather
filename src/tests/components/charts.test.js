const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const TestUtils = require('react-addons-test-utils');

import Charts from 'Charts';

xdescribe('Charts', () => {
  it('renders', () => {
    const element = TestUtils.renderIntoDocument(<Charts/>);
    //let $el = $(ReactDOM.findDOMNode(chart));
    //let actualIndex = $el.find('.clock-text').text();
    expect(element).isElementOfType(Charts);
  })

  describe('render', () => {
    it('should span 96 hrs', () => {
      const chart = TestUtils.renderIntoDocument(<Charts/>);
      let actual = chart.defaultProps.numHrs;

      expect(actual).toEqual(96);
    });
  });

})
