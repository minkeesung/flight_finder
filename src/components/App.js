import React, { Component } from 'react';
import 'react-widgets/dist/css/react-widgets.css'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

import NewTripForm from './NewTripForm'
import TripDisplay from './TripDisplay'
// import { DateTimePicker } = ReactWidgets;

momentLocalizer(Moment)

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(
  createStore
);


class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <div className="container">
            <Switch>
              <Route exact path="/" component={NewTripForm} />
              <Route exact path="/trips" component={TripDisplay} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
