import { _WhilstLottery } from "./WhilstLottery";

/**
 * 大小单双
 *
 * @class SizeOddEven
 * @extends {_WhilstLottery}
 */
export class SizeOddEven extends _WhilstLottery {
    TypeName = "大小单双";

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
     * @memberof SizeOddEven
     */
    Init(option = {}) {
        let fourth = [{ num: "大" }, { num: "小" }, { num: "单" }, { num: "双" }];
        let fifth = [{ num: "大" }, { num: "小" }, { num: "单" }, { num: "双" }];

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
            fourth,
            fifth
        };
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof SizeOddEven
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth: super.RandomIn(["大", "小", "单", "双"], 1),
            fifth: super.RandomIn(["大", "小", "单", "双"], 1)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof SizeOddEven
     */
    JettonCalc() {
        return this.Selected.fourth.length * this.Selected.fifth.length;
    }

    /**
     * 最高奖金计算
     *
     * @memberof SizeOddEven
     */
    AwardCalc() {
        return 4;
    }

    /**
     * 补全一注
     *
     * @memberof SizeOddEven
     */
    CompleteBall() {
        if (this.Selected.fourth.length < 1) {
            this.Selected.fourth = super.RandomIn(["大", "小", "单", "双"], 1);
        }
        if (this.Selected.fifth.length < 1) {
            this.Selected.fifth = super.RandomIn(["大", "小", "单", "双"], 1);
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
     * @memberof SizeOddEven
     */
    GetOrderString(selected) {
        let dic = {
            大: 1,
            小: 2,
            单: 3,
            双: 4
        };
        return selected.map(m => {
            return {
                number: Object.values(m.selected)
                    .filter(s => s.length > 0)
                    .map(s => s.map(ss => dic[ss]).join(""))
                    .join(""),
                playid: m.playType
            };
        });
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof SizeOddEven
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
