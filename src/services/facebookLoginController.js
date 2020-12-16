import {Alert} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

export const getInfoFromToken = (token) => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id,name,first_name,last_name,middle_name, email',
    },
  };
  return new Promise(function (resolve, reject) {
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  });
};

export const loginWithFacebook = async () => {
  // Attempt a login using the Facebook login dialog asking for default permissions.
  try {
    console.log('Logging in with facebook');
    const login = await LoginManager.logInWithPermissions([
      'email',
      'public_profile',
    ]);
    if (login.isCancelled) {
      return Alert.alert('Login Cancelled');
    } else {
      return AccessToken.getCurrentAccessToken();
    }
  } catch (error) {
    console.log('Login fail with error: ' + error);
    return error;
  }
};
