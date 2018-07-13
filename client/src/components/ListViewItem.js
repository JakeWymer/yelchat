import React from 'react';

function ListViewItem(props) {
  return (
    <div className="list-view-item" 
      onClick={() => props.selectBusiness(props.business)}>
      <img src={props.business.image_url} alt={props.business.name}/>
      <h3>{props.business.name}</h3>
    </div>
  );
}

export default ListViewItem;