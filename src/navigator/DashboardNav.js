import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../containers/Home';
import BooksList from '../containers/BooksList';
import JoinUs from '../containers/JoinUs';
import RequestBooks from '../containers/RequestBooks';
import MyProfile from '../containers/MyProfile';
import MyAddressBook from '../containers/MyAddressBook';
import AddNewAddress from '../containers/AddNewAddress';
import ChangePassword from '../containers/ChangePassword';
import EditProfile from '../containers/EditProfile';

import {
  BOOKLIST_SCREEN,
  BOOK_DETAILS_SCREEN,
  DRAWERMENU,
  JOINUS,
  REQUESTBOOKS,
  MY_PROFILE,
  MY_ADDRESS_BOOK,
  ADD_NEW_ADDRESS,
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  SETTINGS_SCREEN,
} from '../constants/Screens';
import BookDetails from '../containers/BookDetails';
import Settings from '../containers/Settings';

const Stack = createStackNavigator();
// const HeaderLeftComponent = (props) => {
//   return (
//     <TouchableOpacity
//       onPress={() => props.navigation.goBack()}
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingLeft: 10,
//       }}>
//       <SimpleLineIcons name="arrow-left" size={20} color={Color.appColor} />
//       <AppText blue>{` Back`}</AppText>
//     </TouchableOpacity>
//   );
// };

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
      <Stack.Screen name={BOOKLIST_SCREEN} component={BooksList} />
      <Stack.Screen name={BOOK_DETAILS_SCREEN} component={BookDetails} />
      <Stack.Screen name={JOINUS} component={JoinUs} />
      <Stack.Screen name={REQUESTBOOKS} component={RequestBooks} />
      <Stack.Screen name={MY_PROFILE} component={MyProfile} />
      <Stack.Screen name={MY_ADDRESS_BOOK} component={MyAddressBook} />
      <Stack.Screen name={ADD_NEW_ADDRESS} component={AddNewAddress} />
      <Stack.Screen name={CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={SETTINGS_SCREEN} component={Settings} />
    </Stack.Navigator>
  );
};
