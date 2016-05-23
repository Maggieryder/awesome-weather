import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getWeather } from '../../actions/index'

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      this.setState({term:''})
      this.props.getWeather(location)
    }
  }

  render(){
    return (
      <form onSubmit={this.onFormSubmit} style={{margin:'10px 0'}}>
        <div className="input-group">
          <input  onChange={this.onInputChange}
                  type="text"
                  className="form-control"
                  placeholder="City & State/Country OR Zip"
                  value={this.state.term} />
          <div className="input-group-btn">
            <button className="btn btn-default"><span className="glyphicon glyphicon-search" aria-hidden="true" ></span></button>
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
