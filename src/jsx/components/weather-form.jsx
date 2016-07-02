import React, { Component, PropTypes } from 'react'
//import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Glyphicon } from 'react-bootstrap';

import { autoComplete } from '../../actions/index'
import ToggleBtn from 'toggle-btn'
//import MultipleChoices from 'multiple-choice-list';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    //console.log('FROM props', props)
    this.state = {
      searchmode:false,
      term:''
    }
    this.onSearch = this.props.onSearch
    this.onSubmit = this.props.onSubmit
  }

  onInputChange = (e) => {
    this.setState({term: e.target.value})
    if (e.target.value.length >= 3){
      //this.props.autoComplete(e.target.value)
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.reset()
    let location = this.state.term
    if (location.length > 0){
      this.onSubmit(location)
    }
  }

  reset = () => {
    this.setState({
      term:'',
      searchmode:false
    })
    this.onSearch(false)
  }

  handleSearchMode(){
    this.setState({searchmode:true})
    this.onSearch(true)
    setTimeout(this.handleFocus, 100)
  }

  handleFocus = () => {
    if (this.myTextInput !== null) {
      this.myTextInput.focus();
    }
  }
  // this isn't working quite like I planned
  handleBlur = () => {
    if (this.myTextInput !== null) {
      this.myTextInput.blur();
    }
    this.reset()
    //onBlur={this.handleBlur}
  }

  render(){
    const btnStyle = {
      fontSize:'18px',
      width:'40px',
      borderLeft:'1px solid rgba(255,255,255,0)',
      padding:'3px 10px 0'
    }
    const options = [
      <Glyphicon glyph="search" />
    ]
    if (!this.state.searchmode){
      return <ToggleBtn toggleFunction={this.handleSearchMode.bind(this)} options={options} styleClass="pull-right"/>
    }
    let { locations } = this.props.locations
    return (

      <form onSubmit={this.onFormSubmit}>
        <div className="input-group" >
          <input onChange={this.onInputChange}
                  type="text"
                  className="form-control"
                  placeholder="City & State/Country OR Zip"
                  value={this.state.term}
                  ref={(ref) => this.myTextInput = ref} />
          <div className="input-group-btn" >
            <button className="btn" style={btnStyle}><Glyphicon glyph="search" /></button>
          </div>
        </div>

      </form>
    )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  locations: PropTypes.object
}

Searchbar.defaultProps = {
  locations: {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoComplete }, dispatch)
}

function mapStateToProps({ weather, locations }){
  return { weather, locations }
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)

/*
let popover = <Popover id="popover" title="Choose meter" >
                <MultipleChoices items={response.results} onSelect={this.handleChoiceSelect} />
              </Popover>;
*/
