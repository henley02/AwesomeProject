import { _WhilstLottery } from "./WhilstLottery";

/**
 * 任选二
 *
 * @class OptionalTwo
 * @extends {_WhilstLottery}
 */
export class OptionalTwo extends _WhilstLottery {
    TypeName = "任选二";

    constructor(type) {
        super(type);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof OptionalTwo
     */
    Random() {
        let container = [];
        const tar = super.RandomIn([0, 1, 2, 3], 2);
        for (let i = 0; i < 5; i++) {
            if (i == tar[0]) {
                container.push(super.Random([0, 9], 1));
            } else if (i == tar[1]) {
                container.push(super.Random([0, 9], 1));
            } else {
                container.push([]);
            }
        }

        this.Selected = {
            first: container[0],
            second: container[1],
            third: container[2],
            fourth: container[3],
            fifth: container[4]
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof OptionalTwo
     */
    JettonCalc() {
        let t = Object.values(this.Selected).filter(m => m.length > 0);
        return t.length > 1 ? 1 : 0;
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
     * @memberof OptionalTwo
     */
    AwardCalc(selected) {
        return 98;
    }

    /**
     * 补全一注
     *
     * @memberof OptionalTwo
     */
    CompleteBall() {
        let t = Object.entries(this.Selected).filter(m => m.length > 0);
        let count = Object.values(this.Selected).filter(m => m.length > 0).length;
        if (count < 2) {
            let key = t[0][0];
            let val = t[0][1];

            let ext = super.RandomIn(["first", "second", "third", "fourth", "fifth"], 2 - count, { except: key });
            ext.forEach(m => {
                this.Selected[m] = super.Random([0, 9], 1);
            });
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
     * @memberof OptionalTwo
     */
    GetOrderString(selected) {
        return selected.map(m => {
            return {
                number: Object.values(m.selected)
                    .map(s => (s.length > 0 ? s.join("") : "#"))
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
     * @memberof OptionalTwo
     */
    Select(item, type) {
        let clickIndex = this.Selected[type].findIndex(m => m == item);

        if (clickIndex > -1) {
            //点击已选的则取消选择
            this.Selected[type].splice(clickIndex, 1);
        } else {
            if (this.Selected[type].length > 0) {
                //一栏只能选择一个
                this.Selected[type] = [].concat(item);
            } else {
                if (Object.values(this.Selected).filter(m => m.length > 0).length > 1) {
                    return "最多选择两个号码";
                } else {
                    this.Selected[type] = [].concat(item);
                }
            }
        }
    }
}
