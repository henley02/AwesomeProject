import React from 'react';
import {Text, View, Button, Alert, FlatList} from 'react-native';
import {FetchIndex} from './../../api/index';
import Banner from './components/banner/banner';

import DeviceStorage from './../../public/utils/DeviceStorage/DeviceStorage.js';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        }
        this.getIndexData();
    }

    __keyExtractor = (item, index) => {
        console.log(item)
        item.moduleId
    };

    async getIndexData() {
        let map = {
            2: 'strongAd',//强广告位
            3: 'quickBet',//数字彩
            4: 'hotMatch',//热门赛事
            5: 'lotterySection',//彩种
            6: 'operatingActivities',//运营位
            7: 'notice',//公告
            8: 'swiperBanner',//轮播图
            10: 'relatedNews',//资讯
            12: 'horn',//中奖信息
            14: 'indexMenu',
        }
        let res = await FetchIndex();
        console.log(res.data);
        if (res.code == 0) {
            this.setState({
                dataSource: res.data,
            })
        }
    }

    render() {
        return (
            <View>
                <Text>adfadf</Text>
                <FlatList data={this.state.dataSource} keyExtractor={this.__keyExtractor}
                          renderItem={({item}) => <Text>{item.moduleName}</Text>}/>
            </View>
        );
    }
}