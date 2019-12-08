import React from 'react';

import Table from '../../components/table';
import WithLoading from '../../HOC/loader';

const TableWithLoader = WithLoading(Table);

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, books: [], loading: false, debt: [] };
    this.getBooks = this.getBooks.bind(this);
    this.takeBook = this.takeBook.bind(this);
    this.checkDebt = this.checkDebt.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('isUser') });
    this.checkDebt();
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

  checkDebt(){
    const params = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method:"GET"
    }
    this.setState({ loading: true });
    fetch(`http://127.0.0.1:8000/book/showUserDebts/${localStorage.getItem('id')}`, params)
      .then((resp) => resp.json())
      .then(parsed => {
        this.setState({debt: parsed.books, loading: false});
        if(parsed.books.length > 0){
          alert('You have a debt');
          this.setState({books: parsed.books, loading: false});
        }
        else {
          this.getBooks();
        }
      })
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
    const {debt, loading, books} = this.state;
    return (
      <div className="container">
        <div className="card">
          <TableWithLoader 
            tableHeader={debt.length > 0 ? ['Number', 'Name', 'Taken Till'] : ['Number', 'Name', 'Amount']} 
            tableItems={debt.length > 0 ? debt : books} 
            isLoading={loading} 
            withActions={debt.length > 0 ? false : true} 
            editHandler={(item) => {this.takeBook(item.name)}}/>
        </div>
      </div>
    );
  }
}

export default Panel;
