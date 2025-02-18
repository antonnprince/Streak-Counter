import { StyleSheet, Text, View,Button,Image,Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import profileImage from "../../assets/images/master.webp"
import bg from "../../assets/images/bg.jpeg"
import {Colors} from "../../constants/Colors.ts"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import InfoCard from '../../components/InfoCard.jsx';
import Streak from '@/components/Streak.jsx';
import LeaderBoard from '../../components/LeaderBoard.jsx';
import Logout from '@/components/Logout.jsx';
const profile = () => {

// The approach here is to store the previously opened date and streak count in local storage. We try 
// retrieving it first and parse it. If the values don't exist it means its the user's first time loggin in. So we set the values and exit the function
// If the values do exits, it means it's not the user's first time, and hence we have to check if streak is maintained
  
  const [weeks, setWeeks] =useState(0)
  const[streaks,setStreaks] = useState(0)
  const today = new Date().toISOString().split('T')[0];

  const calculateStreaks = async () => {
  const lastOpened = await AsyncStorage.getItem('lastOpened'); 
  const streakCount = await AsyncStorage.getItem('streaks'); 
  
  // Parse retrieved values to be modified
  const formattedLastOpened = lastOpened ? JSON.parse(lastOpened) : null;
  const formattedStreaks = streakCount ? parseInt(streakCount) : 0;

  
  setStreaks(formattedStreaks);
  // setStreaks(21)  ->uncomment this line, comment out the above line and change streak values

  
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

const showToast = () => {
  Toast.show({
    type: 'info',  // 'success', 'error', 'info'
    text1: 'Welcome John Doe',
    text2:` You're on a ${streaks}-day streak!`,
  });
};

const showMileStoneMessage=()=>{
  if(weeks>0)
  {
    Toast.show({
      type: 'success',  // 'success', 'error', 'info'
      text1: 'Congrats John Doe',
      text2:` You've reached a new milestone streak of ${weeks} week`,
    });
  } 
 
}

useEffect(() => {
  calculateStreaks();
}, []);

useEffect(()=>{
  showToast()
 
},[streaks])

useEffect(() => {
  if (streaks % 7 === 0 && streaks !== 0) {
    setWeeks(streaks / 7);
  }
}, [streaks]);


useEffect(()=>{
  showMileStoneMessage()
},[weeks])



useEffect(() => {
  if (weeks != 0) 
  {
    showMileStoneMessage();
  }
}, [weeks])


  return (
        <View
      style={styles.container}>      
    
      <Image
      source={bg}
      style={styles.profileCard} />
    
    
      <View style={styles.name}>
          <Image source={profileImage} style={styles.imageStyle}   />
          <Text
          style={styles.username}>
            @johndoe32
          </Text>
          <Text
          style={styles.playerName}>
            John Doe
          </Text>
          <View style={{
            flexDirection:'row',
            alignItems:'center'
          }}
          > 
            {
              streaks &&
              <Streak streaks={streaks}/>
            }
              
      </View>
     
     <InfoCard/> 
     
     <LeaderBoard />
      
      <Logout/>
      </View>
    
    </View>
  )
}

export default profile

const styles = StyleSheet.create({ 
  container:{
    flex:1,
    padding:8,
    backgroundColor:Colors.main.tabBackground,
   
  },
  profileCard:{
    marginHorizontal:-2,
    borderRadius:10,
    width:350,
    marginTop:40,
    resizeMode:'cover',
    elevation:30,
    borderWidth:1,
    borderColor:"#7A1CAC"
  } ,
  imageStyle:{ 
    width: 60, 
    height: 60,
    borderRadius:50 ,
    resizeMode:"cover", 
    borderWidth:1,
    borderColor:"#7A1CAC"
  },
  
    name:{
    flexDirection:'column',
    marginTop:20,
    fontSize:10,
    alignItems:'center'
  },

  username:{
    color:Colors.light.text,
    fontSize:20,
    fontWeight:'bold', 
    fontFamily:'Sansation',
    textShadowColor: '#2E073F', 
      textShadowOffset: { width: 1, height: 0 }, 
      textShadowRadius: 5,
  },

  playerName:{
    color:Colors.light.text,
  fontSize:15,
  fontWeight:'thin',
    fontFamily:'Sansation',
    textShadowColor: '#2E073F', 
    textShadowOffset: { width: 1, height: 0 }, 
    textShadowRadius: 5,

  }


})