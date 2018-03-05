import React from 'react';
import { Col, Panel, Glyphicon } from 'react-bootstrap';

const AddEstateButton = props => <Col sm={6} xs={12} md={3}>
  <Panel className="add-estate-button" onClick={props.openAddEstate}>
    <Glyphicon className="glyph" glyph="plus" />
    <p>افزودن ملک جدید</p>
  </Panel>
</Col>;


export default AddEstateButton;
