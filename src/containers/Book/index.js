import React from 'react';

import Table from '../../components/actionTable';
import WithLoading from '../../HOC/loader';

const TableWithLoader = WithLoading(Table);

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errors: {}, loading: false};
    this.getBooks = this.getBooks.bind(this);
    this.removeBook = this.removeBook.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('isUser') });
    this.getBooks();
  }

  removeBook(id) {
    const params = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
      body: JSON.stringify({
        book_id: id
      }),
      method:"POST"
    }
    this.setState({ loading: true });
    fetch("http://127.0.0.1:8000/api/book/delete", params)
      .then((resp) => resp.json())
      .then(parsed => {
        this.setState({loading: false});
        this.getBooks();
      })
      .catch(e => console.log(e));
  }

  getBooks() {
    const {match} = this.props;
    const params = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: match.params.name
      }),
      method:"POST"
    }
    this.setState({ loading: true });
    fetch("http://127.0.0.1:8000/book/showByName", params)
      .then((resp) => resp.json())
      .then(parsed => {
        this.setState({loading: false});
        this.setState({books: parsed.books})
      })
      .catch(e => console.log(e));
  }

  render() {
    const {loading, books} = this.state;
    return (
      <div className="container">
        <div>
          {books ? <h4>{books[0].name}</h4> : null}
        </div>
        {!loading ? (
        <TableWithLoader 
          tableHeader={['Number', 'Id', 'Status', 'Taken From', 'Taken Till']} 
          tableItems={books} 
          isLoading={loading} 
          withActions={true}
          deleteHandler={(item) => {this.removeBook(item.id)}}
        />) : (
        <div className="spinner-border text-primary" style={{"marginLeft": "50%"}} role="status">
          <span className="sr-only">Loading...</span>
        </div>)}
      </div>
    );
  }
}

export default Book;
