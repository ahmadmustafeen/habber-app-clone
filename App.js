import React from 'react';
import Navigator from './src/navigator';
import {navigationRef} from './NavigationService';
import {StatusBar, View} from 'react-native';
import {ModalScreen} from 'components';
import useNetworkModal from 'utils/customHooks/useNetworkModal';
import OfflineNotice from 'components/OfflineNotice';
import {useTheme} from '@react-navigation/native';

const App = () => {
  const {network, toggleModal} = useNetworkModal();
  console.log(useTheme());
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <Navigator ref={navigationRef} />
      <ModalScreen
        visible={network}
        onContinue={toggleModal}
        heading={'modal_heading'}
        description={'modal_description'}
        buttonLabel={'modal_button_label'}
      />
      {/* <OfflineNotice /> */}
    </View>
  );
};

export default App;
