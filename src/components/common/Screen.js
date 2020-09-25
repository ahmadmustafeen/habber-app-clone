import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
class Screen extends Component {
  getComponent(key) {
    const {children} = this.props;
    return children.filter((comp) => comp.key === key);
  }

  render() {
    return (
      <KeyboardAwareScrollView
        //resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{flexGrow: 1}}
        automaticallyAdjustContentInsets={true}
        keyboardDismissMode="on-drag"
        scrollsToTop={false}
        keyboardShouldPersistTaps="never"
        enableResetScrollToCoords={false}>
        <View
          style={[
            styles.formContainer,
            {backgroundColor: this.props.backgroundColor},
          ]}>
          {this.getComponent('header').length ? (
            <View style={styles.header}>{this.getComponent('header')}</View>
          ) : null}
          {this.getComponent('content').length ? (
            <View style={styles.content}>{this.getComponent('content')}</View>
          ) : null}
          {this.getComponent('footer').length ? (
            <View style={styles.footer}>{this.getComponent('footer')}</View>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    margin: wp('5%'),
    marginBottom: hp('0.75%%'),
  },
  header: {
    marginBottom: hp('0.75%'),
  },
  content: {
    flex: 1,
  },
  footer: {
    marginTop: 0,
  },
});

export {Screen};
