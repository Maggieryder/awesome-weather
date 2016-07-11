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
    this.state = {
      hrIndex: 0,
      listOrder: getLocalDataArray('readingListOrder').length > 1 ? getLocalDataArray('readingListOrder') : ['temps', 'winds', 'precips', 'feels', 'skies', 'humidities', 'dewpoints', 'pressures', 'uvis']
    }
    this.hiddenStats = []
    this.onSelect = this.props.onSelect.bind(this)
  }

  setHiddenStats(arr){
    this.hiddenStats = arr
  }

  getHiddenStats(){
    return this.hiddenStats
  }

  componentWillReceiveProps(nextProps){
    //console.log('METERS componentWillReceiveProps', nextProps.chart, nextProps.unit, nextProps.weather.isLoading)
  }

  handleLabelChange = (e, id, id2) => {
    //console.log('LABEL CHANGE', e.type, id, id2)
    let { listOrder } = this.state
    let newListOrder = swapArrayItems(listOrder, parseInt(id), (id2*1+6));
    setLocalDataArray('readingListOrder', newListOrder)
    this.setState({listOrder: newListOrder})
    this.onSelect(e.type)
  }

  renderStat = (stat, id) => {
    let that = this
    let { hrIndex, unit, chart } = this.props
    let { isLoading  } = this.props.weather
    //let { hiddenStats } = this.state //, chart
    const colStyle = {
      padding:'0 0 0 4px'
    }

    return  <Col key={id} sm={2} xs={4} style={colStyle}>
              <Meter id={id}
                  type={stat.type}
                  unit={unit}
                  isLoading={isLoading}
                  data={stat.data ? stat.data[hrIndex] : '...'}
                  data2={stat.data2 ? stat.data2[hrIndex] : ''}
                  label={stat.label ? stat.label : ''}
                  suffix={stat.suffix ? stat.suffix : ''}
                  onClick={(type) => {that.onSelect(type)}}
                  hiddenStats = {id>2 ? this.getHiddenStats() : []}
                  onLabelChange={that.handleLabelChange}
                  active={chart===stat.type ? ' active' : ''} />
    </Col>
  }

  setStatsArray(){
    let { defaultStat, unit } = this.props
    let { response, hourly, isLoading } = this.props.weather
    let validData = !isLoading && !response.error && !response.results
    let data = []
    if ( validData ) {
      data = [
          {type:'temps', label:'Temperature', data:hourly.map(hour => hour.temp[unit]), suffix:'degrees'},
          {type:'winds', label:'Winds', data:hourly.map(hour => hour.wspd[unit]), data2:hourly.map(hour => hour.wdir.degrees), suffix:'speed'},
          {type:'precips', label:'Precipitation', data:hourly.map(hour => hour.pop), suffix:'percentage'},
          {type:'feels', label:'Feels like', data:hourly.map(hour => hour.feelslike[unit]), suffix:'degrees'},
          {type:'skies', label:'Cloud cover', data:hourly.map(hour => hour.sky), suffix:'percentage'},
          {type:'humidities', label:'Humidity', data:hourly.map(hour => hour.humidity), suffix:'percentage'},
          {type:'dewpoints', label:'Dewpoint', data:hourly.map(hour => hour.dewpoint[unit]), suffix:'degrees'},
          {type:'pressures', label:'Pressure', data:hourly.map(hour => hour.mslp[unit]), suffix:'pressure'},
          //{type:'snow', label:'Snow', data:hourly.map(hour => hour.snow[unit]), suffix:'measure'},
          {type:'uvis', label:'UV Index', data:hourly.map(hour => hour.uvi), suffix:''}
        ]
    } else {
      for (let j = 0; j < 6; j++){
        data.push(defaultStat);
      }
    }
    return data
  }

  render(){
    let { listOrder } = this.state
    let data = this.setStatsArray()

    let stats = []
    if (data[0].type !== ''){
      for (let i = 0; i < listOrder.length; i++){
        stats.push(_.find(data, { 'type': listOrder[i] }));
      }
      this.setHiddenStats(stats.slice(6))
    } else {
      stats = data.slice()
    }

    //console.log('RENDERING METERS')
    return (
      <Row style={{margin:'0px 4px'}}>
        {stats.slice(0,6).map(this.renderStat)}
      </Row>
    );
  }
}

Meters.propTypes = {
  onSelect: PropTypes.func.isRequired,
  hrIndex: PropTypes.number.isRequired,
  weather: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
  chart: PropTypes.string.isRequired,
  defaultStat: PropTypes.object
}

Meters.defaultProps = {
  hrIndex: 0,
  chart: 'temps',
  weather: {},
  unit: 'metric',
  defaultStat: {
    type:'',
    label:'',
    data: '',
    suffix:''
  }
}

function mapStateToProps({weather, unit}){
  return { weather, unit }
}

export default connect(mapStateToProps)(Meters)
