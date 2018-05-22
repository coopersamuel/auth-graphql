import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';

import App from './components/app';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import requireAuth from './components/requireAuth';
import Dashboard from './components/dashboard';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin' // Tells Apollo to send cookies whenever it makes a request to the backend server
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <Route path='login' component={LoginForm} />
          <Route path='signup' component={SignupForm} />
          <Route path='/dashboard' component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
