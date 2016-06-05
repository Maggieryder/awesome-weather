import React, {Component} from 'react'
import { connect } from 'react-redux'
import Bootstrap, { Row, Col} from 'react-bootstrap';
import Statistic from './statistic'

class Statistics extends Component {
  constructor(props) {
    super(props);
    console.log('Statistics PROPS >>', this.props)
    this.state = {
      hrIndex: 0,
      chart: 'temps',
    }
  }
  handleStatClick(type){
    //console.log('stat CLICK', type)
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
                <Statistic type={stat.type}
                    unit={unit}
                    isLoading={isLoading}
                    data={(stat.data2 ? stat.data2[hrIndex]+' ' : '') + stat.data[hrIndex]}
                    label={stat.label}
                    suffix={stat.suffix}
                    onClick={that.handleStatClick.bind(this)}
                    onLabelChange={that.handleLabelChange}
                    active={this.state.chart===stat.type ? ' active' : ''} />
      </Col>
    }
  }
  render(){

    let {hourly, unit} = this.props.weather

    let stats = [
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

export default connect(mapStateToProps)(Statistics)


/*

*/
