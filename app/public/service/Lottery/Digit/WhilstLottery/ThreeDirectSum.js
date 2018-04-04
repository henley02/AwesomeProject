import { _WhilstLottery } from "./WhilstLottery";

/**
 * 三星直选和值
 *
 * @class ThreeDirectSum
 * @extends {_WhilstLottery}
 */
export class ThreeDirectSum extends _WhilstLottery {
    TypeName = "三星直选和值";

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
     * @memberof ThreeDirectSum
     */
    Init() {
        let fifth = super.GenerateNumber(0, 27, { zeroize: false }).map(m => {
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
     * @memberof ThreeDirectSum
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth: [],
            fifth: super.Random([0, 18], 1)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof ThreeDirectSum
     */
    JettonCalc() {
        let map = {
            "0": 1,
            "1": 3,
            "2": 6,
            "3": 10,
            "4": 15,
            "5": 21,
            "6": 28,
            "7": 36,
            "8": 45,
            "9": 55,
            "10": 63,
            "11": 69,
            "12": 73,
            "13": 75,
            "14": 75,
            "15": 73,
            "16": 69,
            "17": 63,
            "18": 55,
            "19": 45,
            "20": 36,
            "21": 28,
            "22": 21,
            "23": 15,
            "24": 10,
            "25": 6,
            "26": 3,
            "27": 1
        };
        return this.Selected.fifth.length > 0 ? map[this.Selected.fifth[0]] : 0;
    }

    /**
     * 最高奖金计算
     *
     * @memberof ThreeDirectSum
     */
    AwardCalc() {
        return 980;
    }

    /**
     * 补全一注
     *
     * @memberof ThreeDirectSum
     */
    CompleteBall() {
        if (this.Selected.fifth.length < 1) {
            this.Selected.fifth = super.Random([0, 18], 1);
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
     * @memberof ThreeDirectSum
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected);
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof ThreeDirectSum
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
