import React from 'react';
//import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Meter from 'Meter';

describe('<Meter/>', () => {
  let wrapper

  beforeEach(function(){
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

  })

  it('allows us to set props', () => {
    expect(wrapper.props().type).to.equal('temps');
    //wrapper.setProps({ type: 'winds' });
    //expect(wrapper.props().type).to.equal('winds');
    //expect(wrapper.find('.reading')).to.have.length(1);
  })

  //xit('',() => {})
});
