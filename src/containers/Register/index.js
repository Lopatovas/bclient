import React from 'react';
import PropTypes from 'prop-types';

import FormWrapper from '../../components/formWrapper';
import Input from '../../components/input';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {errors: {}, loading: false};
  }

  submitForm() {
    const { history } = this.props;
    this.setState({ loading: true });
    const params = {
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
    fetch("http://127.0.0.1:8000/register", params)
      .then((resp) => resp.json())
      .then(parsed => {
        if(parsed.errors){
          this.setState({errors: parsed.errors, loading: false})
        }
        else {
          localStorage.setItem('role', parsed.user.role);
          localStorage.setItem('id', parsed.user.id);
          localStorage.setItem('session', parsed.access_token);
          history.push('/');
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    const {email, password, name} = this.state.errors;
    const {loading} = this.state;
    return (
      <div className="container">
        {!loading ? (
        <FormWrapper callBack={this.submitForm} submitText="Register">
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

Register.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Register;
