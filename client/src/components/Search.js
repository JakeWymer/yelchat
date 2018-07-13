import React, {Component} from 'react';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      zipcode: '',
      term: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchBusinesses(this.state.term, this.state.zipcode);
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return(
      <div className="search-wrap">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="term">Term</label>
          <input
              onChange={this.handleInput}
              name="term"
              id="term"
              placeholder="Burgers, Beer, etc..."/>
          <label htmlFor="zipcode">Location</label>
          <input
            onChange={this.handleInput}
            name="zipcode"
            id="zipcode"
            placeholder="City, Zip, etc..."/>
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default Search;