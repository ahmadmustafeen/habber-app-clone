import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {Alert} from 'react-native';

export const googleConfigure = () => {
  GoogleSignin.configure({
    webClientId:
      '402771849171-u43gj5jgh7kavmj2ojavu790e2h1kq1s.apps.googleusercontent.com',
    forceConsentPrompt: true, // if you want to show the authorization prompt at each login
  });
};

export const googleSignInHandler = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('GOOGLE RESULT', userInfo);
    return userInfo;
  } catch (error) {
    console.log('Message', error.message);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User Cancelled the Login Flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Signing In');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('Error:', 'Play Services Not Available or Outdated');
    } else {
      console.log('Some Other Error Happened');
    }
  }
};

export const isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  if (!!isSignedIn) {
    return getCurrentUserInfo();
  } else {
    console.log('Please Login');
  }
};
const getCurrentUserInfo = async () => {
  try {
    const userInfo = await GoogleSignin.signInSilently();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      Alert.alert('User has not signed in yet');
      console.log('User has not signed in yet');
    } else {
      Alert.alert("Something went wrong. Unable to get user's info");
      console.log("Something went wrong. Unable to get user's info");
    }
  }
};
export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};
