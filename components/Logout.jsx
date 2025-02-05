import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Logout() {
  return (
    <View style={styles.buttonStyle}>
      <Text style={styles.textStyle}>Logout</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor:"#9F1239",
        paddingHorizontal:"4%",
        paddingVertical:"2%",
        borderRadius:13,
        marginTop:'auto'
    },

    textStyle:{
        color:'white',
        fontSize:13
    }
})