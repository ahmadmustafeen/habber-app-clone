import React from 'react';
import Navigator from './src/navigator';
import {navigationRef} from './NavigationService';
import {View} from 'react-native';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Navigator ref={navigationRef} />
    </View>
  );
};

export default App;
