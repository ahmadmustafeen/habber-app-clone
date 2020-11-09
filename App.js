import React from 'react';
import Navigator from './src/navigator';
import {navigationRef} from './NavigationService';
import {StatusBar, View} from 'react-native';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <Navigator ref={navigationRef} />
    </View>
  );
};

export default App;
