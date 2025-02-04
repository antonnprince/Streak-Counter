import { StatusBar, Text,View } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from "../../constants/Colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#18181B" />
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
    backgroundColor:Colors.light.background
  },

})
