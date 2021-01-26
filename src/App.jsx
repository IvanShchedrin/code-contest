import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import socketIO from 'socket.io-client';
import { Login } from './screens/Login';
import { store } from './store';

export const App = () => {
  useEffect(() => {
    const socket = socketIO('http://localhost:3000');
    console.log(socket);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" exact strict>
            <Login />
          </Route>
          <Redirect to="/login" default />
        </Switch>
      </Router>
    </Provider>
  );
};
