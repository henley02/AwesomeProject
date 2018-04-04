import { _WhilstLottery } from "./WhilstLottery";

/**
 * 任选一
 *
 * @class OptionalOne
 * @extends {_WhilstLottery}
 */
export class OptionalOne extends _WhilstLottery {
    TypeName = "任选一";

    constructor(type) {
        super(type);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof OptionalOne
     */
    Random() {
        let container = [];
        const tar = Math.round(Math.random() * 4);
        for (let i = 0; i < 5; i++) {
            if (i == tar) {
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
     * @memberof OptionalOne
     */
    JettonCalc() {
        return (
            this.Selected.first.length +
            this.Selected.second.length +
            this.Selected.third.length +
            this.Selected.fourth.length +
            this.Selected.fifth.length
        );
    }

    /**
     * 最高奖金计算
     *
     * @memberof OptionalOne
     */
    AwardCalc() {
        return 10;
    }

    /**
     * 补全一注
     *
     * @memberof OptionalOne
     */
    CompleteBall() {
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
     * @memberof OptionalOne
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
     * @memberof OptionalOne
     */
    Select(item, type) {
        let clickIndex = this.Selected[type].findIndex(m => m == item);
        let temp = {
            first: [], //万
            second: [], //千
            third: [], //百
            fourth: [], //十
            fifth: [] //个
        };
        if (clickIndex > -1) {
            this.Selected[type].splice(clickIndex, 1);
        } else {
            temp[type].push(item);
            this.Selected = temp;
        }
    }
}
