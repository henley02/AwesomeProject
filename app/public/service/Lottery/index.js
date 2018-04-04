import * as C from "public/utils/constant";
import { config } from "./config";

import { DoubleChromosphere } from "./Digit/DoubleChromosphere";
import { SDElevenFive, HBElevenFive, GDElevenFive, XJElevenFive } from "./Digit/ElevenFive";
import { PermutationFive } from "./Digit/PermutationFive";
import { PermutationThree } from "./Digit/PermutationThree";
import { JXQuick3, JLQuick3, GXQuick3 } from "./Digit/Quick3";
import { SuperEnalotto } from "./Digit/SuperEnalotto";
import { WelfareLottery3D } from "./Digit/WelfareLottery3D";

export class LotteryFactory {}

export { config };

export {
    SuperEnalotto,
    DoubleChromosphere,
    WelfareLottery3D,
    PermutationFive,
    PermutationThree,
    JXQuick3,
    JLQuick3,
    GXQuick3,
    SDElevenFive,
    HBElevenFive,
    GDElevenFive,
    XJElevenFive
};


export const Quick3 = {
    [C.LOTTERY_ID.JXK3]:JXQuick3,
    [C.LOTTERY_ID.JLK3]:JLQuick3,
    [C.LOTTERY_ID.GXK3]:GXQuick3
}

export const ElevenFive = {
    [C.LOTTERY_ID.SD11X5]:SDElevenFive,
    [C.LOTTERY_ID.HB11X5]:HBElevenFive,
    [C.LOTTERY_ID.GD11X5]:GDElevenFive,
    [C.LOTTERY_ID.XJ11X5]:XJElevenFive,
}
