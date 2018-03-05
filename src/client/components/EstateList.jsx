import React, { Fragment } from 'react';
import { Row, Grid, Clearfix } from 'react-bootstrap';
import Estate from './Estate.jsx';
import AddEstateButton from './AddEstateButton.jsx';

const EstateList = props => {
  return (
    <Grid dir="rtl">
      <Row>
        {props.estates
          ? props.estates.map((estate, i) => (
            <Estate onDelete={props.onDelete} key={estate._id} estate={estate} />
          ))
          : null}
        <Clearfix />
        <AddEstateButton openAddEstate={props.openAddEstate} />
      </Row>
    </Grid>
  );
};

export default EstateList;
