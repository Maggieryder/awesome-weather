import React, {Component} from 'react';
import Bootstrap, { Col } from 'react-bootstrap';

export default (props) => {
  let { items, onSelect } = props;
  return (
    <Col sm={6} smOffset={3}>
      <ul className="choices list-group">
      {items.map((item, id) => {
        let name = item.city + ', ' + (item.state ? item.state : item.country_name),
        query = item.l.replace('/q/','');
        return <li key={id} className="list-group-item" onClick={onSelect.bind(this, query)} >{name}</li>
      })}
      </ul>
    </Col>
  );
}
