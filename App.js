import React from 'react';
import Navigator from './src/navigator';
import { navigationRef } from './NavigationService';
import { StatusBar, View } from 'react-native';
import { ModalScreen } from 'components';
import useNetworkModal from 'utils/customHooks/useNetworkModal';
import OfflineNotice from 'components/OfflineNotice';
import { Color } from 'constants/Colors';


const App = () => {
  const { network, toggleModal } = useNetworkModal();
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Navigator ref={navigationRef} />
      <ModalScreen
        colors={Color}
        visible={network}
        onContinue={toggleModal}
        heading='Network Error'
        description='Kindly check your network and try again'
        buttonLabel='Check your Network'
      />
      {/* <OfflineNotice /> */}
    </View>
  );
};

export default App;
