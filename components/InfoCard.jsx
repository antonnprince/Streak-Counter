import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors.ts'

const InfoCard = () => {
  return (
    
      <View style={styles.contianer}>     
      
        <Text style={styles.textStyle}>
              Snacks 
              {'\n'}
             <Text style={styles.countStyle}>110</Text>
        </Text>

  
        <Text  style={styles.textStyle}>
          Following
          {'\n'}
             <Text style={styles.countStyle}>50</Text>
        </Text>
      
        <Text  style={styles.textStyle}>
          Followers
          {'\n'}
             <Text style={styles.countStyle}>50</Text>
        </Text>

        <Text  style={styles.textStyle}>
          Coins
          {'\n'}
            <Text style={styles.countStyle}>190</Text>
        </Text>
      
      </View>
  )
}

const styles = StyleSheet.create({
  contianer:{
    flexDirection:'row',
    justifyContent: 'center',
    width:'100%',
    margin:'5%',
    padding:"4%",
    borderRadius:5,
    backgroundColor:Colors.main.componentBg,
    elevation:10
  },

  textStyle:{
      color:Colors.main.textColor, 
      fontSize:20,
      fontWeight:500,
      textShadowColor: '#020617', 
      textShadowOffset: { width: 1, height: 1 }, 
      textShadowRadius: 5,
      padding:'2%'
  },

  countStyle:{
    fontWeight:'thin',
    //  marginLeft:10, 
     fontSize:14
    }
})


export default InfoCard
