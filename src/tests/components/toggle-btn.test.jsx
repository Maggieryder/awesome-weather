const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const TestUtils = require('react-addons-test-utils');

import ToggleBtn from 'ToggleBtn';

var customMatcher = {
  toContain : function(expected) {
      return {
        compare: function(actual, expected){
          let result = {
              pass: true,
              message: ''
          }
          result.pass = actual.indexOf(expected)!= -1;
          if(!result.pass)
              result.message = actual + 'does not conatin the string ' + expected;
          return result;
      }
    }
  }
}

describe('<ToggleBtn/>', () => {

  it('renders just once', () => {
    const element = TestUtils.renderIntoDocument(<ToggleBtn options={['a','b']} styleClass='' toggleFunction={()=>{}}/>);
    let $el = $(ReactDOM.findDOMNode(element));
    expect($el.length).toBe(1);
    //expect(element).isElementOfType(ToggleBtn);
  })

  describe('render', () => {
    let TBtn
    beforeEach(function(){
      jasmine.addMatchers(customMatcher);
      //TBtn = TestUtils.renderIntoDocument(<ToggleBtn options={['a','b']} styleClass='' toggleFunction={()=>{}}/>);
    })

    it('className should contain "toggle-btn"', () => {
      TBtn = TestUtils.renderIntoDocument(<ToggleBtn options={['a','b']} styleClass='' toggleFunction={()=>{}}/>);
      let $el = $(ReactDOM.findDOMNode(TBtn));
      let className = $el.attr('class');
      expect(className).toContain('toggle-btn')
    })

    it('should have default PROP of 0', () => {
      TBtn = TestUtils.renderIntoDocument(<ToggleBtn options={['a','b']} styleClass='' toggleFunction={()=>{}}/>);
      let actual = TBtn.props.state;
      expect(actual).toBe(0);
    });

    it('should have override PROP of 1', () => {
      TBtn = TestUtils.renderIntoDocument(<ToggleBtn options={['a','b']} styleClass='' toggleFunction={()=>{}} state={1}/>);
      let actual = TBtn.props.state;
      expect(actual).toBe(1);
    });

    it('should have default STATE of 0', () => {
      TBtn = TestUtils.renderIntoDocument(<ToggleBtn options={['a','b']} styleClass='' toggleFunction={()=>{}}/>);
      let actual = TBtn.state.toggle;
      expect(actual).toBe(0);
    });

    it('should have default STATE of 1', () => {
      TBtn = TestUtils.renderIntoDocument(<ToggleBtn options={['a','b']} styleClass='' toggleFunction={()=>{}} state={1}/>);
      let actual = TBtn.state.toggle;
      expect(actual).toBe(1);
    });

    it('should have been called once and twice', () => {
      TBtn = TestUtils.renderIntoDocument(<ToggleBtn options={['a','b']} styleClass='' toggleFunction={()=>{}}/>);
      spyOn(TBtn, 'handleToggle')
      expect(TBtn.handleToggle.calls.count()).toBe(0);
      TBtn.handleToggle();
      expect(TBtn.handleToggle).toHaveBeenCalled();
      expect(TBtn.handleToggle.calls.count()).toBe(1);
      TBtn.handleToggle();
      expect(TBtn.handleToggle.calls.count()).toBe(2);
    });

    it('should toggle state on click', () => {
      TBtn = TestUtils.renderIntoDocument(<ToggleBtn options={['a','b']} styleClass='' toggleFunction={()=>{}}/>);
      spyOn(TBtn, 'handleToggle').and.callThrough()
      expect(TBtn.state.toggle).toBe(0)
      TBtn.handleToggle();
      expect(TBtn.state.toggle).toBe(1)
      TBtn.handleToggle();
      expect(TBtn.state.toggle).toBe(0)
    });
  });

})
