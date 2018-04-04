import { _WhilstLottery } from "./WhilstLottery";

/**
 * 三星组三和值
 *
 * @class ThreeCombinationThreeSum
 * @extends {_WhilstLottery}
 */
export class ThreeCombinationThreeSum extends _WhilstLottery {
    TypeName = "三星组三和值";

    constructor(type) {
        super(type);
        this.Plate = this.Init();
    }

    /**
     * 初始化球盘
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns {object[]}
     * @memberof ThreeCombinationThreeSum
     */
    Init() {
        let fifth = super.GenerateNumber(1, 26, { zeroize: false }).map(m => {
            return { num: m };
        });

        //TODO:遗漏匹配

        // if (option.leaveout) {
        //     if (option.leaveout.first) {
        //         addLeaveout(first, "first");
        //     }
        //     if (option.leaveout.second) {
        //         addLeaveout(second, "second");
        //     }
        //     if (option.leaveout.third) {
        //         addLeaveout(third, "third");
        //     }
        //     if (option.leaveout.fourth) {
        //         addLeaveout(fourth, "fourth");
        //     }
        //     if (option.leaveout.fifth) {
        //         addLeaveout(fifth, "fifth");
        //     }
        // }

        // function addLeaveout(arr, type) {
        //     let leaveout;
        //     arr.forEach((item, index) => {
        //         leaveout = option.leaveout[type].find(m => m.num == item.num);
        //         item.leaveout = leaveout ? leaveout.count : "";
        //     });
        // }

        return {
            first: [],
            second: [],
            third: [],
            fourth: [],
            fifth
        };
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof ThreeCombinationThreeSum
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth: [],
            fifth: super.Random([1, 26], 1)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof ThreeCombinationThreeSum
     */
    JettonCalc() {
        let map = {
            "1": 1,
            "2": 2,
            "3": 1,
            "4": 3,
            "5": 3,
            "6": 3,
            "7": 4,
            "8": 5,
            "9": 4,
            "10": 5,
            "11": 5,
            "12": 4,
            "13": 5,
            "14": 5,
            "15": 4,
            "16": 5,
            "17": 5,
            "18": 4,
            "19": 5,
            "20": 4,
            "21": 3,
            "22": 3,
            "23": 3,
            "24": 1,
            "25": 2,
            "26": 1
        };
        return this.Selected.fifth.length > 0 ? map[this.Selected.fifth[0]] : 0;
    }

    /**
     * 最高奖金计算
     *
     * @memberof ThreeCombinationThreeSum
     */
    AwardCalc() {
        return 320;
    }

    /**
     * 补全一注
     *
     * @memberof ThreeCombinationThreeSum
     */
    CompleteBall() {
        if (this.Selected.fifth.length < 1) {
            this.Selected.fifth = super.Random([1, 26], 1);
        }
        return this.Selected;
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} selected
     * @param {object} selected[].selected
     * @param {string} selected[].selected.first
     * @param {string} selected[].selected.second
     * @param {string} selected[].selected.third
     * @param {string} selected[].selected.fourth
     * @param {string} selected[].selected.fifth
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof ThreeCombinationThreeSum
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected);
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof ThreeCombinationThreeSum
     */
    Select(item) {
        let clickIndex = this.Selected.fifth.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.fifth.splice(clickIndex, 1);
        } else {
            this.Selected.fifth = [].concat(item);
        }
    }
}
