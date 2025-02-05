import { StatusBar, Text,View } from 'react-native'
import React,{useEffect} from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from "../../constants/Colors";
import * as Notifications from "expo-notifications"


export default function HomeScreen() {

  useEffect(() => {
    const setupNotifications = async () => {
      await Notifications.requestPermissionsAsync(); // Ask for permission

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hey player",
          body: "Do not miss out on these exciting games",
          sound: true,
        },
        trigger: {
          hour: 17,
          minute: 52, 
          second:0,
          repeats: true, // Repeat daily
        },
      });
    };

    setupNotifications();
  }, []); 

  return (
    <View style={styles.container}>
      
      <Text style={Colors.dark.text}>This is Home Page</Text>
    </View>
  )
}


 const styles = StyleSheet.create({
  container:{
    display:'flex',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.light.background,
    fontFamily:"Sansation"
  },

})
