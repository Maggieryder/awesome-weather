import React, {Component} from 'react';
import Bootstrap, { Col, ListGroup, ListGroupItem } from 'react-bootstrap';

export default (props) => {
  let { show, items, onSelect } = props;
  
  return (
    show ?
    <Col sm={6} smOffset={3}>
      <ListGroup className="choices">
      {items.map((item, id) => {
        let name = item.city + ', ' + (item.state ? item.state : item.country_name),
        query = item.l.replace('/q/','');
        return <ListGroupItem key={id} onClick={onSelect.bind(this, query)} >{name}</ListGroupItem>
      })}
      </ListGroup>
    </Col>
    : null
  );
}
