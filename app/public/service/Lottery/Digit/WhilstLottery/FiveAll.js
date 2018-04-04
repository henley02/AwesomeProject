import { _WhilstLottery } from "./WhilstLottery";

/**
 * 五星通选
 *
 * @class FiveAll
 * @extends {_WhilstLottery}
 */
export class FiveAll extends _WhilstLottery {
    TypeName = "五星通选";

    constructor(type) {
        super(type);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof FiveAll
     */
    Random() {
        return {
            first: super.Random([0, 9], 1),
            second: super.Random([0, 9], 1),
            third: super.Random([0, 9], 1),
            fourth: super.Random([0, 9], 1),
            fifth: super.Random([0, 9], 1)
        };
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
     * @memberof FiveAll
     */
    JettonCalc() {
        let vs = Object.values(this.Selected).filter(m => m.length > 0).length;
        console.log(vs)
        return vs == 5 ? 1 : 0;
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
     * @memberof FiveAll
     */
    AwardCalc() {
        return 20000;
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
     * @memberof FiveAll
     */
    CompleteBall() {
        
        if (this.Selected.first.length < 1) {
            this.Selected.first = super.Random([0, 9], 1);
        }
        if (this.Selected.second.length < 1) {
            this.Selected.second = super.Random([0, 9], 1);
        }
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
     * @memberof FiveAll
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected);
    }

    /**
     * 选择
     * 
     * @param {object} item 
     * @param {string} item.num
     * @returns {string}
     * @memberof FiveAll
     */
    Select(item,type){
        let clickIndex = this.Selected[type].findIndex(m=>m==item);
        if (clickIndex > -1) {
            this.Selected[type].splice(clickIndex, 1);
        }else{
            this.Selected[type] = [].concat(item)
        }
    }
}