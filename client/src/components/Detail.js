import React, {Component} from 'react';
import Chat from './Chat';

class Detail extends Component {
  render() {
    let displayClass = this.props.detailShouldShow ? 'show' : 'hide';

    if(this.props.selectedBusiness){
      return(
        <div className={`detail-wrap ${displayClass}`}>
          {/* <h5 className="back-btn" onClick={this.props.toggleList}>Back</h5> */}
          <i className="far fa-arrow-alt-circle-left fa-2x back-btn" onClick={this.props.toggleList}></i>
          <div className="business-wrap">
            <img src={this.props.selectedBusiness.image_url} alt={this.props.selectedBusiness.name}/>
            <h2>{this.props.selectedBusiness.name}</h2>
          </div>
          <Chat 
            businessId={this.props.selectedBusiness.id}/>
        </div>
      );
    }
    return(
      <div className={`detail-wrap ${displayClass}`}>
        <h2>Select a business</h2>
      </div>
    );
  }
}

export default Detail;