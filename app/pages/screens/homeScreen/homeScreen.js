import React from 'react';

import {Text, View, Button, Alert} from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Settings!</Text>
                <Button
                    title="Go to JCZQ"
                    onPress={() => this.props.navigation.navigate('JCZQ',
                        {
                            itemId: 86,
                            otherParam: 'anything you want here'
                        },
                    )   }
                />
                <Button
                    title="Go to Discover"
                    onPress={() => this.props.navigation.navigate('Discover')}
                />
            </View>
        );
    }
}