import React, {Component} from 'react'
import { connect } from 'react-redux'
import Bootstrap, { Row, Col} from 'react-bootstrap';
import Meter from './meter'

class Meters extends Component {
  constructor(props) {
    super(props);
    console.log('METERS PROPS >>', this.props)
    this.state = {
      hrIndex: 0,
      hasError:false,
      chart: 'temps',
    }
  }
  handleMeterClick(type){
    //console.log('Meter CLICK', type)
    this.setState({chart:type})
    this.props.onSelect(type)
  }
  handleLabelChange(e){
    console.log('LABEL CHANGE', e)
  }
  renderStat = (stat, id) => {
    let that = this
    let {hrIndex} = this.props
    let { unit, isLoading } = this.props.weather
    const colStyle = {
      padding:'0 0 0 4px'
    }
    if (id < 6){
      return  <Col key={id} sm={2} xs={4} style={colStyle}>
                <Meter type={stat.type}
                    unit={unit}
                    isLoading={isLoading}
                    hasError={this.state.hasError}
                    data={(stat.data2 ? stat.data2[hrIndex]+' ' : '') + stat.data ? stat.data[hrIndex] : '...'}
                    label={stat.label ? stat.label : ''}
                    suffix={stat.suffix ? stat.suffix : ''}
                    onClick={that.handleMeterClick.bind(this)}
                    onLabelChange={that.handleLabelChange}
                    active={this.state.chart===stat.type ? ' active' : ''} />
      </Col>
    }
  }
  render(){
    let defaultStat = {
      type:'',
      label:'',
      data: [],
      suffix:''
    }

    let {response, hourly, unit, isLoading} = this.props.weather
    //console.log('METERS response',response)

    let stats = isLoading || response.error ? [defaultStat,defaultStat,defaultStat,defaultStat,defaultStat,defaultStat] : [
        {type:'temps', label:'Temperature', data:hourly.map(hour => hour.temp[unit]), suffix:'degrees'},
        {type:'winds', label:'Winds', data:hourly.map(hour => hour.wspd[unit]), data2:hourly.map(hour => hour.wdir.dir), suffix:'speed'},
        {type:'precips', label:'Precipitation', data:hourly.map(hour => hour.pop), suffix:'percentage'},
        {type:'feels', label:'Feels like', data:hourly.map(hour => hour.feelslike[unit]), suffix:'degrees'},
        {type:'skies', label:'Cloud coverage', data:hourly.map(hour => hour.sky), suffix:'percentage'},
        {type:'humidities', label:'Humidity', data:hourly.map(hour => hour.humidity), suffix:'percentage'},
        {type:'dewpoints', label:'Dewpoint', data:hourly.map(hour => hour.dewpoint[unit]), suffix:'degrees'},
        {type:'pressures', label:'Pressure', data:hourly.map(hour => hour.mslp[unit]), suffix:''},
        //{type:'snow', label:'Snow', data:hourly.map(hour => hour.snow[unit]), suffix:'measure'},
        {type:'uvis', label:'UVI', data:hourly.map(hour => hour.mslp[unit]), suffix:''}
      ]

    return (
      <Row style={{margin:'8px 4px 0 4px'}}>
        {stats.map(this.renderStat)}
      </Row>
    );
  }
}

function mapStateToProps({weather}){
  return { weather }
}

export default connect(mapStateToProps)(Meters)
