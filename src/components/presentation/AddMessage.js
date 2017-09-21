import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import config from '../../config'

class AddMessage extends Component{
    render(){
        return(
            <TouchableOpacity 
                onPress={this.props.addMessage}
                style={styles.circle}>
                <Image source={config.images.plus}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    circle: {
        width:60,
        height: 60,
        borderRadius:30,
        backgroundColor: 'rgb(98,195,112)',
        position:'absolute',
        bottom:15,
        right:15,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default AddMessage