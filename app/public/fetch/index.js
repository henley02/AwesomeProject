import {Alert, AsyncStorage} from 'react-native';
import axios from "axios";
import getRequest from "./getRequest";
import * as conf from "./../config/api";
import DeviceStorage from './../utils/DeviceStorage/DeviceStorage';

//添加公用配置
axios.defaults.timeout = conf.REQUEST_TIME_OUT;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
    config => {
        let url;
        let dir = true;
        switch (config.url) {
            case "infoApi": //资讯
                url = "https://info-api.jdd.com/info/public/safeMobileHandler.do";
                break;
            case "userClient": //用户
                url = "https://user-client-api.jdd.com/dispatcher";
                break;
            case "siteClient": //站点
                url = "https://site-client-api.jdd.com/dispatcher";
                break;
            case "matchClient": //期次对阵
                url = "https://match-client-api.jdd.com/dispatcher";
                break;
            case "awardClient": //开奖
                url = "https://award-client-api.jdd.com/dispatcher";
                break;
            case "arenaClient": //大神
                url = "https://arena-client-api.jdd.com/dispatcher";
                break;
            case "orderClient": //订单
                url = "https://order-client-api.jdd.com/dispatcher";
                break;
            case "tradeClient": //交易
                url = "https://trade-client-api.jdd.com/dispatcher";
                break;
            case "hdClient": //活动
                url = "https://activity-client-api.jdd.com/dispatcher";
                break;
            case "javaShop": //积分商城
                url = "https://shop-api.jdd.com/shop/public/securityMobileHandler.do";
                break;
            case "javaAppadmin": //java appadmin
                url = "https://appadmin-api.jdd.com/appadmin/public/safeMobileHandler.do";
                break;
            case "pushServer": //推送
                url = "https://push-server.jdd.com/jdd/public/safe/pushSet.do";
                break;
            case "javaHD": //java活动请求
                url = "https://activity-api.jdd.com/activity/public/mobileHandler.do";
                break;
            case "userApi": //jva接口用户
                url = "https://user-api.jdd.com/user/public/securityMobileHandler.do";
                break;
            case "JavaReport": //站点
                url = "https://report-api.jdd.com/sitedata/public/securityMobileHandler.do";
                break;
            case "javaYhk": //优惠卡
                url = "https://rp-api.jdd.com/redpacket/public/mobileHandler.do";
                break;
            case "javaCjk": //彩金卡
                url = "https://rp-api.jdd.com/redpacket/public/handselMobileHandler.do";
                break;
            case "javaMaster": //大神
                url = "https://master-api.jdd.com/master/public/securityMobileHandler.do";
                break;
            case "javaTride": //交易
                url = "https://trade-api.jdd.com/trade/public/securityApiHandler.do";
                break;
            case "javaOrder": //订单
                url = "https://order-api.jdd.com/order/public/securityMobileHandler.do";
                break;
            case "javaBd": //基础数据
                url = "https://bd-api.jdd.com/basedata/public/securityMobileHandler.do";
                break;
            case "playstation":
                url = "https://ps-api.jdd.com/playstation/public/mobileHandler.do";
                break;
            case "rpRain":
                url = "https://activity-api-rp-rain.jdd.com/activity/public/mobileHandler.do"
                break;
            default:
                url = config.url;
                dir = config.url.indexOf('lottery.jdddata.com') > -1 || (config.url.indexOf('smc.jdddata.com') > -1 && config.method == "post") ? true : false;
        }
        config.url = url;

        if (dir) {
            let params = {body: config.data.params};
            let userInfo = DeviceStorage.get("userInfo");
            if (config.isNeedLogin && !userInfo) {
                //跳转登录
                return false;
            }

            params.header = {
                appVersion: "5.2.4",
                action: config.data.action,
                cmdId: 1,
                cmdName: "app_ios_zz",
                phoneName: "iPhone 7 Plus",
                platformCode: "IPHONE",
                platformVersion: '11.3',
                token: userInfo ? userInfo.token : "",
                traceID: '',
                userID: userInfo ? userInfo.id : "",
                userType: userInfo ? userInfo.usertype : 1,
                uuid: '4CD46CD06FAB4F36926A16409C72BD05',//32位的uuid 187c6fc9405b4322872019948a66a5e3
            };

            config.data = "request=" + getRequest(params);
        }
        return config;
    },
    error => {
        console.log("req-error");
        console.error(error);
    }
);

/**
 * 添加响应拦截器
 */
axios.interceptors.response.use(
    response => {
        if ((response.data.code == -2 || response.data.code == -97 || response.data.code == -96 || response.data.code == -90 || response.data.code == -91) && response.config.isNeedLogin == 1) {
            response.data.code = -2;
            AsyncStorage.removeItem("userInfo");
        }
        return response.data;
    },
    error => {
        //请求错误时做些事
        console.log("res-error");
        // console.error(error);
        // debugger;

        // if ((error.config.data && !error.config.data.isNotLoading) || (error.config.params && !error.config.params.isNotLoading) || !error.config.isNotLoading) {
        if (!((error.config.data && error.config.data.isNotLoading) || (error.config.params && error.config.params.isNotLoading) || error.config.isNotLoading)) {
            console.error(error);
        }

        if (error.message.toLowerCase().indexOf("timeout") > -1) {
            if (error.config && !error.config._isNotAlert)
                Alert("请求超时，请您重新加载或检查您的网络连接!");
        }

        //_catch为true时，不抛异常；_catch为false时，抛出异常
        if (error.config && !error.config._catch) throw error;
    }
);

export default axios;
