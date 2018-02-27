import React from 'react';
import { Row, Grid } from 'react-bootstrap';
import Estate from './Estate.jsx';

const EstateList = props => {
  console.log(props.estates);
  return (
    <Grid dir="rtl">
      <Row>
        {props.estates
          ? props.estates.map(estate => (
            <Estate key={estate._id} estate={estate} />
          ))
          : null}
      </Row>
    </Grid>
  );
};

export default EstateList;
