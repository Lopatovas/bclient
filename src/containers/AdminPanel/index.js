import React from 'react';

import FormWrapper from '../../components/formWrapper';
import Input from '../../components/input';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {errors: {}, loading: false};
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
    const {loading} = this.state;
    return (
      <div className="container">
        <div className="shadow-lg p-3 mb-2 bg-white rounded">
          <h2 className="p-2">Administrators panel</h2>
        </div>
        {!loading ? (
        <FormWrapper callBack={this.submitForm} submitText="Register librarian">
          <React.Fragment>
            <Input labelText="Name" id="nameField" error={name}>
              <input type="text" className="form-control" id="nameField" placeholder="Bob" ref={(input) => this.nameInput = input}/>
            </Input>
            <Input labelText="Email" id="emailField" error={email}>
              <input type="email" className="form-control" id="emailField" placeholder="name@example.com" ref={(input) => this.emailInput = input} />
            </Input>
            <Input labelText="Password" id="passwordField" error={password}>
              <input type="password" className="form-control" id="passwordField" placeholder="" ref={(input) => this.passwordInput = input} />
          </Input>
        </React.Fragment>
        </FormWrapper>) : (
        <div className="spinner-border text-primary" style={{"marginLeft": "50%"}} role="status">
          <span className="sr-only">Loading...</span>
        </div>)}
      </div>
    );
  }
}

export default Panel;
