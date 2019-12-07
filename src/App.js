import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import AdminPanel from './containers/AdminPanel';
import UserPanel from './containers/UserPanel';
import LibrarianPanel from './containers/LibrarianPanel';
import Book from './containers/Book';

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
            <Route path="/admin/:id" component={AdminPanel} />
            <Route path="/user/:id" component={UserPanel} />
            <Route path="/librarian/:id" component={LibrarianPanel} />
            <Route path="/book/:name" component={Book} />
          </NavLayout>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

