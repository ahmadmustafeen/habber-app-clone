import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { Modal, View, StyleSheet, Animated } from 'react-native';
import { AppText, Button, Screen } from './common';
import { Icon } from 'react-native-elements';
import { FastImage } from './FastImage';
import {
  PinchGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { Image } from 'react-native';

const ModalComponent = ({ source }, ref) => {
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

          <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            captureEvent={true}
            zoomCenteringLevelDistance={0.5}

          >
            <FastImage
              // source={require('../assets/images/background.jpg')}
              source={source}
              resizeMode="contain"
            />
          </ReactNativeZoomableView>
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
    width: '92%',
    alignSelf: 'center',
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
export { ModalImage };
