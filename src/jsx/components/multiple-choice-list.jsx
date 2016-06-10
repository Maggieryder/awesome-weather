import React, {Component} from 'react';
import Bootstrap, { ListGroup, ListGroupItem } from 'react-bootstrap';

export default (props) => {
  let { items, onSelect } = props;

  return (
    <ListGroup>
      {items.map((item, id) => {
        let name = item.city + ', ' + (item.state ? item.state : item.country_name),
        query = item.l.replace('/q/','');
        return <ListGroupItem key={id} onClick={onSelect.bind(this, query)} >{name}</ListGroupItem>
      })}
    </ListGroup>
  );
}
