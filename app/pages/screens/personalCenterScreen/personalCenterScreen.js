import React from 'react';
import {View, Text, Button} from 'react-native';

export default class PersonalCenterScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>个人中心</Text>
                <Button
                    title="Go to JCZQ"
                    onPress={() => this.props.navigation.navigate('JCZQ',
                        {
                            itemId: 86,
                            otherParam: 'anything you want here'
                        },
                    )}
                />
            </View>
        )
    }
}