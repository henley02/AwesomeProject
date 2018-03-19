/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Alert} from 'react-native';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {px2dp} from './app/public/javascript/util';

import HomeView from './app/pages/home/home';
import ProfileView from './app/pages/profile/profile';

const iconSize = px2dp(22);

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        };
    }

    _changeTabIndex(val) {
        this.setState({
            selectedTab: val,
        })
    }

    render() {

        return (
            <TabNavigator style={styles.container}>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'home'}
                  title="Home"
                  selectedTitleStyle={{color: "#3496f0"}}
                  renderIcon={() => <Icon name="home" size={iconSize} color="#666"/>}
                  renderSelectedIcon={() => <Icon name="home" size={iconSize} color="#3496f0"/>}
                  onPress={this._changeTabIndex.bind(this, 'home')}>
                <HomeView/>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'profile'}
                  title="Profile"
                  selectedTitleStyle={{color: "#3496f0"}}
                  renderIcon={() => <Icon name="user" size={iconSize} color="#666"/>}
                  renderSelectedIcon={() => <Icon name="user" size={iconSize} color="#3496f0"/>}
                  onPress={this._changeTabIndex.bind(this, 'profile')}>
                <ProfileView/>
              </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});
