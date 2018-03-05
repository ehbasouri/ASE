import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppHeader from './AppHeader.jsx';
import EstateList from './EstateList.jsx';
import AddEstate from './AddEstate.jsx';
import axios from 'axios';

class Dashboard extends Component {
  state = {
    user: null,
    estates: [],
    isAddEstateOpen: false,
    query: ''
  };

  componentWillMount() {
    this.getEmailFromToken();
  }

  componentDidMount() {
    this.getEstates();
  }

  openAddEstate = () => {
    this.setState({
      isAddEstateOpen: true
    });
  }

  closeAddEstate = (isSubmited, estate, fileName) => {
    this.setState({
      isAddEstateOpen: false
    });
    if (isSubmited) {
      // this.getEstates();
      estate.image_url = fileName;
      this.setState({
        estates: [...this.state.estates, estate]
      });
    }
  }

  onSearchInputChanged = (e) => {
    this.setState({
      query: e.target.value
    });
  }

  search = () => {
    const query = this.state.query;
    this.getEstates(query);
  }

  getEstates(query = '') {
    const _this = this;
    axios(`/api/estates?q=${query}`, {
      headers: {
        Authorization: _this.token
      }
    })
      .then(res => {
        _this.setState({
          estates: res.data.estates
        });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  onDelete = (id) => {
    const _this = this;
    axios(`/api/estates/${id}`, {
      headers: {
        Authorization: _this.token
      },
      method: 'DELETE'
    }).then(res => {
      const filteredEstates = this.state.estates.filter(estate => estate._id !== id);
      this.setState({
        estates: filteredEstates
      });
    }).catch(console.warn);
  }

  getEmailFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const rawToken = token.split(' ')[1];
        const b64Payload = rawToken.split('.')[1];
        const strPayload = atob(b64Payload);
        const payload = JSON.parse(strPayload);
        const email = payload.email;
        const id = payload.id;

        this.setState({
          user: email,
          id: id
        });
        this.token = token;
      } catch (e) {
        console.warn('Token Invalid ', e);
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      user: null
    });
  };

  render() {
    if (!this.state.user) {
      return <Redirect to="/login" />;
    }

    console.log(this.state.estates);
    return (
      <div>
        <AppHeader
          onSearch={this.search}
          user={this.state.user}
          headerStyle="inverse"
          logout={this.logout}
          query={this.state.query}
          onChange={this.onSearchInputChanged}
        />
        <EstateList
          openAddEstate={this.openAddEstate}
          estates={this.state.estates}
          onDelete={this.onDelete} />
        {this.state.isAddEstateOpen && <AddEstate show={this.state.isAddEstateOpen} seller={this.state.id} closeAddEstate={this.closeAddEstate} />}
      </div>
    );
  }
}

export default Dashboard;
