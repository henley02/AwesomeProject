import { _WhilstLottery } from "./WhilstLottery";

/**
 * 二星组选和值
 *
 * @class TwoCombinationSum
 * @extends {_WhilstLottery}
 */
export class TwoCombinationSum extends _WhilstLottery {
    TypeName = "二星组选和值";

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
     * @memberof TwoCombinationSum
     */
    Init() {
        let fifth = super.GenerateNumber(0, 18, { zeroize: false }).map(m => {
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
     * @memberof TwoCombinationSum
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
     * @memberof TwoCombinationSum
     */
    JettonCalc() {
        let map = {
            "0": 1,
            "1": 1,
            "2": 2,
            "3": 2,
            "4": 3,
            "5": 3,
            "6": 4,
            "7": 4,
            "8": 5,
            "9": 5,
            "10": 5,
            "11": 4,
            "12": 4,
            "13": 3,
            "14": 3,
            "15": 2,
            "16": 2,
            "17": 1,
            "18": 1
        };
        return this.Selected.fifth.length > 0 ? map[this.Selected.fifth[0]] : 0;
    }

    /**
     * 最高奖金计算
     *
     * @memberof TwoCombinationSum
     */
    AwardCalc() {
        return 96;
    }

    /**
     * 补全一注
     *
     * @memberof TwoCombinationSum
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
     * @memberof TwoCombinationSum
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected);
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof TwoCombinationSum
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
