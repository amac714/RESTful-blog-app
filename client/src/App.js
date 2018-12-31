import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Dashboard from './component/dashboard';
import EditPost from './component/editPost';
import CreatePost from './component/createPost';
import ErrorPage from './component/error';
import './style/App.scss';

export const history = createHistory();

const App = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/editpost" component={EditPost} />
        <Route path="/add" component={CreatePost} />
        <Route component={ErrorPage}/>
      </Switch>
    </div>
  </Router>
);

export default App;
