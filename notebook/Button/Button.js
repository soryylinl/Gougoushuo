/**
 * Sample React Native Custom Button
 * email: yujy.xiwen.tu@gmail.com
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class Button extends Component {

    constructor(props){
        super(props);

        //初始状态
        this.state={
            disabled:false
        }
    }

    /*使用ref属性操作*/
    // triggerEvent=()=>{
    //     const { event } = this.props;
    //     event();
    // }

    /*使用回调异步处理*/
    triggerEvent=()=>{
        const { event } = this.props;
        this.disabled();
        event(this.enable);
    }

    enable=()=>{
        this.setState({
            disabled:false
        })
    }

    disabled=()=>{
        this.setState({
            disabled:true
        })
    }


    render() {
        //解构
        const { buttonText,backgroundColor } = this.props;

        return (
            <TouchableOpacity style={[styles.customButton,{backgroundColor:this.props.backgroundColor},this.state.disabled&&styles.disabled]}
                              onPress={this.triggerEvent}
                              disabled={this.state.disabled}>
                <Text style={styles.customButtonText}>
                    {this.props.buttonText}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    customButton:{
        width: 150,
        height: 40,
        borderRadius:20,
        justifyContent:'center',
        overflow:'hidden'
    },
    customButtonText:{
        textAlign:'center',
        color:'black'
    },
    disabled:{
        backgroundColor:'gray'
    }
});

