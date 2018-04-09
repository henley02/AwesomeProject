import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Swiper from '@nart/react-native-swiper';

const width = Dimensions.get('window').width;
/**
 * 轮播图
 */
export default class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    render() {
        const list = this.state.data.info.map((item, index) => {
            return (
                <View key={index}>
                    <Image source={{uri: item.imageUrl}} style={styles.image}/>
                </View>
            )
        })
        return (
            <Swiper style={styles.wrapper}
                    paginationStyle={styles.paginationStyle}
                    dot={<View style={styles.dot}/>}
                    activeDot={<View style={styles.activeDot}/>}
                    showsButtons={false}>
                {list}
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: width,
        height: width * 0.3
    },
    image: {
        width: width,
        height: width * 0.3
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 3,
    },
    dot: {
        backgroundColor: 'rgba(255,255,255,.3)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
    },
    activeDot: {
        backgroundColor: '#fff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
    }
})