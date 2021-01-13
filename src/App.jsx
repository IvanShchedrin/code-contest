import {BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom';
import {CodeMirror} from './components/CodeMirror';

export const App = () => (
  <Router>
    <Switch>
      <Route path="/home" exact strict>
        Home {'>>'}
        <br />
        <Link to="/editor">Open editor</Link>
      </Route>
      <Route path="/editor" exact strict>
        <Link to="/home">Back</Link>
        <br />
        {'<<'} Editor
        <CodeMirror />
      </Route>
      <Redirect to="/home" default />
    </Switch>
  </Router>
);
