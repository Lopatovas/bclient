import React from 'react';
import Input from '../../components/input';

class Panel extends React.Component {
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
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
      body: JSON.stringify({
        name: this.nameInput.value,
        description:this.descriptionInput.value,
        time: this.dateInput.value,
        price: this.priceInput.value,
        slots: this.participantsInput.value,
        status: null,
      }),
      method:"POST"
    }
    fetch("http://127.0.0.1:8000/api/course/create", params)
      .then((resp) => resp.json())
      .then(parsed => {
        console.log(parsed);
        if(parsed.errors){
          this.setState({errors: parsed.errors, loading: false})
        }
        else {
          alert('Course registered');
          history.push('/');
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    const {description, time, name, price} = this.state.errors;
    return (
      <div className="container">
      <form>
          <Input labelText="Course name" id="nameField" error={name}>
            <input type="text" className="form-control" id="nameField" placeholder="Get rich fast and easy!" ref={(input) => this.nameInput = input}/>
          </Input>
          <Input labelText="Description" id="descriptionField" error={description}>
            <textarea rows="5" className="form-control" id="descriptionField" placeholder="You will get rich so fast..." ref={(input) => this.descriptionInput = input} />
          </Input>
          <Input labelText="Time" id="timeField" error={time}>
            <input type="date" className="form-control" id="timeField" placeholder="2019-05-22" ref={(input) => this.dateInput = input} />
          </Input>
          <Input labelText="Price" id="priceField" error={price}>
            <input type="number" className="form-control" id="priceField" placeholder="100" ref={(input) => this.priceInput = input} />
          </Input>
          <Input labelText="Number of participants" id="participantsField" error={price}>
            <input type="number" className="form-control" id="participantsField" placeholder="5" ref={(input) => this.participantsInput = input} />
          </Input>
        <button onClick={() => { this.submitForm(); }} type="button" className="btn btn-dark">
          Register course
        </button>
      </form>
    </div>
    );
  }
}

export default Panel;
