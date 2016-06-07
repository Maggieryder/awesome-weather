import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Bootstrap, { Glyphicon } from 'react-bootstrap';

import { getWeather, loading } from '../../actions/index'
import ToggleBtn from './toggle-btn'

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchmode:false,
      term:''
    }
  }

  onInputChange = (e) => {
    this.setState({term: e.target.value})
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
      this.props.loading(true)
      this.props.getWeather(location)
    }
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getWeather, loading }, dispatch)
}

export default connect(null, mapDispatchToProps)(Searchbar)
