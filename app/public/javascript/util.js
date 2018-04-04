import {Dimensions} from 'react-native';

export function px2dp(px) {
    const deviceW = Dimensions.get('window').width;
    const basePx = 375;
    return px * deviceW / basePx
}