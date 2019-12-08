import React from 'react';
import PropTypes from 'prop-types';

function Table(props) {
  const {tableHeader, tableItems, withActions, editHandler, tableAction} = props;
  return (
    <table className={tableAction ? "table table-hover": "table"}>
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
      <td>{item.description?.length > 50 ? `${item.description.slice(0, 48)}...` : item.description}</td>
      <td>{item.price}</td>
      <td>{item.slots}</td>
      <td>{item.time}</td>
      <td>{item.status ? item.status : 'Registration in progress'}</td>
      {withActions ? <td><button onClick={ () => {editHandler(item)}} className="btn btn-light btn-sm"><i className="fa fa-user-plus"></i></button></td> : null}
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