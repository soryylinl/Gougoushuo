/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TabBarIOS} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import List from './app/creation/index';
import Edit from './app/edit/index';
import Account from './app/account/index';

const styles = {
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
}

export default class Gougoushuo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentName: 'List'
        };

        this.choice = this.choice.bind(this);

    }

    choice(choiceItem) {
        this.setState({
            componentName: choiceItem
        });
    };

    render() {
        return (
            <TabBarIOS
                tintColor="#ee735c"
                unselectedTintColor="gray">
                <Icon.TabBarItem
                    iconName="ios-videocam-outline"
                    selectedIconName="ios-videocam"
                    onPress={()=>this.choice('List')}
                    selected={this.state.componentName==='List'}>

                    {/*子视图，通过selected属性的值(true/false)控制显示/隐藏*/}
                    <List/>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName="ios-recording-outline"
                    selectedIconName="ios-recording"
                    onPress={()=>this.choice('Edit')}
                    selected={this.state.componentName==='Edit'}>

                    {/*子视图，通过selected属性的值(true/false)控制显示/隐藏*/}
                    <Edit/>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName="ios-more-outline"
                    selectedIconName="ios-more"
                    onPress={()=>this.choice('Account')}
                    selected={this.state.componentName==='Account'}>

                    {/*子视图，通过selected属性的值(true/false)控制显示/隐藏*/}
                    <Account/>
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}


AppRegistry.registerComponent('Gougoushuo', () => Gougoushuo);
