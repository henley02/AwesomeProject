import { _WhilstLottery } from "./WhilstLottery";

/**
 * 一星直选
 *
 * @class OneDirect
 * @extends {_WhilstLottery}
 */
export class OneDirect extends _WhilstLottery {
    TypeName = "一星直选";

    constructor(type) {
        super(type);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof OneDirect
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth: [],
            fifth: super.Random([0, 9], 1)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof OneDirect
     */
    JettonCalc() {
        return this.Selected.fifth.length;
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
     * @memberof OneDirect
     */
    AwardCalc(selected) {
        return 10;
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
     * @memberof OneDirect
     */
    CompleteBall(selected) {
        if (this.JettonCalc() < 1) {
            this.Selected = this.Random();
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
     * @memberof OneDirect
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected, "", ",");
    }

    /**
     * 选择
     * 
     * @param {string} item 
     * @returns {string}
     * @memberof OneDirect
     */
    Select(item){
        let clickIndex = this.Selected.fifth.findIndex(m=>m==item);
        if (clickIndex > -1) {
            this.Selected.fifth.splice(clickIndex, 1);
        }else{
            this.Selected.fifth = [].concat(item)
        }
    }
}
