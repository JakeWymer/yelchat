import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';

import Header from './Header';
import Search from './Search';
import ListView from './ListView';
import Detail from './Detail';

import '../App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedBusiness: null,
      businesses: [],
      listShouldShow: true
    }

    this.selectBusiness = this.selectBusiness.bind(this);
    this.fetchBusinesses = this.fetchBusinesses.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.clearBusinesses = this.clearBusinesses.bind(this);
  }

  toggleList() {
    this.setState({listShouldShow: !this.state.listShouldShow});
  }

  async fetchBusinesses(term, location) {
    let options = {
      location,
      term
    }
    
    let qs = querystring.stringify(options)
    let url = `/api/search?${qs}`

    let res = await axios.get(url);
    this.setState({businesses: res.data.businesses});
  }

  selectBusiness(business) {
    this.setState({selectedBusiness: business});
    this.toggleList();
  }

  clearBusinesses() {
    this.setState({businesses: [], selectedBusiness: null});
  }

  render() {
    if(this.state.businesses.length > 0) {
      return (
        <div className="App">
          <Header clearBusinesses={this.clearBusinesses}/>
          <div className="content-wrap">
            <ListView 
              businesses={this.state.businesses}
              selectBusiness={this.selectBusiness}
              listShouldShow={this.state.listShouldShow}/>

            <Detail 
              selectedBusiness={this.state.selectedBusiness}
              detailShouldShow={!this.state.listShouldShow}
              toggleList={this.toggleList}/>      
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <Header clearBusinesses={this.clearBusinesses}/>
        <Search fetchBusinesses={this.fetchBusinesses}/>
      </div>
    );
  }
}

export default App;
