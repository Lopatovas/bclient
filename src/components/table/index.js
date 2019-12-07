import React from 'react';
import PropTypes from 'prop-types';

function Table(props) {
  const {tableHeader, tableItems, withActions, deleteHandler, addHandler} = props;
  return (
    <table className="table table-hover">
  <thead>
    <tr>
      {tableHeader.map((item, i) => <th scope="col" key={i}>{item}</th>)}
      {withActions ?       
          <th scope="col" colSpan="2">Actions</th> : null}
    </tr>
  </thead>
  <tbody>
    {tableItems.map((item, i) => 
    <tr key={i}>
      <th scope="row">{i+1}</th>
      <td>{item.name}</td>
      <td>{item.amount}</td>
      {withActions ?       
        <React.Fragment>
          <td><button className="btn btn-light btn-sm"><i className="fa fa-plus"></i></button></td>
          <td><button onClick={ () => {console.log(item)}}className="btn btn-light btn-sm"><i className="fa fa-trash"></i></button></td>
        </React.Fragment> : null}
    </tr>)}
  </tbody>
</table>
  );
}

Table.propTypes = {
  tableHeader: PropTypes.arrayOf(PropTypes.string),
  tableItems: PropTypes.arrayOf(PropTypes.object),
  withActions: PropTypes.bool
};

Table.defaultProps = {
  tableHeader: [],
  tableItems: [{name: '', amount: 0}],
  withActions: false
};

export default Table;