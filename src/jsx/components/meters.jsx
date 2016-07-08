import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Row, Col} from 'react-bootstrap';
import _ from 'lodash'
import { swapArrayItems } from '../utils/helpers'
import { getLocalDataArray, setLocalDataArray } from '../../api/persist-data'
import Meter from 'meter'

class Meters extends Component {
  constructor(props) {
    super(props);
    //console.log('METERS PROPS >>', this.props)
    let { defaultStat, chart } = this.props
    this.state = {
      hrIndex: 0,
      hasError:false,
      chart: chart,
      listOrder: getLocalDataArray('readingListOrder').length > 1 ? getLocalDataArray('readingListOrder') : ['temps', 'winds', 'precips', 'feels', 'skies', 'humidities', 'dewpoints', 'pressures', 'uvis'],
      usedStats: [defaultStat,defaultStat,defaultStat,defaultStat,defaultStat,defaultStat],
      hiddenStats: []
    }
    this.onSelect = this.props.onSelect.bind(this)
  }
  componentWillReceiveProps(nextProps){
    //console.log('METERS componentWillReceiveProps', nextProps.weather)
    this.setStats(nextProps.chart, nextProps.weather)
  }

  handleMeterClick = (type) => {
    //console.log('Meter CLICK', type)
    this.onSelect(type)
    this.setState({chart:type})
  }
  handleLabelChange = (e, id, id2) => {
    //console.log('LABEL CHANGE', e.type, id, id2)
    let { listOrder } = this.state
    let newListOrder = swapArrayItems(listOrder, parseInt(id), (id2*1+6));
    setLocalDataArray('readingListOrder', newListOrder)
    this.setStats(e.type, this.props.weather)
  }

  setStats = ( chart, weather ) => {
    let { defaultStat } = this.props
    let { listOrder } = this.state
    let { response, hourly, isLoading, unit } = weather
    let validData = !isLoading && !response.error && !response.results
    //console.log('>>>>>>>>>>>>>>>METER validData', validData)
    let stats = []
    if ( validData ) {
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
          {type:'uvis', label:'UV Index', data:hourly.map(hour => hour.uvi), suffix:''}
        ]
      for (let i = 0; i < listOrder.length; i++){
        stats.push(_.find(data, { 'type': listOrder[i] }));
      }
    } else {
      for (let j = 0; j < 6; j++){
        stats.push(defaultStat);
      }
    }
    //console.log('Stats', stats)
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

  }

  render(){
    let { usedStats } = this.state
    //console.log('RENDERING METERS')
    return (
      <Row style={{margin:'0px 4px'}}>
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
