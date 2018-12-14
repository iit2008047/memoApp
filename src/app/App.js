import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-native-router-flux';

import configureStore from './store/configureStore';

import getScenes from './router/router';

export default class App extends React.Component {
  render() {

    return (
      <Provider store={configureStore()}>
        <Router
          scenes={getScenes()}
        />
      </Provider>
    )
  }
}
