import React from 'react';
import PropTypes from 'prop-types';

function Table(props) {
    const { tableHeader, tableItems, withActions, deleteHandler, editHandler, approveHandler } = props;
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
                        <th scope="row">{i + 1}</th>
                        <td>{item.id}</td>
                        <td>{item.status}</td>
                        <td>{item.taken_from || '-'}</td>
                        <td>{item.taken_to || '-'}</td>
                        <td>{item.user_id || '-'}</td>
                        {withActions && item.status !== 'taken' ?
                            <td><button onClick={() => { deleteHandler(item) }} className="btn btn-light btn-sm"><i className="fa fa-trash"></i></button></td>
                            : null}
                        {withActions && item.status === 'taken' && !item.taken_from ? 
                            <React.Fragment>
                                <input type="date" className="form-control" id="timeField" placeholder="2019-12-24" />
                                <td><button onClick={() => { approveHandler(item, document.getElementById("timeField").value) }} className="btn btn-light btn-sm"><i className="fa fa-check"></i></button></td> 
                            </React.Fragment> 
                        : null}
                        {withActions && item.status === 'taken' && item.taken_from ? <td><button onClick={() => { editHandler(item) }} className="btn btn-light btn-sm"><i className="fa fa-plus"></i></button></td> : null}
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
    deleteHandler: PropTypes.func,
    tableAction: PropTypes.func,
    approveHandler: PropTypes.func,
};

Table.defaultProps = {
    tableHeader: [],
    tableItems: [{ name: '', amount: 0 }],
    withActions: false,
    editHandler: () => { },
    deleteHandler: () => { },
    tableAction: () => { },
    approveHandler: () => { }
};

export default Table;