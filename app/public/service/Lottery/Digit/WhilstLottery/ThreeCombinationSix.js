import { _WhilstLottery } from "./WhilstLottery";

/**
 * 三星组六
 *
 * @class ThreeCombinationSix
 * @extends {_WhilstLottery}
 */
export class ThreeCombinationSix extends _WhilstLottery {
    TypeName = "三星组六";

    constructor(type, type_compound) {
        super(type, type_compound);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof ThreeCombinationSix
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth: [],
            fifth: super.Random([0, 9], 3)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof ThreeCombinationSix
     */
    JettonCalc() {
        return super.Combination(this.Selected.fifth.length, 3);
    }

    /**
     * 最高奖金计算
     *
     * @memberof ThreeCombinationSix
     */
    AwardCalc() {
        return 160;
    }

    /**
     * 补全一注
     *
     * @memberof ThreeCombinationSix
     */
    CompleteBall() {
        if (this.Selected.fifth.length < 3) {
            this.Selected.fifth = this.Selected.fifth.concat(
                super.Random([0, 9], 3 - this.Selected.fifth.length, { except: this.Selected.fifth })
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
     * @memberof ThreeCombinationSix
     */
    GetOrderString(selected) {
        return super.GetOrderString(
            selected.map(m => {
                m.playType = this.JettonCalc(m.selected) > 1 ? this.TypeCompound : this.Type;
                return m;
            })
        );
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof ThreeCombinationSix
     */
    Select(item) {
        let clickIndex = this.Selected.fifth.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.fifth.splice(clickIndex, 1);
        } else {
            if (this.Selected.fifth.length >= 8) {
                return "最多选择8个号码!";
            }
            this.Selected.fifth.push(item);
        }
    }
}
