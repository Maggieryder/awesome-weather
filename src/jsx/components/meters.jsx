import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Row, Col} from 'react-bootstrap';
import _ from 'lodash'
import Meter from './meter'

class Meters extends Component {
  constructor(props) {
    super(props);
    //console.log('METERS PROPS >>', this.props)
    let { defaultStat, chart } = this.props
    this.state = {
      hrIndex: 0,
      hasError:false,
      chart: 'temps',
      listOrder: ['temps', 'winds', 'precips', 'feels', 'skies', 'humidities', 'dewpoints', 'pressures', 'uvis'],
      usedStats: [defaultStat,defaultStat,defaultStat,defaultStat,defaultStat,defaultStat],
      hiddenStats: []
    }
    this.onSelect = this.props.onSelect
  }
  componentWillReceiveProps(nextProps){
    //console.log('METERS componentWillReceiveProps', nextProps.chart)
    console.log('METERS componentWillReceiveProps', nextProps.weather.unit)
    this.setStats(nextProps.chart, this.state.listOrder)
  }

  handleMeterClick = (type) => {
    //console.log('Meter CLICK', type)
    this.onSelect(type)
    this.setState({chart:type})
  }
  handleLabelChange = (e, id, id2) => {
    let { listOrder } = this.state
    console.log('LABEL CHANGE', e.type, id, id2)
    //let swap = usedStats.splice(id, 1, e)[0]
    //console.log('usedStats', usedStats)
    //hiddenStats.splice(id2, 1, swap)
    //console.log('hiddenStats', hiddenStats)
    let newListOrder = this.swap(listOrder, parseInt(id), (id2*1+6));
    this.setStats(e.type, newListOrder)
  }
  swap(arr, x, y){
    let b = arr[x];
    arr[x] = arr[y];
    arr[y] = b;
    return arr;
  }

  setStats = ( chart, listOrder ) => {
    let { defaultStat } = this.props
    let { response, hourly, unit, isLoading } = this.props.weather
    let validData = !isLoading && !response.error && !response.results
    console.log('>>>>>>>>>>>>>>>Stats UNIT', unit)
    let data =  [
        {type:'temps', label:'Temperature', data:hourly.map(hour => hour.temp[unit]), suffix:'degrees'},
        {type:'winds', label:'Winds', data:hourly.map(hour => hour.wspd[unit]), data2:hourly.map(hour => hour.wdir.degrees), suffix:'speed'},
        {type:'precips', label:'Precipitation', data:hourly.map(hour => hour.pop), suffix:'percentage'},
        {type:'feels', label:'Feels like', data:hourly.map(hour => hour.feelslike[unit]), suffix:'degrees'},
        {type:'skies', label:'Cloud cover', data:hourly.map(hour => hour.sky), suffix:'percentage'},
        {type:'humidities', label:'Humidity', data:hourly.map(hour => hour.humidity), suffix:'percentage'},
        {type:'dewpoints', label:'Dewpoint', data:hourly.map(hour => hour.dewpoint[unit]), suffix:'degrees'},
        {type:'pressures', label:'Pressure', data:hourly.map(hour => hour.mslp[unit]), suffix:''},
        //{type:'snow', label:'Snow', data:hourly.map(hour => hour.snow[unit]), suffix:'measure'},
        {type:'uvis', label:'UVI', data:hourly.map(hour => hour.uvi), suffix:''}
      ]
    let stats = []
    if ( validData ) {
      for (let i = 0; i < listOrder.length; i++){
        stats.push(_.find(data, { 'type': listOrder[i] }));
      }
    } else {
      for (let j = 0; j < 6; j++){
        stats.push(defaultStat);
      }
    }

    //console.log('Stats', stats)
    //console.log('setStats', chart, this.props.chart, this.state.chart)
    this.setState({
      chart: chart,
      listOrder: listOrder,
      usedStats: stats.slice(0,6),
      hiddenStats: stats.slice(6)
    })
  }
  renderStat = (stat, id) => {
    let that = this
    let { hrIndex } = this.props
    let { unit, isLoading  } = this.props.weather
    let { hiddenStats, chart } = this.state

    const colStyle = {
      padding:'0 0 0 4px'
    }
    //if (id < 6){
      return  <Col key={id} sm={2} xs={4} style={colStyle}>
                <Meter id={id}
                    type={stat.type}
                    unit={unit}
                    isLoading={isLoading}
                    hasError={this.state.hasError}
                    data={stat.data ? stat.data[hrIndex] : '...'}
                    data2={stat.data2 ? stat.data2[hrIndex] : ''}
                    label={stat.label ? stat.label : ''}
                    suffix={stat.suffix ? stat.suffix : ''}
                    onClick={that.handleMeterClick}
                    hiddenStats = {id>2 ? hiddenStats : []}
                    onLabelChange={that.handleLabelChange}
                    active={chart===stat.type ? ' active' : ''} />
      </Col>
    //}
  }
  render(){
    let { usedStats } = this.state
    //console.log('RENDERING METERS')
    return (
      <Row style={{margin:'8px 4px 0 4px'}}>
        {usedStats.map(this.renderStat)}
      </Row>
    );
  }
}

Meters.propTypes = {
  onSelect: PropTypes.func.isRequired,
  hrIndex: PropTypes.number.isRequired,
  weather: PropTypes.object.isRequired,
  chart: PropTypes.string,
  defaultStat: PropTypes.object
}

Meters.defaultProps = {
  hrIndex: 0,
  chart: 'temps',
  weather: {},
  defaultStat: {
    type:'',
    label:'',
    data: '',
    suffix:''
  }
}

function mapStateToProps({weather}){
  return { weather }
}

export default connect(mapStateToProps)(Meters)
