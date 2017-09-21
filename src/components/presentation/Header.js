import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

class Header extends Component{

    render(){
        return(
            <View style={styles.topNav}>
                <StatusBar barStyle="light-content"/>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topNav: {
        backgroundColor:'rgb(12,0,51)',
        position:'absolute',
        paddingTop:20,
        top:0,
        height:70,
        width:100+'%',
        justifyContent:'center'
    },
    text:{
        color:'rgb(255,255,255)',
        fontFamily: 'helvetica',
        alignSelf: 'center',
        fontSize:14
    }
})

export default Header