import React from 'react';

import {Text, View, Button, Alert} from 'react-native';
import {FetchIndex} from './../../../api/index';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.setData();
    }

    async setData() {
        await storage.setItem("userInfo", {id: 123, name: 123});
        console.log(storage.setItem)
    }

    async getIndexData() {
        storage.getItem("userInfo").then((data) => {
            console.log(data);
        })
        return false
        // let res = await FetchIndex();
        // console.log(res);
    }

    post() {
        fetch('http://ip.taobao.com/service/getIpInfo.php', {
            method: 'POST',//1
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({//2
                'ip': '59.108.23.12'
            })
        }).then((response) => response.json())
            .then((jsonData) => {
                console.log(1, jsonData)
                let country = jsonData.data.country;
                let city = jsonData.data.city;
                alert("country:" + country + "-------city:" + city);
            });
    }

    getData() {
        fetch('http://smc.jdddata.com/api/scoredetail/ssmatchhis?version=v2.1&pts=0&pcode=h5&mid=12199444&lotteryId=90', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())//1
            .then((res) => {//2
                console.log(res)
                if (res.code == 0) {
                    alert("awayTeamName:" + res.data.awayTeamName);
                }
            });
    }

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
                    )}
                />
                <Button
                    title="Go to Discover"
                    onPress={() => this.props.navigation.navigate('Discover')}
                />
                <Button title="go Demo" onPress={() => this.props.navigation.navigate('Demo')}/>
                <Button title="getData" onPress={() => this.getIndexData()}/>
            </View>
        );
    }
}