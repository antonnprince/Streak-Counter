import { View, Text,StyleSheet,Alert } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const Streak = ({streaks}) => {
  return (
    <View style={{flexDirection:'row'}}>
        <Ionicons name="rocket" size={24} color="#7A1CAC" 
          />
          <Text style={{
            fontSize:18,
            color:"#ECDFCC",
            fontWeight:'bold'
          }}
          onPress={()=>Alert.alert("You have a continous streak of 34 days")}

          >
            {streaks}
          </Text>
    </View>
  )
}

export default Streak