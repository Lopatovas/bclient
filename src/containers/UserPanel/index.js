import React from 'react';

import Table from '../../components/table';
import WithLoading from '../../HOC/loader';

const TableWithLoader = WithLoading(Table);

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, books: [], loading: false };
    this.getBooks = this.getBooks.bind(this);
    this.takeBook = this.takeBook.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('isUser') });
    this.getBooks();
  }

  getBooks() {
    const params = {
      method:"GET"
    }
    this.setState({ loading: true });
    fetch("http://127.0.0.1:8000/book/showDistinct", params)
      .then((resp) => resp.json())
      .then(parsed => this.setState({books: parsed.books, loading: false}))
      .catch(e => console.log(e));
  }

  takeBook(name) {
    const params = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
      body: JSON.stringify({
        name: name
      }),
      method:"POST"
    }
    this.setState({ loading: true });
    fetch("http://127.0.0.1:8000/api/book/take", params)
      .then((resp) => resp.json())
      .then(parsed => {
        this.setState({books: parsed.books, loading: false});
        this.getBooks();
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <TableWithLoader 
            tableHeader={['Number', 'Name', 'Amount']} 
            tableItems={this.state.books} 
            isLoading={this.state.loading} 
            withActions={true} 
            editHandler={(item) => {this.takeBook(item.name)}}/>
        </div>
      </div>
    );
  }
}

export default Panel;
