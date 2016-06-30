import React from 'react';
//import ReactDOM from 'react-dom';
import jasmineEnzyme from 'jasmine-enzyme';
import { shallow, mount, render } from 'enzyme';
import Meter from 'Meter';

describe('<Meter/>', () => {

  let wrapper

  beforeEach(function(){
    jasmineEnzyme();
    wrapper = mount(<Meter id={0}
                        type='temps'
                        unit='metric'
                        data='22'
                        label='Temperature'
                        suffix='degrees'
                        active=''
                        isLoading={false}
                        hasError={false}
                        onClick={()=>{}}
                        hiddenStats={[]}
                      />);
  })

  afterEach(function(){
    wrapper.unmount();
  })

  it('should be a li with class "meter"', () => {
    expect(wrapper.find('.meter')).toMatchSelector('li');
    expect(wrapper.find('.meter')).toHaveClassName('meter');
  });

  it('should allow us to set props', () => {
    //expect(wrapper.props().type).to.equal('temps'); throws cant read prop of undefined error
    expect(wrapper).toHaveProp('type', 'temps'); // throws error when shallow tho documentation says it should work
    wrapper.setProps({ type: 'winds' });
    expect(wrapper).toHaveProp('type', 'winds');
  })

  it('should allow us to set state', () => {
    expect(wrapper).toHaveState('dropdownOpen', false);
    wrapper.setState({ dropdownOpen: true });
    expect(wrapper).toHaveState('dropdownOpen', true);
  })

  //xit('',() => {}) dropdownOpen
});
