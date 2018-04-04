import { _WhilstLottery } from "./WhilstLottery";

/**
 * 二星直选
 *
 * @class TwoDirect
 * @extends {_WhilstLottery}
 */
export class TwoDirect extends _WhilstLottery {
    TypeName = "二星直选";

    constructor(type, type_compound) {
        super(type, type_compound);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof TwoDirect
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth: super.Random([0, 9], 1),
            fifth: super.Random([0, 9], 1)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -万位
     * @param {Array} selected.second   -千位
     * @param {Array} selected.third    -百位
     * @param {Array} selected.fourth    -十位
     * @param {Array} selected.fifth    -个位
     * @memberof TwoDirect
     */
    JettonCalc(selected) {
        if (selected) {
            return selected.fifth.length * selected.fourth.length;
        }
        return this.Selected.fifth.length * this.Selected.fourth.length;
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} [selected]         -已选项
     * @param {Array} selected.first    -万位
     * @param {Array} selected.second   -千位
     * @param {Array} selected.third    -百位
     * @param {Array} selected.fourth    -十位
     * @param {Array} selected.fifth    -个位
     * @memberof TwoDirect
     */
    AwardCalc() {
        return 98;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {Array} selected.first    -万位
     * @param {Array} selected.second   -千位
     * @param {Array} selected.third    -百位
     * @param {Array} selected.fourth    -十位
     * @param {Array} selected.fifth    -个位
     * @memberof TwoDirect
     */
    CompleteBall(selected) {
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
     * @memberof TwoDirect
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

    /**
     * 选择
     *
     * @param {string} item
     * @memberof TwoDirect
     */
    Select(item, type) {
        super.Select(item, type);
    }
}
