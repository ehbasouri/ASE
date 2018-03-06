import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Modal, Button, Col, Form, FormControl, FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';

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
        <Modal.Title><b>ثبت ملک</b></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={this.onSubmit} horizontal>
          <FormGroup controlId="estate-type">
            <Col componentClass={ControlLabel} sm={2}>نوع ملک</Col>
            <Col sm={9}>
              <FormControl componentClass="select" placeholder="نوع ملک" onChange={this.formChanged} name="estate_type">
                <option value="apartment">آپارتمان</option>
                <option value="land">زمین</option>
                <option value="villa">ویلا</option>
                <option value="comercial">مغازه</option>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup controlId="estate-title">
            <Col componentClass={ControlLabel} sm={2}>نام ملک</Col>
            <Col sm={9}>
              <FormControl
                name="title"
                type="text"
                value={this.state.title}
                placeholder="نام ملک..."
                onChange={this.formChanged}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup controlId="estate-address">
            <Col componentClass={ControlLabel} sm={2}>آدرس</Col>
            <Col sm={9}>
              <FormControl
                name="address"
                type="text"
                value={this.state.address}
                placeholder="آدرس..."
                onChange={this.formChanged}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup controlId="estate-area">
            <Col componentClass={ControlLabel} sm={2}>متراژ</Col>
            <Col sm={9}>
              <FormControl
                name="area"
                type="number"
                value={this.state.area}
                placeholder="متراژ..."
                onChange={this.formChanged}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          {
            this.state.estate_type !== 'land' &&
            <Fragment>
              <FormGroup controlId="estate-floors">
                <Col componentClass={ControlLabel} sm={2}>تعداد طبقات</Col>
                <Col sm={9}>
                  <FormControl
                    name="floors"
                    type="number"
                    value={this.state.floors}
                    placeholder="تعداد طبقات..."
                    onChange={this.formChanged}
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>
              <FormGroup controlId="estate-floor">
                <Col componentClass={ControlLabel} sm={2}>طبقه</Col>
                <Col sm={9}>
                  <FormControl
                    name="floor"
                    type="number"
                    value={this.state.floor}
                    placeholder="تعداد طبقات..."
                    onChange={this.formChanged}
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>
              <FormGroup controlId="estate-year">
                <Col componentClass={ControlLabel} sm={2}>سال ساخت:</Col>
                <Col sm={9}>
                  <FormControl
                    name="build_year"
                    type="number"
                    value={this.state.build_year}
                    placeholder="سال ساخت..."
                    onChange={this.formChanged}
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>
              <FormGroup controlId="estate-rooms">
                <Col componentClass={ControlLabel} sm={2}>تعداد اتاق:</Col>
                <Col sm={9}>
                  <FormControl
                    name="rooms"
                    type="number"
                    value={this.state.rooms}
                    placeholder="تعداد اتاق..."
                    onChange={this.formChanged}
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>
              <FormGroup controlId="estate-parking">
                <Col componentClass={ControlLabel} sm={2}>پارکینگ:</Col>
                <Col sm={9}>
                  <Checkbox name="parking"
                    checked={this.state.parking}
                    onChange={this.formChanged}
                  >
                    پارکینگ
                </Checkbox>
                </Col>
              </FormGroup>
              <FormGroup controlId="estate-pre">
                <Col componentClass={ControlLabel} sm={2}>پول پیش:</Col>
                <Col sm={9}>
                  <FormControl
                    name="pre"
                    type="text"
                    value={this.state.pre}
                    placeholder="پول پیش..."
                    onChange={this.formChanged}
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>
              <FormGroup controlId="estate-rent">
                <Col componentClass={ControlLabel} sm={2}>اجاره ماهیانه:</Col>
                <Col sm={9}>
                  <FormControl
                    name="rent"
                    type="text"
                    value={this.state.rent}
                    placeholder="اجاره ماهیانه..."
                    onChange={this.formChanged}
                  />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>
            </Fragment>
          }
          <FormGroup controlId="estate-price">
            <Col componentClass={ControlLabel} sm={2}>قیمت فروش:</Col>
            <Col sm={9}>
              <FormControl
                name="price"
                type="text"
                value={this.state.price}
                placeholder="قیمت فروش..."
                onChange={this.formChanged}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup controlId="estate-image">
            <Col componentClass={ControlLabel} sm={2}>تصویر ملک:</Col>
            <Col sm={9}>
              <div className="input-file-container">
                <input className="input-file" type="file" name="estateImage" onChange={this.onImageChanged} />
                <label tabIndex="0" htmlFor="my-file" className="input-file-trigger">انتخاب کنید</label>
              </div>
              <p className="file-return">{this.state.image.name}</p>
            </Col>
          </FormGroup>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" bsStyle="primary" onClick={this.onSubmit}>ثبت</Button>
        <Button onClick={this.props.closeAddEstate}>لغو</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

export default AddEstate;
