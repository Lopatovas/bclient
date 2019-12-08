import React from 'react';

import Table from '../../components/table';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, courses: [], loading: false };
    this.getCourse = this.getCourse.bind(this);
    this.getAllCourses = this.getAllCourses.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('role') });
    if(localStorage.getItem('role') === "admin"){
      this.getAllCourses();
    }
    else {
      this.getCourse();
    }
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
    fetch("http://127.0.0.1:8000/course/showAllOpen", params)
      .then((resp) => resp.json())
      .then(parsed => this.setState({courses: parsed.courses, loading: false}))
      .catch(e => console.log(e));
  }

  getAllCourses() {
    const params = {
      method:"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
    }
    this.setState({ loading: true });
    fetch("http://127.0.0.1:8000/api/course/index", params)
      .then((resp) => resp.json())
      .then(parsed => this.setState({courses: parsed.courses, loading: false}))
      .catch(e => console.log(e));
  }

  render() {
    const { history } = this.props;
    return (
      <div className="container">
          <Table 
            tableHeader={['Number', 'Name', 'Description', 'Price', 'Slots', 'Time', 'Status']} 
            tableItems={this.state.courses}
            tableAction={this.state.loggedIn ? 
              (item) => {
                if(this.state.loggedIn === 'admin'){
                  history.push(`/viewRegistrations/${item.id}`);
                }
              }
              : null}
          />
      </div>
    );
  }
}

export default Home;
