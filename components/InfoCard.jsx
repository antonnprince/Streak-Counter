import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors.ts'

const InfoCard = () => {
  return (
    
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
  )
}


export default InfoCard
