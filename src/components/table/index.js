import React from 'react';
import PropTypes from 'prop-types';

function Table(props) {
  const {tableHeader, tableItems, withActions, editHandler, tableAction} = props;
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
    <tr key={i} onClick={() => {tableAction(item);}}>
      <th scope="row">{i+1}</th>
      <td>{item.name}</td>
      <td>{item.amount}</td>
      {withActions ? <td><button onClick={ () => {editHandler(item)}} className="btn btn-light btn-sm"><i className="fa fa-plus"></i></button></td> : null}
    </tr>)}
  </tbody>
</table>
  );
}

Table.propTypes = {
  tableHeader: PropTypes.arrayOf(PropTypes.string),
  tableItems: PropTypes.arrayOf(PropTypes.object),
  withActions: PropTypes.bool,
  editHandler: PropTypes.func,
  tableAction: PropTypes.func,
};

Table.defaultProps = {
  tableHeader: [],
  tableItems: [{name: '', amount: 0}],
  withActions: false,
  editHandler: () => {},
  tableAction: () => {},
};

export default Table;