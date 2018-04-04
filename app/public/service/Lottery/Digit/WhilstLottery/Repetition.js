import { _WhilstLottery } from "./WhilstLottery";

/**
 * 复选
 *
 * @class Repetition
 * @extends {_WhilstLottery}
 */
export class Repetition extends _WhilstLottery {
    TypeName = "复选";

    constructor(type) {
        super(type);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof Repetition
     */
    Random() {
        throw Error("复式玩法不支持机选");
    }

    /**
     * 计算注数
     *
     * @returns {number} 注数
     * @memberof Repetition
     */
    JettonCalc() {
        let vs = Object.values(this.Selected).filter(m => m.length > 0);
        return vs.length;
    }

    /**
     * 最高奖金计算
     *
     * @memberof Repetition
     */
    AwardCalc() {
        let jetton = this.JettonCalc(this.Selected);
        return jetton > 0 ? 98 * Math.pow(10, jetton - 2) : 0;
    }

    /**
     * 补全一注
     *
     * @memberof Repetition
     */
    CompleteBall() {
        throw Error("复式玩法不支持补全");
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
     * @memberof Repetition
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected);
    }
}