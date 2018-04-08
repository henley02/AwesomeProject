/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Alert} from 'react-native';
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {px2dp} from './app/public/javascript/util';
import HomeScreen from './app/pages/index/index';
import PersonalCenterScreen from './app/pages/screens/personalCenterScreen/personalCenterScreen';
import DiscoverScreen from './app/pages/screens/discoverScreen/discoverScreen';
import JCZQScreen from './app/pages/screens/lottery/jczq/jczq';
import DemoScreen from './app/pages/screens/lottery/demo/demo';

const iconSize = px2dp(22);

const HomeStack = StackNavigator({
    'Home': {screen: HomeScreen},
    'JCZQ': {screen: JCZQScreen},
    'Demo': {screen: DemoScreen},
})
const PersonalCenterStack = StackNavigator({
    PersonalCenter: {screen: PersonalCenterScreen},
    JCZQ: {screen: JCZQScreen},
});
export default TabNavigator(
    {
        'Home': {screen: HomeStack},//screen和导航的功能是一样的，对应界面名称，可以在其他页面通过这个screen传值和跳转
        'Discover': {screen: DiscoverScreen},
        'PersonalCenter': {screen: PersonalCenterStack},
    },
    {
        navigationOptions: ({navigation}) => ({//配置TabNavigator的一些属性
            tabBarIcon: ({focused, tintColor}) => {//设置标签栏的图标
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home-outline`;
                } else if (routeName == 'Discover') {
                    iconName = `ios-eye-outline`;
                } else if (routeName === 'PersonalCenter') {
                    iconName = `ios-contact-outline`;
                }
                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            },
            tabBarLabel: () => {//设置标签栏的title
                const {routeName} = navigation.state;
                if (routeName === 'Home') {
                    return '我的'
                } else if (routeName == 'Discover') {
                    return '发现'
                } else if (routeName === 'PersonalCenter') {
                    return '个人中心'
                }
            },
        }),
        tabBarOptions: {//配置标签栏的一些属性
            activeTintColor: 'red',//label和icon的前景色 活跃状态下
            inactiveTintColor: 'gray',//label和icon的前景色 不活跃状态下
            style: {backgroundColor: '#ffffff',},
            labelStyle: {
                fontSize: 10, // 文字大小
            },
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',//设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom'）
        animationEnabled: false,//是否在更改标签时显示动画
        swipeEnabled: false,//是否允许在标签之间进行滑动
        lazy: true,//是否根据需要懒惰呈现标签，而不是提前，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐为true
    }
)
