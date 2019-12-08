import React from 'react';
import Table from '../../components/table';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
    this.getCourse = this.getCourse.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('role') });
    this.getCourse();
  }

  getParticipants(id, name){
    const params = {
      method:"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
    }
    fetch(`http://127.0.0.1:8000/api/course/showCourseUsers/${id}`, params)
      .then((resp) => resp.json())
      .then(parsed => {console.log(parsed); this.setState({[`${name}`]: parsed.users})})
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
    fetch(`http://127.0.0.1:8000/course/getCoursesForProfessor/${this.props.match.params.id}`, params)
      .then((resp) => resp.json())
      .then(parsed => {
        console.log(parsed); 
        this.setState({courses: parsed.courses})
        parsed.courses.forEach((item) => {
          this.getParticipants(item.id, item.name);
        })
      })
      .catch(e => console.log(e));
  }


  render() {
    console.log(this.state);
    return (
      <div className="container">
        {this.state.courses?.map((item, i) => (<table className={"table table-hover"}>
          <thead>
          <tr>
            <th>{item.name}</th>
            <th>{item.time}</th>
          </tr>
          <tr>
            <th>Participants</th>
          </tr>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">ID</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {this.state[`${item.name}`]?.map((participant, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <th scope="row">{participant.name}</th>
              <th scope="row">{participant.email}</th>
              <th scope="row">{participant.id}</th>
              <th scope="row">{participant.role}</th>
            </tr>))}
          </tbody>
        </table>))}
      </div>
    );
  }
}

export default Home;
