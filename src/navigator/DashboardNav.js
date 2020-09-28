import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../containers/Home';

const Stack = createStackNavigator();
const HeaderLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.goBack()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
      }}>
      <SimpleLineIcons name="arrow-left" size={20} color={Color.appColor} />
      <AppText blue>{` Back`}</AppText>
    </TouchableOpacity>
  );
};

export const DashboardNav = () => {
  return (
    <Stack.Navigator
    // screenOptions={({navigation}) => ({
    //   headerTitleAlign: 'center',
    //   headerStatusBarHeight: 15,
    //   headerTitleStyle: {color: Color.appColor},
    //   headerLeft: (props) => (
    //     <HeaderLeftComponent navigation={navigation} {...props} />
    //   ),
    // })}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
