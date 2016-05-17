import React, {Component, PropTypes} from 'react'

class WeatherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: 'metric'
    }
  }
  onFormSubmit(e){
    e.preventDefault()

    let location = this.refs.location.value
    if (location.length > 0){
      this.refs.location.value = ''
      this.props.onSearch(location)
    }
  }
  onUnitChange(e){
    //let unit = this.refs.unit.value
    this.setState({unit:e.target.id})
    this.props.onUnitChange(e.target.id)
  }
  render(){
    let u = this.state.unit==='metric' ? 'C' : 'F'
    return (
      <form onSubmit={this.onFormSubmit.bind(this)} style={{marginTop:'10px'}}>
        <div className="input-group">
          <input type="text" className="form-control" ref="location" placeholder="City & State/Country OR Zip"></input>
          <div className="input-group-btn">
            <button className="btn btn-default">Get Weather</button>
            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">&deg;{u} <span className="caret"></span></button>
             <ul className="dropdown-menu dropdown-menu-right">
               <li><a href="#" id="metric" onClick={this.onUnitChange.bind(this)}>&deg;Centigrade</a></li>
               <li><a href="#" id="english" onClick={this.onUnitChange.bind(this)}>&deg;Farenheit</a></li>
             </ul>
          </div>
        </div>
      </form>
    )
  }
}

export default WeatherForm
