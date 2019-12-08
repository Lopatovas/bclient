import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, users: [], course: {} };
    this.getParticipants = this.getParticipants.bind(this);
    this.closeRegistration = this.closeRegistration.bind(this);
    this.getCourse = this.getCourse.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('role') });
    this.getCourse();
    this.getParticipants();
  }

  getParticipants() {
    const params = {
      method: "GET",
      headers: { 'Authorization': `Bearer ${localStorage.getItem('session')}` }
    }
    fetch(`http://127.0.0.1:8000/api/course/showCourseUsers/${this.props.match.params.id}`, params)
      .then((resp) => resp.json())
      .then(parsed => this.setState({ users: parsed.users }))
      .catch(e => console.log(e));
  }

  getCourse() {
    const params = {
      method:"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
    }
    this.setState({ loading: true });
    fetch(`http://127.0.0.1:8000/course/show/${this.props.match.params.id}`, params)
      .then((resp) => resp.json())
      .then(parsed => {this.setState({course: parsed.course[0]})})
      .catch(e => console.log(e));
  }

  closeRegistration() {
    const params = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
      body: JSON.stringify({
        id: this.props.match.params.id,
        status: 'closed',
      }),
    }
    
    fetch('http://127.0.0.1:8000/api/course/update', params)
      .then((resp) => resp.json())
      .then(parsed => { 
        alert('Registration has been closed');
        this.getCourse();
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="container">
        <div className="mb-5">
          <h3>
            {this.state.course.name}
          </h3>
        </div>
        <table className={"table"}>
          <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((item, i) =>
              <tr key={i} >
                <th scope="row">{i + 1}</th>
                <th scope="row">{item.name}</th>
                <th scope="row">{item.email}</th>
                <th scope="row">{item.id}</th>
              </tr>)}
          </tbody>
        </table>
        {this.state.course.status !== 'closed' ? <div>
          <button onClick={() => { this.closeRegistration(); }} type="button" className="btn btn-dark">
            Close Registration
        </button>
        </div> : null}
        {this.state.course.status === 'closed' ? <div>
          <button onClick={() => { this.props.history.push(`/AssignStudents/${this.state.course.id}`) }} type="button" className="btn btn-dark">
            Asign students to Professors
        </button>
        </div> : null}
      </div>
    );
  }
}

export default Home;
