import React, { Component, PropTypes } from 'react'

class Hour extends Component {
  shouldComponentUpdate(nextProps){
    let currIdIsIndex = this.props.hrIndex===this.props.id
    let newIdIsIndex = nextProps.hrIndex===nextProps.id
    return currIdIsIndex !== newIdIsIndex || this.props.hr !== nextProps.hr || this.props.isLoading !== nextProps.isLoading
  }
  render (){
    //console.log('RENDER HR')
    let { id, hr, hrIndex, isLoading } = this.props
    return (
      <li className={ parseInt(hr.hour)%6===0 ? 'marker' : null }>
          <div className={ parseInt(hr.hour)%6===0 ? 'no-marker' : null }>{!isLoading ? hr.hour : '' }</div>
          <div className={`indicator${id===hrIndex ? ' on' : ''}`} ></div>
      </li>
    )
  }
}

Hour.propTypes = {
  id: PropTypes.number.isRequired,
  hrIndex: PropTypes.number.isRequired,
  hr: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default Hour
