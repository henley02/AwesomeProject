import { _WhilstLottery } from "./WhilstLottery";

/**
 * 趣味二星
 *
 * @class TwoInterest
 * @extends {_WhilstLottery}
 */
export class TwoInterest extends _WhilstLottery {
    TypeName = "趣味二星";

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
     * @memberof TwoInterest
     */
    Init() {
        let third = [{ num: "大" }, { num: "小" }];
        let fourth = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return { num: m };
        });
        let fifth = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
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
            third,
            fourth,
            fifth
        };
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof TwoInterest
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: super.RandomIn(["大", "小"], 1),
            fourth: super.Random([0, 9], 1),
            fifth: super.Random([0, 9], 1)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof TwoInterest
     */
    JettonCalc() {
        return this.Selected.third.length * this.Selected.fourth.length * this.Selected.fifth.length;
    }

    /**
     * 最高奖金计算
     *
     * @memberof TwoInterest
     */
    AwardCalc() {
        return 180;
    }

    /**
     * 补全一注
     *
     * @memberof TwoInterest
     */
    CompleteBall() {
        if (this.Selected.third.length < 1) {
            this.Selected.third = super.RandomIn(["大", "小"], 1);
        }
        if (this.Selected.fourth.length < 1) {
            this.Selected.fourth = super.Random([0, 9], 1);
        }
        if (this.Selected.fifth.length < 1) {
            this.Selected.fifth = super.Random([0, 9], 1);
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
     * @memberof TwoInterest
     */
    GetOrderString(selected) {
        let dic = {
            大: 1,
            小: 2
        };

        return selected.map(m => {
            return {
                number: dic[m.selected.third[0]] + "," + m.selected.fourth[0] + m.selected.fifth[0],
                playid: m.playType
            };
        });
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof TwoInterest
     */
    Select(item, type) {
        let clickIndex = this.Selected[type].findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected[type].splice(clickIndex, 1);
        } else {
            this.Selected[type] = [].concat(item);
        }
    }
}
