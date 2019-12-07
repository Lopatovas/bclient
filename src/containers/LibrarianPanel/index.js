import React from 'react';

import Table from '../../components/table';
import WithLoading from '../../HOC/loader';

const TableWithLoader = WithLoading(Table);

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {errors: {}, loading: false};
    this.getBooks = this.getBooks.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('isUser') });
    this.getBooks();
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
    fetch("http://127.0.0.1:8000/api/book/index", params)
      .then((resp) => resp.json())
      .then(parsed => this.setState({books: parsed.books, loading: false}))
      .catch(e => console.log(e));
  }

  submitForm() {
    this.setState({ loading: true });
    const paramsRegister = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.nameInput.value,
        email: this.emailInput.value,
        password: this.passwordInput.value,
        password_confirmation: this.passwordInput.value,
      }),
      method:"POST"
    }

    fetch("http://127.0.0.1:8000/register", paramsRegister)
      .then((resp) => resp.json())
      .then(parsed => {
        if(parsed.errors){
          this.setState({errors: parsed.errors, loading: false})
        }
        else {
          const grantStatus = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('session')}`
            },
            body: JSON.stringify({
              user_id: parsed.user.id
            }),
            method:"POST"
          }
          fetch("http://127.0.0.1:8000/api/giveLibrarianRole", grantStatus)
            .then((resp) => resp.json())
            .then(parsed => { 
              this.setState({loading: false});
              alert(`Success! User was registered and ${parsed.message}`);
            })
        }
      })
      .catch(e =>{ 
        console.log(e); 
        this.setState({errors: {password: 'An unhandled error has occured, please try again.'}, loading: false}); 
      });
  }

  render() {
    const {email, password, name} = this.state.errors;
    const { loading } = this.state;
    return (
      <div className="container">
        <div className="shadow-lg p-3 mb-2 bg-white rounded">
          <h2 className="p-2">Librarians panel</h2>
        </div>
        <div className="card">
          <h4 className="p-3">
            Books
          </h4>
          <TableWithLoader tableHeader={['Number', 'Name', 'Amount']} tableItems={this.state.books} isLoading={this.state.loading} withActions={true}/>
          <button type="button" className="btn btn-light m-2">
            New book
          </button>
        </div>
      </div>
    );
  }
}

export default Panel;
