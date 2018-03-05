import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Form, FormControl, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';

class AddEstate extends Component {
  state = {
    title: '',
    address: '',
    area: 0,
    floors: 1,
    floor: 1,
    image_url: '',
    estate_type: 'apartment',
    build_year: 1350,
    rooms: 1,
    parking: true,
    pre: 0,
    rent: 0,
    price: 0,
    image: ''
  };
  formChanged = (e) => {
    if (e.target.type == 'checkbox') {
      this.setState({
        [e.target.name]: e.target.checked
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  onImageChanged = (e) => {
    this.setState({
      image: e.target.files[0]
    });

  }

  onSubmit = (e) => {
    e.preventDefault();

    const newEstate = {
      title: this.state.title,
      address: this.state.address,
      area: this.state.area,
      floors: this.state.floors,
      floor: this.state.floor,
      image_url: this.state.image_url,
      estate_type: this.state.estate_type,
      build_year: this.state.build_year,
      rooms: this.state.rooms,
      parking: this.state.parking,
      pre: this.state.pre,
      rent: this.state.rent,
      price: this.state.price,
      seller: this.props.seller
    };

    axios('/api/estates', {
      method: 'POST',
      headers: {
        'Conent-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      data: newEstate
    }).then(this.uploadImage).catch(err => console.warn(err));
  }

  uploadImage = (res) => {
    var formData = new FormData();
    formData.append('image', this.state.image);

    axios(`/api/estates/${res.data.estate._id}/image`, {
      headers: {
        'Contet-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('token')
      },
      data: formData,
      method: 'PATCH'
    }).then((imageRes) => {
      this.props.closeAddEstate(true, res.data.estate, imageRes.data.fileName);
    }
    ).catch(error => console.warn(error.response));
  }

  render() {
    return (<Modal show={this.props.show} onHide={this.props.closeAddEstate}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={this.onSubmit}>
          <FormGroup controlId="estate-title">
            <ControlLabel>نام ملک</ControlLabel>
            <FormControl
              name="title"
              type="text"
              value={this.state.title}
              placeholder="نام ملک..."
              onChange={this.formChanged}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="estate-address">
            <ControlLabel>آدرس</ControlLabel>
            <FormControl
              name="address"
              type="text"
              value={this.state.address}
              placeholder="آدرس..."
              onChange={this.formChanged}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="estate-area">
            <ControlLabel>متراژ</ControlLabel>
            <FormControl
              name="area"
              type="number"
              value={this.state.area}
              placeholder="متراژ..."
              onChange={this.formChanged}
            />
            <FormControl.Feedback />
          </FormGroup>
          <input type="file" name="estateImage" onChange={this.onImageChanged} />
          <FormGroup controlId="estate-floors">
            <ControlLabel>تعداد طبقات</ControlLabel>
            <FormControl
              name="floors"
              type="number"
              value={this.state.floors}
              placeholder="تعداد طبقات..."
              onChange={this.formChanged}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="estate-floor">
            <ControlLabel>طبقه</ControlLabel>
            <FormControl
              name="floor"
              type="number"
              value={this.state.floor}
              placeholder="تعداد طبقات..."
              onChange={this.formChanged}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="estate-type">
            <ControlLabel>نوع ملک</ControlLabel>
            <FormControl componentClass="select" placeholder="نوع ملک" onChange={this.formChanged} name="estate_type">
              <option value="apartment">آپارتمان</option>
              <option value="land">زمین</option>
              <option value="villa">ویلا</option>
              <option value="comercial">مغازه</option>
            </FormControl>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="estate-year">
            <ControlLabel>سال ساخت:</ControlLabel>
            <FormControl
              name="build_year"
              type="number"
              value={this.state.build_year}
              placeholder="سال ساخت..."
              onChange={this.formChanged}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="estate-rooms">
            <ControlLabel>تعداد اتاق:</ControlLabel>
            <FormControl
              name="rooms"
              type="number"
              value={this.state.rooms}
              placeholder="تعداد اتاق..."
              onChange={this.formChanged}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="estate-parking">
            <ControlLabel>پارکینگ:</ControlLabel>
            <Checkbox name="parking"
              checked={this.state.parking}
              onChange={this.formChanged}
            >
              پارکینگ
            </Checkbox>
          </FormGroup>
          <FormGroup controlId="estate-pre">
            <ControlLabel>پول پیش:</ControlLabel>
            <FormControl
              name="pre"
              type="text"
              value={this.state.pre}
              placeholder="پول پیش..."
              onChange={this.formChanged}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="estate-rent">
            <ControlLabel>اجاره ماهیانه:</ControlLabel>
            <FormControl
              name="rent"
              type="text"
              value={this.state.rent}
              placeholder="اجاره ماهیانه..."
              onChange={this.formChanged}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="estate-price">
            <ControlLabel>قیمت فروش:</ControlLabel>
            <FormControl
              name="price"
              type="text"
              value={this.state.price}
              placeholder="قیمت فروش..."
              onChange={this.formChanged}
            />
            <FormControl.Feedback />
          </FormGroup>
          <Button type="submit" block bsStyle="primary">ثبت</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.closeAddEstate}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

export default AddEstate;
