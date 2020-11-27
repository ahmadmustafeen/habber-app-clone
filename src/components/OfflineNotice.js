import React, {PureComponent} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

const OfflineNotice = () => {
  const networkStatus = useSelector(
    (state) => state.ModalReducer.networkStatus,
  );
  console.log('NETWORK STATUS', networkStatus);
  if (!networkStatus) {
    return <MiniOfflineSign />;
  }
  return null;
};

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
  },
  offlineText: {color: '#fff'},
});
export default OfflineNotice;
