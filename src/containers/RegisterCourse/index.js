import React from 'react';

import Table from '../../components/table';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, books: [], loading: false, debt: [] };
    this.getCourse = this.getCourse.bind(this);
    this.registerCourse = this.registerCourse.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.getItem('session') });
    this.getCourse();
  }

  getCourse() {
    const params = {
      method:"GET"
    }
    this.setState({ loading: true });
    fetch(`http://127.0.0.1:8000/course/showCoursesWhereUserNotInvolved/${this.props.match.params.id}`, params)
      .then((resp) => resp.json())
      .then(parsed => this.setState({courses: parsed.courses, loading: false}))
      .catch(e => console.log(e));
  }

  registerCourse(id, slots) {
    const params = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('session')}`
      },
      body: JSON.stringify({
        id: id,
        slots: slots - 1,
      }),
      method:"POST"
    }
    fetch("http://127.0.0.1:8000/api/course/registerToCourse", params)
      .then((resp) => resp.json())
      .then(() => {
        this.getCourse();
      })
      .catch(e => console.log(e));
  }

  render() {
    const {courses} = this.state;
    return (
      <div className="container">
        <div className="card">
          <Table 
            tableHeader={['Number', 'Name', 'Description', 'Price', 'Slots', 'Time']} 
            tableItems={courses} 
            withActions={true} 
            editHandler={(item) => {this.registerCourse(item.id, item.slots)}}
          />
        </div>
      </div>
    );
  }
}

export default Panel;
