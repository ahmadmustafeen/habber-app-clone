import React from 'react';
import Navigator from './src/navigator';
import { navigationRef } from './NavigationService';
import { StatusBar, View } from 'react-native';
import { ModalScreen } from 'components';
import useNetworkModal from 'utils/customHooks/useNetworkModal';
import OfflineNotice from 'components/OfflineNotice';
import { useTheme } from '@react-navigation/native';
const colors = {
  appColor: '#014488',
  primary: '#c27e12',
  secondary: '#010A2A',
  white: 'white',
  border: '#939393',
  background: 'white',
  textBlack: '#3B3B3B',
  placeholder: '#939393',
  borderColor: 'rgb(200,200,200)',
  imageLoadingColor: '#2196F3',
}
const App = () => {
  const { network, toggleModal } = useNetworkModal();
  console.log(useTheme());
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Navigator ref={navigationRef} />
      <ModalScreen
        colors={colors}
        visible={network}
        onContinue={toggleModal}
        heading={'modal_heading'}
        description={'modal_description'}
        buttonLabel={'Retry'}
      />
      {/* <OfflineNotice /> */}
    </View>
  );
};

export default App;
