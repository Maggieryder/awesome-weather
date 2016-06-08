import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Bootstrap, { Glyphicon } from 'react-bootstrap';

import { getWeather, loading, autoComplete, locations } from '../../actions/index'
import ToggleBtn from './toggle-btn'
import MultipleChoices from './multiple-choice-list';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    console.log('FROM props', props)
    this.state = {
      searchmode:false,
      term:''
    }
  }

  onInputChange = (e) => {
    this.setState({term: e.target.value})
    if (e.target.value.length >= 3){
      this.props.autoComplete(e.target.value)
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    let location = this.state.term
    if (location.length > 0){
      this.setState({
        term:'',
        searchmode:false,
      })
      this.props.onSearch(false)
      this.getLocation(location)
    }
  }

  handleChoiceSelect = (query) => {
    console.log('QID', query);
    this.getLocation(query);
  }

  getLocation = (query) => {
    this.props.loading(true)
    this.props.getWeather(query)
  }

  handleSearchMode(){
    this.setState({searchmode:true})
    this.props.onSearch(true)
    setTimeout(this.handleFocus.bind(this), 100)
  }

  handleFocus(){
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  }

  render(){
    const btnStyle = {
      fontSize:'18px',
      width:'40px',
      borderLeft:'1px solid rgba(255,255,255,0)',
      padding:'3px 10px 0'
    }
    const options = [
      <Glyphicon glyph="search" />,
      <Glyphicon glyph="remove" />
    ]
    if (!this.state.searchmode){
      return <ToggleBtn toggleFunction={this.handleSearchMode.bind(this)} options={options} styleClass="pull-right"/>
    }
    let results = [
      {city:'San Antonio', state:'AZ', l:'werghj'},
      {city:'New York', state:'NY', l:'qwerty'},
      {city:'Boston', state:'MA', l:'asdg'}
    ]
    let locations = this.props.locations.locations
    return (

      <form onSubmit={this.onFormSubmit}>
        <div className="input-group" >
          <input onChange={this.onInputChange}
                  type="text"
                  className="form-control"
                  placeholder="City & State/Country OR Zip"
                  value={this.state.term}
                  ref={(ref) => this.myTextInput = ref} />
          <MultipleChoices className="choices" show={this.state.term.length >= 4} items={locations} onSelect={this.handleChoiceSelect} />
          <div className="input-group-btn" >
            <button className="btn" style={btnStyle}><Glyphicon glyph="search" /></button>
          </div>
        </div>

      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getWeather, loading, autoComplete }, dispatch)
}

function mapStateToProps({ weather, locations }){
  return { weather, locations }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)

/*
let popover = <Popover id="popover" title="Choose meter" >
                <MultipleChoices items={response.results} onSelect={this.handleChoiceSelect} />
              </Popover>;
componentWillReceiveProps(props){
  let { modal } = props
  console.log('componentWillReceiveProps', modal)
  if( modal && !modal.modalOpen ){
      //this.getLocation('autoip');
  }
}
<console.log('CHOICES', response.results)
MultipleChoices items={response.results} onSelect={this.handleChoiceSelect} />*/
