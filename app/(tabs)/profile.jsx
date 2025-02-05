import { StyleSheet, Text, View,StatusBar,Image,Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import profileImage from "../../assets/images/master.webp"
import bg from "../../assets/images/bg.jpeg"
import {Colors} from "../../constants/Colors.ts"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const profile = () => {
//The approach here is to store the previously opened date and streak count in local storage. We try 
// retrieving it first and parse it. If the values don't exist it means its the user's first time loggin in. So we set the values and exit the function
// If the values do exits, it means it's not the user's first time, and hence we have to check if streak is maintained

  const[streaks,setStreaks] = useState(0)
  const today = new Date().toISOString().split('T')[0];

const getDate = async () => {
  const lastOpened = await AsyncStorage.getItem('lastOpened'); // Get last opened date from storage
  const streakCount = await AsyncStorage.getItem('streaks'); // Get streak count from storage

  // Parse retrieved values to be modified
  const formattedLastOpened = lastOpened ? JSON.parse(lastOpened) : null;
  const formattedStreaks = streakCount ? parseInt(streakCount) : 0;

  
  setStreaks(formattedStreaks);
  // setStreaks(100) ->uncomment this line, and comment out the above line to check for streak resetting

  // this means this is user's first time logging in, so the streak should be 1
  // set the last opened date and streak count, then exit
  if (!formattedLastOpened) {
      setStreaks(1);
      await AsyncStorage.setItem('streaks', "1");
      await AsyncStorage.setItem('lastOpened', JSON.stringify(today));
    return;
  }

  // last opened date exists in storage, meaning its not user's first time
  const todayDate = new Date(today);
  const lastOpenedDate = new Date(formattedLastOpened);
  // const lastOpenedDate = new Date('2025-02-01') -> uncomment this line, and comment out the above line to check for streak resetting

    // difference between today's and last opened date, considering the time also
    const difference = (todayDate - lastOpenedDate) / (1000 * 60 * 60 * 24)

      if (difference===1) {

        setStreaks((prev) => {
          const currentStreak = prev + 1;
          AsyncStorage.setItem("streaks", JSON.stringify(currentStreak));
          return currentStreak;
        });
      
      } 
      
      else if (difference > 1) {
        setStreaks(1);
        await AsyncStorage.setItem("streaks", "1");
      }

  // Update last opened date
  await AsyncStorage.setItem('lastOpened', JSON.stringify(today));
};

useEffect(() => {
  getDate();
}, []);


  return (
        <View
      style={styles.container}
        >      
      <Image
      source={bg}
      style={styles.profileCard} />
    
      <View style={styles.name}>

      <Image source={profileImage} style={{ width: 60, height: 60,borderRadius:50 ,resizeMode:"cover"}}   />

      <Text
      style={{color:Colors.light.text, fontSize:20, fontWeight:'bold'}}>
        @johndoe32
      </Text>

    
        <Text
        style={{color:Colors.light.text, fontSize:15, fontWeight:'thin'}}>
          John Doe
        </Text>

      <View style={{
        flexDirection:'row',
        alignItems:'center'
      }}
      >
        <Ionicons name="rocket" size={24} color="#7C3AED" 
        style={styles.streak}
        />
        <Text style={{
          fontSize:15
        }}
        onPress={()=>Alert.alert("You have a continous streak of 34 days")}

        >
          {streaks}
        </Text>
        
      </View>
     
      <View
      style={{
        flexDirection:'row',
        justifyContent: 'space-evenly',
        width:'100%',
        margin:'5%',
        padding:"4%",
        borderRadius:'30 ',
      }}
>     
        <Text style={{color:Colors.light.text, fontSize:17, fontWeight:'bold'}}>
              Snacks 
              {'\n'}
             <Text style={{fontWeight:'thin', marginLeft:10}}>110</Text>
        </Text>

  
        <Text  style={{color:Colors.light.text, fontSize:17, fontWeight:'bold'}}>
          Following
          {'\n'}
             <Text style={{fontWeight:'thin', marginLeft:10}}>40</Text>
        </Text>
        <Text  style={{color:Colors.light.text, fontSize:17, fontWeight:'bold'}}>
          Followers
          {'\n'}
             <Text style={{fontWeight:'thin', marginLeft:10}}>50</Text>
             </Text>

             <Text  style={{color:Colors.light.text, fontSize:17, fontWeight:'bold'}}>
          Coins
          {'\n'}
             <Text style={{fontWeight:'thin', marginLeft:10}}>190</Text>
        </Text>
      </View>
     
      
      </View>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:8,
    backgroundColor:Colors.light.background
  },

  imageStyle:{
   
  },

  profileCard:{
    marginHorizontal:-2,
    borderRadius:10,
    width:350,
    marginTop:40,
    resizeMode:'cover'
  } ,

  name:{
    flexDirection:'column',
    marginTop:20,
    fontSize:10,
    alignItems:'center'
  },

  streak:{
    // marginLeft:'auto',
    
  }
})