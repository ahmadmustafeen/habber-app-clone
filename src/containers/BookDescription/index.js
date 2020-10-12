import React,{useState} from 'react';
import {View, StyleSheet,Image,ScrollView} from 'react-native';
import { AppText, Button, Screen} from '../../components/common';
import {RoundIcon,Counter,DashboardComponent,ThumbnailClub} from '../../components';
import {booksData} from '_assets/data/dummydata';
import {BOOK_CLUBS} from '../../constants/Screens';
import Header from '../../components/Header';

const BookDescription = (props) => {
  const [data] = useState(booksData);

  return (
    <ScrollView>
    <Header {...props} title={"Book Name"} />
    <Screen>
      <View key="header"></View>
      <View key="content">
        <View style={styles.profiletop}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/stephen.png')}
            />
          </View>

          <View style={{flexDirection: 'column'}}>
            <AppText bold size={15} style={styles.txt}>
              {`A Brief History of time
by brom

Price: 30.000 KD
`}
            </AppText>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <RoundIcon
                name="heart"
                type="font-awesome"
                color="#fff"
                small
                onPress={() => console.log('hello')}
              />
              <RoundIcon
                name="share-alt"
                type="font-awesome"
                color="#fff"
                small
                onPress={() => console.log('hello')}
              />
              <RoundIcon
                name="glide-g"
                type="font-awesome"
                color="#fff"
                small
                onPress={() => console.log('hello')}
              />
            </View>
          </View>
        </View>

        <View>
          <AppText bold size={15} primary>
            ISBN: 978-3-16-141500-0
          </AppText>
          <AppText bold size={15}>
            Pages: 160
          </AppText>
          <AppText bold size={15}>
            Type of Cover: Hard Cover
          </AppText>
          <AppText bold size={15}>
            Genre: Romance|Thriller|Mystery
          </AppText>
        </View>

        <View style={{marginTop: 20}}>
          <AppText bold size={18} style={{marginBottom: 10}}>
            Description:
          </AppText>
          <AppText
            size={14}
            color="#202020">{`We are the best world Information Technology Company. 
Providing the highest quality in hardware & Network solutions. About more than 20 years of experience and 1000 of innovative achievements.
            
We are the best world Information Technology Company. 
Providing the highest quality in hardware & Network solutions. 
            
We are the best world Information Technology Company. 
Providing the highest quality in hardware & Network solutions. `}</AppText>
        </View>

        <View style={styles.counter}>
          <Counter />
        </View>
      </View>
      <View key="footer">
       <Button bold secondary>Add To Cart</Button>
      </View>
    </Screen>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  imgContainer: {
    height: 160,
    aspectRatio: 0.7,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  txt: {
    marginLeft: 10,
    marginTop: 10,
  },
  profiletop: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    marginBottom:20,
    marginTop:10
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export default BookDescription;
