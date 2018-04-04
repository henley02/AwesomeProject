import { OneDirect } from "./OneDirect";
import { TwoDirect } from "./TwoDirect";
import { ThreeDirect } from "./ThreeDirect";
import { FourDirect } from "./FourDirect";
import { FiveDirect } from "./FiveDirect";
import { TwoCombination } from "./TwoCombination";
import { Repetition } from "./Repetition";
import { ThreeCombinationThreeSingle } from "./ThreeCombinationThreeSingle";
import { ThreeCombinationSix } from "./ThreeCombinationSix";
import { ThreeCombinationThreeCompound } from "./ThreeCombinationThreeCompound";
import { OptionalOne } from "./OptionalOne";
import { OptionalTwo } from "./OptionalTwo";
import { OptionalThree } from "./OptionalThree";
import { FiveAll } from "./FiveAll";
import { SizeOddEven } from "./SizeOddEven";
import { TwoInterest } from "./TwoInterest";
import { TwoInterval } from "./TwoInterval";
import { TwoDirectSum } from "./TwoDirectSum";
import { TwoCombinationSum } from "./TwoCombinationSum";
import { ThreeDirectSum } from "./ThreeDirectSum";
import { ThreeCombinationThreeSum } from "./ThreeCombinationThreeSum";
import { ThreeCombinationSixSum } from "./ThreeCombinationSixSum";

/**
 * 时时彩玩法枚举
 */
const WhilstLotteryPlayTypeEnum = {
    /**
     * 一星直选
     */
    OneDirect: "01",
    /**
     * 二星直选
     */
    TwoDirect: "02",
    /**
     * 三星直选
     */
    ThreeDirect: "03",
    /**
     * 四星直选
     */
    FourDirect: "04",
    /**
     * 五星直选
     */
    FiveDirect: "05",
    /**
     * 二星组选
     */
    TwoCombination: "06",
    /**
     * 复选
     */
    Repetition: "10",
    /**
     * 三星组三单式
     */
    ThreeCombinationThreeSingle: "12",
    /**
     * 三星组六
     */
    ThreeCombinationSix: "13",
    /**
     * 三星组三复式
     */
    ThreeCombinationThreeCompound: "15",
    /**
     * 任选一
     */
    OptionalOne: "21",
    /**
     * 任选二
     */
    OptionalTwo: "22",
    /**
     * 任选三
     */
    OptionalThree: "23",
    /**
     * 五星通选
     */
    FiveAll: "31",
    /**
     * 大小单双
     */
    SizeOddEven: "32",
    /**
     * 趣味二星
     */
    TwoInterest: "33",
    /**
     * 区间二星
     */
    TwoInterval: "34",
    /**
     * 二星直选和值
     */
    TwoDirectSum: "41",
    /**
     * 二星组选和值
     */
    TwoCombinationSum: "42",
    /**
     * 三星直选和值
     */
    ThreeDirectSum: "43",
    /**
     * 三星组三和值
     */
    ThreeCombinationThreeSum: "44",
    /**
     * 三星组六和值
     */
    ThreeCombinationSixSum: "45"
};

/**
 * 时时彩
 *
 * @class WhilstLottery
 */
class WhilstLottery {
    PlayTypeEnum = {};

    /**
     * Creates an instance of WhilstLottery.
     * @param {object} playTypeEnum
     * @param {PlayTypeEnum} playType
     * @memberof WhilstLottery
     */
    constructor(playEnum, type) {
        this.PlayTypeEnum = playEnum;

        let map = {
            [this.PlayTypeEnum.OneDirect]: OneDirect,
            [this.PlayTypeEnum.OptionalOne]: OptionalOne,
            [this.PlayTypeEnum.OptionalTwo]: OptionalTwo,
            [this.PlayTypeEnum.OptionalThree]: OptionalThree,
            [this.PlayTypeEnum.SizeOddEven]: SizeOddEven,
            [this.PlayTypeEnum.TwoDirect]: TwoDirect,
            [this.PlayTypeEnum.TwoCombination]: TwoCombination,
            [this.PlayTypeEnum.TwoDirectSum]: TwoDirectSum,
            [this.PlayTypeEnum.TwoCombinationSum]: TwoCombinationSum,
            [this.PlayTypeEnum.TwoInterval]: TwoInterval,
            [this.PlayTypeEnum.TwoInterest]: TwoInterest,
            [this.PlayTypeEnum.Repetition]: Repetition,
            [this.PlayTypeEnum.ThreeDirect]: ThreeDirect,
            [this.PlayTypeEnum.ThreeDirectSum]: ThreeDirectSum,
            [this.PlayTypeEnum.ThreeCombinationThreeSingle]: ThreeCombinationThreeSingle,
            [this.PlayTypeEnum.ThreeCombinationThreeCompound]: ThreeCombinationThreeCompound,
            [this.PlayTypeEnum.ThreeCombinationThreeSum]: ThreeCombinationThreeSum,
            [this.PlayTypeEnum.ThreeCombinationSix]: ThreeCombinationSix,
            [this.PlayTypeEnum.ThreeCombinationSixSum]: ThreeCombinationSixSum,
            [this.PlayTypeEnum.FourDirect]: FourDirect,
            [this.PlayTypeEnum.FiveDirect]: FiveDirect,
            [this.PlayTypeEnum.FiveAll]: FiveAll
        };

        try {
            let key = Object.entries(this.PlayTypeEnum).find(m => m[1] == type)[0];
            return new map[type](type, this.PlayTypeEnum[key + "_Compound"]);
        } catch (error) {
            throw new Error("未找到该玩法!");
        }
    }
}

/**
 * 吉林时时彩
 *
 * @export
 * @class JLWhilstLottery
 */
export class JLWhilstLottery {
    static PlayTypeEnum = {
        /**
         * 一星直选
         */
        OneDirect: 2901,
        /**
         * 二星直选
         */
        TwoDirect: 2902,
        /**
         * 三星直选
         */
        ThreeDirect: 2903,
        /**
         * 四星直选
         */
        FourDirect: 2904,
        /**
         * 五星直选
         */
        FiveDirect: 2905,
        /**
         * 二星直选_复式
         */
        TwoDirect_Compound: 2906,
        /**
         * 三星直选_复式
         */
        ThreeDirect_Compound: 2907,
        /**
         * 四星直选_复式
         */
        FourDirect_Compound: 2908,
        /**
         * 五星直选_复式
         */
        FiveDirect_Compound: 2909,
        /**
         * 复选
         */
        Repetition: 2910,
        /**
         * 二星组选
         */
        TwoCombination: 2911,
        /**
         * 三星组三单式
         */
        ThreeCombinationThreeSingle: 2912,
        /**
         * 三星组六
         */
        ThreeCombinationSix: 2913,
        /**
         * 二星组选_复式
         */
        TwoCombination_Compound: 2914,
        /**
         * 三星组三复式
         */
        ThreeCombinationThreeCompound: 2915,
        /**
         * 三星组六复式
         */
        ThreeCombinationSix_Compound: 2916,
        /**
         * 任选一
         */
        OptionalOne: 2921,
        /**
         * 任选二
         */
        OptionalTwo: 2922,
        /**
         * 任选三
         */
        OptionalThree: 2923,
        /**
         * 五星通选
         */
        FiveAll: 2931,
        /**
         * 大小单双
         */
        SizeOddEven: 2932,
        /**
         * 趣味二星
         */
        TwoInterest: 2933,
        /**
         * 区间二星
         */
        TwoInterval: 2934,
        /**
         * 二星直选和值
         */
        TwoDirectSum: 2941,
        /**
         * 二星组选和值
         */
        TwoCombinationSum: 2942,
        /**
         * 三星直选和值
         */
        ThreeDirectSum: 2943,
        /**
         * 三星组三和值
         */
        ThreeCombinationThreeSum: 2944,
        /**
         * 三星组六和值
         */
        ThreeCombinationSixSum: 2945
    };

    constructor(type) {
        return new WhilstLottery(JLWhilstLottery.PlayTypeEnum, type);
    }
}
