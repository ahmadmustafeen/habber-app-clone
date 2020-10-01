import React from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import { AppText, Button} from '../../components/common';
import { ADD_NEW_ADDRESS } from '../../constants/Screens';
const MyAddressBook = (props) => {
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
        <View style={{paddingHorizontal:30,marginTop:30}}>
        <View style={styles.addressbook}>
            <Text style={{fontSize:17,marginBottom:15,marginLeft:15,color:'black'}}>MY ADDRESS BOOK</Text>
            <View
              style={{
              borderBottomColor: 'rgb(221, 221, 221)',
              borderBottomWidth: 2,
              }}
            />
            <View>
                <Text style={{fontSize:15,marginLeft:15,marginTop:20,color:'#c27e12'}}>Bae's Home</Text>
                <Text style={{fontSize:15,marginLeft:15,marginTop:10,color:'black'}}>D/11 Cross Street, New York, USA, 39001</Text>
                <Text style={{fontSize:15,marginLeft:15,marginTop:20,color:'#c27e12'}}>Work</Text>
                <Text style={{fontSize:15,marginLeft:15,marginTop:10,color:'black'}}>D/11 Cross Street, New York, USA, 39001</Text>
                <Text style={{fontSize:15,marginLeft:15,marginTop:20,color:'#c27e12'}}>Bae's Home</Text>
                <Text style={{fontSize:15,marginLeft:15,marginTop:10,color:'black'}}>D/11 Cross Street, New York, USA, 39001</Text>
                <Text style={{fontSize:15,marginLeft:15,marginTop:20,color:'#c27e12'}}>Other</Text>
                <Text style={{fontSize:15,marginLeft:15,marginTop:10,color:'black'}}>D/11 Cross Street, New York, USA, 39001</Text>
            </View>
        </View>
        <Button color="black" onPress={() => navigate(ADD_NEW_ADDRESS)}>
             <Text style={{fontSize:17}}>ADD NEW ADDRESS</Text>
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
  },
  addressbook:{
    borderRadius:5,
    borderColor:'rgb(221, 221, 221)',
    borderWidth:2.5,
    paddingVertical:20,
    paddingHorizontal:10,
    marginBottom:20
  }
});

export default MyAddressBook;
