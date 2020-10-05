import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  BOOKLIST_SCREEN,
  BOOK_DETAILS_SCREEN,
  JOINUS,
  REQUESTBOOKS,
  MY_PROFILE,
  MY_ADDRESS_BOOK,
  ADD_NEW_ADDRESS,
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  SETTINGS_SCREEN,
} from '../constants/Screens';

import Home from '../containers/Home';
import BooksList from '../containers/BooksList';
import JoinUs from '../containers/JoinUs';
import RequestBooks from '../containers/RequestBooks';
import MyProfile from '../containers/MyProfile';
import MyAddressBook from '../containers/MyAddressBook';
import AddNewAddress from '../containers/AddNewAddress';
import ChangePassword from '../containers/ChangePassword';
import EditProfile from '../containers/EditProfile';
import BookDetails from '../containers/BookDetails';
import Settings from '../containers/Settings';

const Stack = createStackNavigator();

export const DashboardNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
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
