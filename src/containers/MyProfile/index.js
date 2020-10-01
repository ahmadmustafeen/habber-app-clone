import React from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import { AppText, Button} from '../../components/common';
import { MY_ADDRESS_BOOK } from '../../constants/Screens';
const MyProfile = (props) => {
  const {navigate} = props.navigation;
  return (
    <View>
      <View key="header"></View>
      <View key="content" style={styles.content}>
        <View style={{flexDirection: 'row',justifyContent:'center',marginBottom:40,marginTop:20}}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Screenshot_Logo.jpg')}
        />
        <Text style={{color:'black',marginLeft:10,marginTop:20,fontSize: 17,fontWeight:'bold'}}>Khaled Ammar{"\n"}Khaled.Ammar@gmail.com</Text>
        <AppText style={styles.editbtn}>Edit</AppText>
        </View>
        <View
         style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 0.4,
          }}
        />
        <View style={{paddingHorizontal:30,marginTop:40}}>
        <Button color="black" style={{marginBottom:15}} onPress={() => navigate(MY_ADDRESS_BOOK)}>
             <Text style={{fontSize:17}}>MY ADDRESS BOOK</Text>
        </Button>
        <Button color="black">
             <Text style={{fontSize:17}}>CHANGE PASSWORD</Text>
        </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content:{
    marginTop: 50,
  },
  image: {
    width: '20%',
    height:'120%',
    borderRadius: 400/ 2,
  },
  editbtn:{
    backgroundColor:'#c27e12',
    width:'22%',
    height:'50%',
    position:'absolute',
    right:10,
    top:-10,
    color:'black',
    borderRadius: 400/ 2,
    textAlign: 'center',
    fontSize: 18,
    paddingTop:3
  }
});

export default MyProfile;
