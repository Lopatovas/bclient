import React from 'react';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = { errors: {}, users: [], options: [], checked: null, students: [] };
    this.getUsers = this.getUsers.bind(this);
  }

  submitForm() {
    const {options, checked} = this.state;
    let i = 0;
    options.forEach((item) => {
      this.registerStudent(item, checked, () => { 
        i++;
        if(i === options.length){
          alert('Registration complete');
          this.props.history.push(`/viewRegistrations/${this.props.match.params.id}`);
        }
    })
  });
  }

  registerStudent(user_id, professor_id, callback){
    const params = {
      method:"POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
      body: JSON.stringify({
          user_id: user_id,
          professor_id: professor_id,
          course_id: this.props.match.params.id
        }),
    }
    fetch('http://127.0.0.1:8000/api/course/registerProfessorsToCourse', params)
      .then((resp) => resp.json())
      .then(parsed => {
        console.log(parsed);
        callback();
        })
      .catch(e => console.log(e));
  }

  componentDidMount(){
    this.getUsers();
    this.getStudents();
  }

  onChange(e) {
    const options = this.state.options
    let index
    if (e.target.checked) {
      options.push(+e.target.value)
    } else {
      index = options.indexOf(+e.target.value)
      options.splice(index, 1)
    }
    this.setState({ options: options })
  }

  getUsers() {
    const params = {
      method:"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
    }
    fetch('http://127.0.0.1:8000/api/user/index', params)
      .then((resp) => resp.json())
      .then(parsed => {
          console.log(parsed);
          this.setState({users: parsed.users});
        })
      .catch(e => console.log(e));
  }

  getStudents() {
    const params = {
      method:"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
    }
    fetch(`http://127.0.0.1:8000/course/getUsers/${this.props.match.params.id}`, params)
      .then((resp) => resp.json())
      .then(parsed => {
          this.setState({students: parsed || []});
        })
      .catch(e => console.log(e));
  }

  setProfessor(event) {
    this.setState({checked: event.target.value});
  }

  render() {
    return (
      <div className="container">
        <form>
            <div className="m-3">
              <h5>
                Available students
              </h5>
            {this.state.students.map((item, i) =>
              item.role === "user" ? <div className="form-check" key={i}>
              <input className="form-check-input" type="checkbox" value={item.id} id={item.id} onChange={this.onChange.bind(this)}/>
              <label className="form-check-label" htmlFor="defaultCheck1">
                {item.name}
              </label>
            </div>: null)}
            </div>
            <div className="m-3">
              <h5>
                Available proffesors
              </h5>
            {this.state.users.map((item, i) =>
              item.role === "professor" ? <div className="form-check" key={i} onChange={this.setProfessor.bind(this)} >
              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={item.id} />
              <label className="form-check-label" htmlFor="exampleRadios1">
                {item.name}
              </label>
            </div>: null)}
            </div>
          <button onClick={() => { this.submitForm(); }} type="button" className="btn btn-dark">
            Register course
        </button>
        </form>
      </div>
    );
  }
}

export default Panel;
