import React from 'react';
import {Image} from 'react-native';

export default class TabBarItem extends React.Components {
    static defaultProps = {
        tintColor: null,
        focused: null,
        normalImage: null,
        selectedImage: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            tintColor: props.tintColor,
            focused: props.focused,
            normalImage: props.normalImage,
            selectedImage: props.selectedImage,
        };
    }

    render() {
        return (
            <Image source={this.state.focused ? this.state.selectedImage : this.state.normalImage}
                   style={{
                       // tintColor: this.state.tintColor,
                       width: 25,
                       height: 25
                   }}/>
        );
    }
}