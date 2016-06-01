import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getWeather } from '../../actions/index'
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
      this.props.getWeather(location)
    }
  }
  handleSearchMode(){
    this.setState({searchmode:true})
    this.props.onSearch(true)
  }

  render(){
    const btnStyle = {
      height:'40px',
      background:'rgba(255,255,255,.05)',
      borderColor:'rgba(255,255,255,.1)',
      color:'rgba(255,255,255,1)',
      fontSize:'18px',
      padding:'3px 10px 0'
    }
    const fieldStyle = {
      height:'40px',
      background:'rgba(255,255,255,.05)',
      borderColor:'rgba(255,255,255,.1)',
      color:'rgba(255,255,255,.7)'
    }
    const options = [
      <span className="glyphicon glyphicon-search" aria-hidden="true" ></span>,
      <span className="glyphicon glyphicon-remove" aria-hidden="true" ></span>
    ]
    if (!this.state.searchmode){
      return <ToggleBtn toggleFunction={this.handleSearchMode.bind(this)} options={options} styleClass="pull-right"/>
      //return <button onClick={this.handleSearchMode.bind(this)} className="btn btn-group pull-right"><span className="glyphicon glyphicon-search" aria-hidden="true" ></span></button>;
    }
    return (

      <form onSubmit={this.onFormSubmit}>
        <div className="input-group" >
          <input  onChange={this.onInputChange}
                  type="text"
                  className="form-control"
                  placeholder="City & State/Country OR Zip"
                  value={this.state.term}
                  style={fieldStyle} />
          <div className="input-group-btn" >
            <button className="btn btn-default" style={btnStyle}><span className="glyphicon glyphicon-search" aria-hidden="true" ></span></button>
          </div>
        </div>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getWeather }, dispatch)
}

export default connect(null, mapDispatchToProps)(Searchbar)
