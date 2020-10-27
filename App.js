import React from 'react';
import {Provider} from 'react-redux';
import Navigator from './src/navigator';
import store from './src/redux/store';
import {navigationRef} from './NavigationService';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator ref={navigationRef} />
    </Provider>
  );
};

export default App;
