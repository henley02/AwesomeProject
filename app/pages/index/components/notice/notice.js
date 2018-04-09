import React from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import Swiper from '@nart/react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
/**
 * 通知、中奖
 */
export default class Notice extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.data);
        this.state = {
            list: props.data,
            type: props.type,//1 通知 2中奖信息
        }
    }

    render() {
        const list = this.state.list.map((item, index) => {
            return (
                this.state.type == 2
                    ?
                    <View key={index} style={styles.slide}>
                        <Text style={styles.text}>恭喜{item.userName}用户投注{item.lotteryName}中奖{item.money}</Text>
                    </View>
                    :
                    <View key={index} style={{height: 50}}>
                        <Text style={{height: 50, color: 'red'}}>{item.content}</Text>
                    </View>
            )
        })
        console.log(list)
        return (
            <View style={styles.container}>
                <Ionicons name={'ios-notifications-outline'} size={25} style={styles.icons}/>
                <Swiper style={styles.wrapper} height={200} horizontal={false} autoplay showsPagination={false}>
                    {list}
                </Swiper>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 25,
        backgroundColor: '#fff',
        width: width,
        flexDirection: 'row',
    },
    wrapper: {
        flex: 1,
        width: width - 50,
    },
    icons: {
        color: '#FF9800',
    },
    slide: {
        height: 25,
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    text: {
        color: '#666',
        fontSize: 12,
    },
})