import React, {Component} from 'react'

import Cloudy from './icon-mostly-cloudy.jsx'
import PCloudy from './icon-partly-cloudy.jsx'
import PCloudyNt from './icon-partly-cloudy-night.jsx'
import MCloudy from './icon-mostly-cloudy.jsx'
import Clear from './icon-clear.jsx'
import ClearNt from './icon-clear-night.jsx'
import Rain from './icon-rain.jsx'
import RainChnce from './icon-rain-chance.jsx'
import Showers from './icon-showers.jsx'
import ShowersChnce from './icon-showers-chance.jsx'
import Snow from './icon-snow.jsx'
import SnowChnce from './icon-snow-chance.jsx'
import Flurries from './icon-flurries.jsx'
import FlurriesChnce from './icon-flurries-chance.jsx'
import Tstorm from './icon-tstorm.jsx'
import TstormChnce from './icon-tstorm-chance.jsx'
import Hot from './icon-hot.jsx'
import Haze from './icon-haze.jsx'
import Unknown from './icon-unknown.jsx'

let icons = {
  cloudy: Cloudy,
  partlycloudy: PCloudy,
  mostlysunny: PCloudy,
  mostlycloudy: MCloudy,
  overcast: MCloudy,
  partlysunny: MCloudy,
  sunny: Clear,
  clear: Clear,
  rain: Rain,
  chancerain: RainChnce,
  showers: Showers,
  chanceshowers: ShowersChnce,
  snow: Snow,
  chancesnow: SnowChnce,
  flurries: Flurries,
  chanceflurries: FlurriesChnce,
  hot: Hot,
  hazy: Haze,
  tstorms: Tstorm,
  chancetstorms: TstormChnce,
  sleet: Rain,
  chancesleet: Rain,
  fog: Haze,
  unknown: Unknown
}

let Icon

let svgStyle = {
  fill:'none',
  stroke:'#fff',
  strokeWidth: '2',
  strokeMitrelimit: 10,
  strokeLinecap:'round',
  //strokeLinejoin:'round',
  opacity:.8
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      afterdark: false,
      stroke: this.props.stroke,
      icon: this.props.desc

    }
    console.log(props.desc)
  }

  render() {
    icons.clear = this.state.afterdark ? ClearNt : Clear
    icons.partlycloudy = this.state.afterdark ? PCloudyNt : PCloudy
    Icon = icons[this.state.icon] || icons['unknown']
    svgStyle.strokeWidth = this.state.stroke

    return (
      <Icon style={svgStyle} />
    )
  }
}
