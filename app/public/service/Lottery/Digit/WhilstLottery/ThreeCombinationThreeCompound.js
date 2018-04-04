import { _WhilstLottery } from "./WhilstLottery";

/**
 * 三星组三复式
 *
 * @class ThreeCombinationThreeCompound
 * @extends {_WhilstLottery}
 */
export class ThreeCombinationThreeCompound extends _WhilstLottery {
    TypeName = "三星组三复式";

    constructor(type) {
        super(type);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof ThreeCombinationThreeCompound
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth: [],
            fifth: super.Random([0, 9], 2)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof ThreeCombinationThreeCompound
     */
    JettonCalc() {
        return this.Selected.fifth.length * (this.Selected.fifth.length - 1);
    }

    /**
     * 最高奖金计算
     *
     * @memberof ThreeCombinationThreeCompound
     */
    AwardCalc() {
        return 320;
    }

    /**
     * 补全一注
     *
     * @memberof ThreeCombinationThreeCompound
     */
    CompleteBall() {
        if (this.Selected.fifth.length < 2) {
            this.Selected.fifth = this.Selected.fifth.concat(
                super.Random([0, 9], 2 - this.Selected.fifth.length, { except: this.Selected.fifth })
            );
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
     * @memberof ThreeCombinationThreeCompound
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected);
    }
}
