/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Button from './src/component/Button';

export default class Gougoushuo extends Component {

    /*使用ref属性操作*/
    // obtainData=()=>{
    //   //获取到数据之前，禁用按钮
    //     this.refs.buttonStates.disabled();
    //     this.timer=setTimeout(()=>{
    //         this.refs.buttonStates.enable();
    //     },3000);
    // }
    //

    /*使用回调异步处理*/
    obtainData=(cb)=>{
        this.timer=setTimeout(()=>{
            cb();
        },3000)
    }


    //注意，一定要在组件被销毁的时候关掉定时器
    componentWillUnMount() {
        this.timer&&clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
                <Button ref="buttonStates" buttonText="确定" backgroundColor="red" event={this.obtainData}/>
                <Button ref="buttonStates" buttonText="取消" backgroundColor="yellow" event={this.obtainData}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    customButton:{
        width: 150,
        height: 40,
        backgroundColor:'yellow',
        borderRadius:20,
        justifyContent:'center'
    },
    customButtonText:{
        textAlign:'center',
        color:'black'
    },
});

AppRegistry.registerComponent('Gougoushuo', () => Gougoushuo);
