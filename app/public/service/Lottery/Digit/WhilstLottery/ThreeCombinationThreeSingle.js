import { _WhilstLottery } from "./WhilstLottery";

/**
 * 三星组三单式
 *
 * @class ThreeCombinationThreeSingle
 * @extends {_WhilstLottery}
 */
export class ThreeCombinationThreeSingle extends _WhilstLottery {
    TypeName = "三星组三单式";

    constructor(type) {
        super(type);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof ThreeCombinationThreeSingle
     */
    Random() {
        let fourth = super.Random([0, 9], 1);
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth,
            fifth: super.Random([0, 9], 1, { except: fourth })
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof ThreeCombinationThreeSingle
     */
    JettonCalc() {
        return this.Selected.fourth.length > 0 && this.Selected.fifth.length > 0 ? 1 : 0;
    }

    /**
     * 最高奖金计算
     *
     * @memberof ThreeCombinationThreeSingle
     */
    AwardCalc(selected) {
        return 320;
    }

    /**
     * 补全一注
     *
     * @memberof ThreeCombinationThreeSingle
     */
    CompleteBall() {
        if (this.Selected.fourth.length < 1) {
            this.Selected.fourth = super.Random([0, 9], 1, { except: this.Selected.fifth });
        }
        if (this.Selected.fifth.length < 1) {
            this.Selected.fifth = super.Random([0, 9], 1, { except: this.Selected.fourth });
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
     * @memberof ThreeCombinationThreeSingle
     */
    GetOrderString(selected) {
        return selected.map(m => {
            return {
                number: m.selected.fourth[0].repeat(2) + m.selected.fifth[0],
                playid: m.playType
            };
        });
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof ThreeCombinationThreeSingle
     */
    Select(item, type) {
        let clickIndex = this.Selected[type].findIndex(m => m == item);

        if (clickIndex > -1) {
            //点击已选的则取消选择
            this.Selected[type].splice(clickIndex, 1);
        } else {
            Object.entries(this.Selected).forEach(m => {
                let i = m[1].indexOf(item);
                if (i > -1) {
                    this.Selected[m[0]].splice(i, 1);
                }
            });
            if (this.Selected[type].length > 0) {
                //一栏只能选择一个
                this.Selected[type] = [].concat(item);
            } else {
                this.Selected[type] = [].concat(item);
            }
        }
    }
}
