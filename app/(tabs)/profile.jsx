import { StyleSheet, Text, View,StatusBar,Image } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import profileImage from "../../assets/images/master.webp"
import bg from "../../assets/images/bg.jpeg"
import {Colors} from "../../constants/Colors.ts"
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const profile = () => {
  const curDate = new Date()
  const tomorrowDate = new Date()
  tomorrowDate.setDate(curDate.getDate() + 1)
  const[streaks,setStreaks] = useState(0)
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
      }}>
        <Ionicons name="rocket" size={24} color="#7C3AED" 
        style={styles.streak}
        />
        <Text style={{
          fontSize:15
        }}>
          34
        </Text>
      </View>
     
      <View
      style={{
        flexDirection:'row',
        justifyContent: 'space-evenly',
        width:'100%',
        margin:'10%',
        padding:"6%",
        borderRadius:'30',
        // backgroundColor:'#D4D4D4'
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