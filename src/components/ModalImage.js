import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {AppText, Button, Screen} from './common';
import {Icon} from 'react-native-elements';
import {FastImage} from './FastImage';

const ModalComponent = ({source}, ref) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => ({
    toggle,
  }));
  return (
    <Modal animationType="fade" visible={visible}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Icon
            containerStyle={styles.iconContainerStyle}
            onPress={toggle}
            name="closecircleo"
            type="antdesign"
            color="white"
          />

          <FastImage
            // source={require('../assets/images/background.jpg')}
            source={source}
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
  },
  imageContainer: {
    height: '75%',
    width: '100%',
  },
  iconContainerStyle: {
    position: 'absolute',
    right: 0,
    top: -20,
    marginRight: 10,
    zIndex: 1,
  },
});

const ModalImage = forwardRef(ModalComponent);
export {ModalImage};
