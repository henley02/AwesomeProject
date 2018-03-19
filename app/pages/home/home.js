import React from 'react';

import {Text, View, NavigatorIOS} from 'react-native';
import MyScene from './../MyScene/MyScene';

export default class HomeView extends React.Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: MyScene,
                    title: 'My Initial Scene',
                }}
                style={{flex: 1}}
            />
        )
    }
}