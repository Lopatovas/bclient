import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import CreateCourse from './containers/CreateCourse';
import RegisterCourse from './containers/RegisterCourse';
import ViewRegistrations from './containers/ViewRegistrations';
import ViewParticipants from './containers/ViewParticipants';
import GiveRole from './containers/GiveRole';
import AssignStudents from './containers/AssignStudents';


import NavLayout from './layout/NavLayout';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <NavLayout>
            <Route exact path="/" component={Home} />
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/createCourse" component={CreateCourse} />
            <Route path="/registerCourse/:id" component={RegisterCourse} />
            <Route path="/viewRegistrations/:id" component={ViewRegistrations} />
            <Route path="/viewParticipants/:id" component={ViewParticipants} />
            <Route path="/giveProfessorStatus" component={GiveRole} />
            <Route path="/AssignStudents/:id" component={AssignStudents} />
          </NavLayout>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

