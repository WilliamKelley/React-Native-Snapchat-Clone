import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Header } from '../presentation'
import { Messages } from '../containers'

class Home extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Header color={'red'} text={"All Messages"}/>
                <View style={{marginTop:70, width:100+'%'}}>
                    <Messages />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(255,255,255)',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
});

export default Home