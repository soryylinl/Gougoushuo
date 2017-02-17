/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppRegistry, StyleSheet, Text, View, TabBarIOS,
    Navigator } from 'react-native';


import List from './app/creation/index';
import Edit from './app/edit/index';
import Account from './app/account/index';


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
                    <Navigator
                        initialRoute={{
                            name:'list',
                            component:List
                        }}
                        configureScene={(route)=>{
                            return Navigator.SceneConfigs.FloatFromRight
                        }}
                        renderScene={(route,navigator)=>{
                            let Component=route.component;
                            return <Component {...route.params} navigator={navigator}/>
                        }}
                    />
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
