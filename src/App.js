import React, { Component } from 'react';
import {UserTable, DetailUser} from "./screens";
import { Provider } from "react-redux";
import { ConnectedRouter } from 'connected-react-router'
import store, {history} from "./redux/store";
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={UserTable} />
            <Route path="/user/:id" component={DetailUser} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
