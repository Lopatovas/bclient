import React from 'react';

import Table from '../../components/table';
import Input from '../../components/input';
import WithLoading from '../../HOC/loader';

const TableWithLoader = WithLoading(Table);

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errors: {}, loading: false};
    this.getBooks = this.getBooks.bind(this);
    this.createBook = this.createBook.bind(this);
    this.routeTable = this.routeTable.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('isUser') });
    this.getBooks();
  }

  createBook() {
    this.setState({loading: true});
    const params = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
      body: JSON.stringify({
        name: this.bookName.value,  
        status: 'not_taken',
        amount: 1
      }),
      method:"POST"
    }
    fetch("http://127.0.0.1:8000/api/book/create", params)
      .then((resp) => resp.json())
      .then(parsed => {
        if(parsed.errors){
          this.setState({errors: parsed.errors, loading: false})
        }
        else {
          alert(`${parsed.book.name} was created successfully!`);
          this.setState({loading: false});
          this.getBooks();
        }
      })
      .catch(e => {
        console.log(e);
        this.setState({loading: false});
      });
  }

  getBooks() {
    const params = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
      method:"GET"
    }
    this.setState({ loading: true });
    fetch("http://127.0.0.1:8000/book/show", params)
      .then((resp) => resp.json())
      .then(parsed => this.setState({books: parsed.books, loading: false}))
      .catch(e => console.log(e));
  }

  routeTable(item) {
    const { history } = this.props;
    history.push(`/book/${item.name}`);
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="container">
        <div className="shadow-lg p-3 mb-2 bg-white rounded">
          <h2 className="p-2">Librarians panel</h2>
        </div>
       {!loading ?  <div className="card">
          <h4 className="p-3">
            Books
          </h4>
          <TableWithLoader tableHeader={['Number', 'Name', 'Amount']} tableItems={this.state.books} isLoading={this.state.loading} tableAction={this.routeTable}/>
          <div className="d-flex p-3 bd-highlight justify-content-between">
            <Input labelText="Name" id="nameField" >
              <input type="text" className="form-control" id="nameField" placeholder="Lord of the Rings" ref={(input) => this.bookName = input}/>
            </Input>
          <button onClick={() => {this.createBook()}}type="button" className="btn btn-light m-2">
            New book
          </button>
          </div>
        </div> : <div className="spinner-border text-primary" style={{"marginLeft": "50%"}} role="status">
          <span className="sr-only">Loading...</span>
        </div>}
      </div>
    );
  }
}

export default Panel;
