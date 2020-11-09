import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { AppText, Button, Screen } from '_components/common';
import { HorizontalRow, Counter } from '_components';
import { CHECKOUT } from '_constants/Screens';
import { Header } from '_components/Header';
import { useSelector, shallowEqual } from 'react-redux'
import CartReducer from 'redux/reducers/CartReducer';




const AddToCart = (props) => {


  const { CartReducer } = useSelector((state) => {

    return {

      CartReducer: state.CartReducer,
    };
  }, shallowEqual);
  console.log(CartReducer)

  // const BookSection = (props) => {
  //   <View style={styles.profiletop}>
  //   <View style={styles.imgContainer}>
  //     <Image
  //       style={styles.image}
  //       source={require('../../assets/images/background.jpg')}
  //     />
  //   </View>

  //   <View style={styles.viewtxt}>
  //     <AppText bold size={20} style={styles.txt}>
  //         A Brief History of time
  //     </AppText>
  //     <AppText bold size={15} style={styles.txt}>
  //         by brom
  //     </AppText>
  //     <AppText bold size={20} style={styles.pricetxt}>
  //         Price: 30 KW
  //     </AppText>
  //     <View style={{ width: 300, marginVertical: 10 }}>
  //       <Counter />
  //     </View>
  //     <HorizontalRow />
  //     <AppText bold size={17} primary style={styles.txt}>
  //         Remove
  //     </AppText>
  //   </View>
  // </View>
  // <HorizontalRow />
  // }
  return (
    <ScrollView>
      <Header {...props} title={'Cart'} />
      <Screen>
        <View key="header"></View>
        <View key="content">
          {
          }

          <View style={styles.profiletop}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.image}
                source={('http://habber.attribes.com/storage/books/4/book1604572263.png')}
              />
            </View>

            <View style={styles.viewtxt}>
              <AppText bold size={20} style={styles.txt}>
                Lolita
              </AppText>
              <AppText bold size={15} style={styles.txt}>
                by Niel Galman
              </AppText>
              <AppText bold size={20} style={styles.pricetxt}>
                Price: 30 KW
              </AppText>
              <View style={{ width: 300, marginVertical: 10 }}>
                <Counter />
              </View>
              <HorizontalRow />
              <AppText bold size={17} primary style={styles.txt}>
                Remove
              </AppText>
            </View>
          </View>
          <View style={styles.totalcontainer}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <AppText bold>Sub Total</AppText>
              <AppText bold>Shipping Charges</AppText>
              <AppText primary bold>
                Total
              </AppText>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              <AppText bold>$90</AppText>
              <AppText bold>$10</AppText>
              <AppText primary bold>
                $100
              </AppText>
            </View>
          </View>
        </View>
        <View key="footer">
          <Button
            bold
            primary
            style={styles.footerbtn}
            onPress={() => props.navigation.navigate(CHECKOUT)}>
            Checkout
          </Button>
        </View>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 220,
    aspectRatio: 0.7,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  viewtxt: {
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: 10,
    maxWidth: '100%',
  },
  pricetxt: {
    marginTop: 20,
    width: 200,
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 20,
  },
  totalcontainer: {
    flexDirection: 'row',
  },
  footerbtn: {
    marginTop: 40,
  },
});

export default AddToCart;
