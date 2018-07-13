import React, {Component} from 'react';
import ListViewItem from './ListViewItem';

class ListView extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(business) {
    this.props.selectBusiness(business)
  }

  render() {

    let displayClass = this.props.listShouldShow ? 'show' : 'hide';

    let list = this.props.businesses.map((business, i) => {
      return (
        <ListViewItem 
          key={i}
          business={business}
          selectBusiness={this.props.selectBusiness}/>
      );
    });

    return (
      <div className={`list-view-wrap ${displayClass}`}>
        {list}  
      </div>    
    );
  }
}

export default ListView;