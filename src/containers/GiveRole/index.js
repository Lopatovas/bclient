import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, users: [] };
    this.getUsers = this.getUsers.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('role') });
    this.getUsers();
  }

  giveProffesorStatus(id){
    const params = {
        method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('session')}`
        },
        body: JSON.stringify({
            user_id: id,
          }),
      }
      console.log({
        user_id: id,
      });
      fetch('http://127.0.0.1:8000/api/user/giveProfessorRole', params)
        .then((resp) => resp.json())
        .then(parsed => {
            this.getUsers();
            alert('Status given successfully');
          })
        .catch(e => console.log(e));
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

  render() {
    return (
      <div className="container">
        <table className={"table table-hover"}>
          <thead>
            <tr>
              <th scope="col">Number</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">ID</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((item, i) =>
              item.role === "user" ? <tr key={i} onClick={() => {this.giveProffesorStatus(item.id)}}>
              <th scope="row">{i + 1}</th>
              <th scope="row">{item.name}</th>
              <th scope="row">{item.email}</th>
              <th scope="row">{item.id}</th>
              <th scope="row">{item.role}</th>
            </tr>: null)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;