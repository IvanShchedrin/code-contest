import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import { Login } from './screens/Login';

export const App = () => (
  <Router>
    <Switch>
      <Route path="/login" exact strict>
        <Login />
      </Route>
      <Redirect to="/login" default />
    </Switch>
  </Router>
);
