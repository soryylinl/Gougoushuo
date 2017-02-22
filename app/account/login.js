import React from 'react';
import { StyleSheet, Text, View, TextInput, AlertIOS } from 'react-native';
import Button from 'react-native-button';
import config from './../common/config';
import request from './../common/request';

export default class Login extends React.Component {

    constructor(props){
        super(props);

        this.state={
            phoneNumber:'',
            sentCode:false,
            verifyCode:'',
            count:false,
            countDone:false,

        }

        this.submit=this.submit.bind(this);
        this.sentVerifyCode=this.sentVerifyCode.bind(this);
        this.showVerifyCode=this.showVerifyCode.bind(this);
        this.countDone=this.countDone.bind(this);

    }
    ;

    submit(){

    }
    ;

    showVerifyCode(){
        this.setState({
            sentCode:true
        })
    }
    ;

    sentVerifyCode(){
        let phoneNumber=this.state.phoneNumber;

        if(!phoneNumber){
            return AlertIOS.alert('手机号不能为空');
        }

        let body={
            phoneNumber:phoneNumber
        }

        let url=config.api.base+config.api.signup;

        request.post(url,body).then((response)=>{
            if(response&&response.success){
                this.showVerifyCode();
            }
            else{
                return AlertIOS.alert('获取验证码失败，稍后重试');
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    ;

    countDone(){
        this.setState({
            countDone:true
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.signupBox}>
                    <Text style={styles.title}>快速登录</Text>
                    <TextInput placeholder="输入手机号"
                               autoCaptialize={'none'}
                               autoCorrect={false}
                               keyboardType={'number-pad'}
                               style={styles.inputField}
                               onChangeText={(text)=>{
                                    this.setState({
                                        phoneNumber:text
                                    })

                           }}
                    />
                    {
                        this.state.sentCode ?
                            <View style={styles.verifyCode}>
                                <TextInput placeholder="输入验证码"
                                           autoCaptialize={'none'}
                                           autoCorrect={false}
                                           keyboardType={'number-pad'}
                                           style={styles.inputField}
                                           onChangeText={(text)=>{
                                               verifyCode:text
                                           }}
                                />
                            </View> :
                            null
                    }
                    {
                        this.state.sentCode ?
                            <Button style={styles.btn}
                                    onPress={this.submit}
                            >登录</Button> :
                            <Button style={styles.btn}
                                    onPress={this.sentVerifyCode}
                            >发送验证码</Button>
                    }
                </View>
            </View>
        )
    }
}
;

const styles = {
    container: {
        flex: 1,
        padding:10,
        backgroundColor: '#f9f9f9',
    },
    signupBox:{
        marginTop:30,
    },
    title:{
        marginBottom:20,
        color:'#333',
        fontSize:20,
        textAlign:'center',
    },
    inputField:{
        height:40,
        padding:5,
        color:'#666',
        fontSize:16,
        backgroundColor:'#fff',
        borderRadius:4,
    },
    btn:{
        padding:10,
        margin:10,
        backgroundColor:'transparent',
        borderColor:'#ee735c',
        borderWidth:1,
        borderRadius:4,
        color:'#ee735c',
    },

};



















