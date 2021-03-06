import { _WhilstLottery } from "./WhilstLottery";

/**
 * 三星直选
 *
 * @class ThreeDirect
 * @extends {_WhilstLottery}
 */
export class ThreeDirect extends _WhilstLottery {
    TypeName = "三星直选";

    constructor(type, type_compound) {
        super(type, type_compound);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof ThreeDirect
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: super.Random([0, 9], 1),
            fourth: super.Random([0, 9], 1),
            fifth: super.Random([0, 9], 1)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof ThreeDirect
     */
    JettonCalc(selected) {
        if (selected) {
            return selected.fifth.length * selected.fourth.length * selected.third.length;
        }
        return this.Selected.fifth.length * this.Selected.fourth.length * this.Selected.third.length;
    }

    /**
     * 最高奖金计算
     *
     * @memberof ThreeDirect
     */
    AwardCalc() {
        return 980;
    }

    /**
     * 补全一注
     *
     * @memberof ThreeDirect
     */
    CompleteBall() {
        if (this.Selected.third.length < 1) {
            this.Selected.third = super.Random([0, 9], 1);
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
     * @memberof ThreeDirect
     */
    GetOrderString(selected) {
        let res = [];
        let s = selected.map(m => {
            m.playType = this.JettonCalc(m.selected) > 1 ? this.TypeCompound : this.Type;
            return m;
        });
        selected.forEach(m => {
            res = res.concat(super.GetOrderString([m], "", this.JettonCalc(m.selected) > 1 ? "," : ""));
        });
        return res;
    }
}
