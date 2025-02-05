import { View, Text,StyleSheet,FlatList } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors.ts'


export default function LeaderBoard() {
    const leaderBoardMembers = [
        {id:1,username:"@masterchief"},
        {id:2,username:"@kratos"},
        {id:3,username:"@dante"},
        {id:4,username:"@blade"},
        {id:5,username:"@jarvis"},
        {id:6,username:"@jaybe"},
    ]

  return (
    <View style={styles.container}>
        <Text style={styles.headerStyle}>
            LEADERBOARD
        </Text>

        <FlatList
        data={leaderBoardMembers}        // Array of items
        renderItem={({item})=>(<Text style={styles.textStyle}> {item.id}.{item.username}</Text>)} // Function to render each item
        keyExtractor={item => item.id} // Unique key for each item
        />
   
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        width:'100%',
        height:"30%",
        // margin:'5%',
        padding:"4%",
        // borderRadius:5,
        backgroundColor:Colors.main.componentBg,
        elevation:10
    },

    headerStyle:{
        color:Colors.main.textColor,
        fontSize:20,
        fontFamily:"Sansation",
        fontWeight:'bold',
        textShadowColor:'black',
        textShadowOffset:{width:2,height:2},
        textShadowRadius:3,
        padding:'2%'
    },

    textStyle:{
        color:Colors.main.textColor,
        fontSize:13
    }
})