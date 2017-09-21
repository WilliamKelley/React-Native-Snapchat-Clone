import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native'
import { AddMessage } from '../presentation'
import Turbo from 'turbo360'
import config from '../../config'

class Messages extends Component{

    constructor(){
        super()
        this.state = {
            messages: [
            ],
            modalVisible:true,
            login: {
                username:'',
                password:''
            }
        }
    }

    componentDidMount(){
        Turbo({site_id:config.TURBO_APP_ID}).fetch('message', {for:'Ryan'})
        .then((data)=>{
            this.setState({
                messages: data
            })
        })
    }

    addMessage(){
        Turbo({site_id: config.TURBO_APP_ID}).create('message', {id:5, for:'Ryan', from:'Doggy', content: 'Bark?'})
        .then((data)=>{
            let newMessages = Object.assign([],this.state.messages)
            newMessages.push(data)
            this.setState({
                messages:newMessages
            })
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    loginUpdated(text, key){
        let newLogin = Object.assign({}, this.state.login)
        newLogin[key] = text
        this.setState({
            login: newLogin
        })
    }

    loginSubmitted(){
        Turbo({site_id: config.TURBO_APP_ID}).fetch('user', {username: this.state.login.username})
        .then((data=>{
            if(data.length==0){
                return Turbo({site_id: config.TURBO_APP_ID}).createUser(this.state.login)
            }else{
                return Turbo({site_id: config.TURBO_APP_ID}).login(this.state.login)
            }
        }))
        .then((data)=>{
            this.setState({
                currentUser: data.id,
                modalVisible: false
            })
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    _renderMessage(item){
        return(
            <View style={styles.message}>
                <Text style={[{paddingTop:5}, styles.messageText]}>
                    From: {item.from}
                </Text>
                <Text style={[{paddingBottom:5}, styles.messageText]}>
                    {item.content}
                    </Text>
            </View>
        )
    }

    render(){
        return(
            <View style={styles.main}>
                <Modal 
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={styles.modal}>
                        <View style={styles.login}>
                            <Text>Login / Signup</Text>
                            <Text>Username</Text>
                            <TextInput onChangeText={(text)=>this.loginUpdated(text, 'username')}/>
                            <Text>Password</Text>
                            <TextInput onChangeText={(text)=>this.loginUpdated(text, 'password')}/>
                            <TouchableOpacity onPress={()=>this.loginSubmitted()}>
                                <Text>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            <FlatList 
                keyExtractor={(item)=>item.id}
                style={styles.main}
                data={this.state.messages}
                renderItem={({item})=>this._renderMessage(item)}
                />
                <AddMessage addMessage={()=>this.addMessage()}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    main:{
        width:100 + '%', 
        height:100 + '%'
    },
    message:{
        width:100+'%',
        borderBottomWidth:1,
        borderColor:'rgb(71,77,89)'
    },
    messageText:{
        color:'rgb(12,0,51)',
        fontFamily:'helvetica',
        fontSize:14
    },
    modal: {
        width:100 + '%',
        height:100 + '%',
        backgroundColor:'rgba(0,0,0,.85)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    login: {
        width:80 + '%',
        height:30 + '%',
        backgroundColor:'rgb(255,255,255)'
    }
})

export default Messages