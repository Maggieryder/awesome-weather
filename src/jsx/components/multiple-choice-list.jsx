import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ChoiceList = (props) => {
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

ChoiceList.propTypes = {
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default ChoiceList
