import {Dimensions} from 'react-native';

export function px2dp(px) {
    const deviceW = Dimensions.get('window').width;
    const basePx = 375;

    console.log(deviceW);
    console.log(px);
    console.log(px * deviceW / basePx);
    return px * deviceW / basePx
}