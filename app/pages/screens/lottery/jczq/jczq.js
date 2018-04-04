import React from 'react';
import {View, Text, Button} from 'react-native';

export default class JCZQ extends React.Component {

    render() {
        const {params} = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        const otherParam = params ? params.otherParam : null;
        return (
            <View>
                <Text>竞彩足球</Text>
                <Text>{itemId}</Text>
                <Button onPress={() => this.props.navigation.goBack()} title="Go back" />
            </View>
        )
    }
}