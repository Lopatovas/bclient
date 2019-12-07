import React from 'react';

import Table from '../../components/table';
import WithLoading from '../../HOC/loader';

const TableWithLoader = WithLoading(Table);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, books: [], loading: false };
    this.getBooks = this.getBooks.bind(this);
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

  render() {
    return (
      <div className="container">
        <div className="card">
          <TableWithLoader tableHeader={['Number', 'Name', 'Amount']} tableItems={this.state.books} isLoading={this.state.loading}/>
        </div>
      </div>
    );
  }
}

export default Home;
