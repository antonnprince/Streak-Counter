import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

const Streak = ({streaks}) => {
  return (
    <View style={{flexDirection:'row'}}>
        <Ionicons name="rocket" size={24} color="#7C3AED" 
          />
          <Text style={{
            fontSize:18
          }}
          onPress={()=>Alert.alert("You have a continous streak of 34 days")}

          >
            {streaks}
          </Text>
    </View>
  )
}

export default Streak