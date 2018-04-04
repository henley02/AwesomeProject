import { Digit } from "./Digit";

/**
 * 排列5
 *
 * @export
 * @class PermutationFive
 * @extends {Digit}
 */
export class PermutationFive extends Digit {
    /**
     * Creates an instance of PermutationFive.
     * @memberof PermutationFive
     */
    constructor(type) {
        super();
    }

    /**
     * 初始化球盘
     * 生成个十百位
     * @param {Object} option -配置项
     * @returns
     * @memberof PermutationFive
     */
    Init(option) {
        let myriabit = super.GenerateNumber(0, 9);
        let thousands = super.GenerateNumber(0, 9);
        let hundreds = super.GenerateNumber(0, 9);
        let tens = super.GenerateNumber(0, 9);
        let ones = super.GenerateNumber(0, 9);
        return {
            myriabit,
            thousands,
            hundreds,
            tens,
            ones
        };
    }

    /**
     * 机选
     *
     * @returns
     * @memberof PermutationFive
     */
    Random() {
        let myriabit = super.Random([0, 9], 1);
        let thousands = super.Random([0, 9], 1);
        let hundreds = super.Random([0, 9], 1);
        let tens = super.Random([0, 9], 1);
        let ones = super.Random([0, 9], 1);
        return {
            myriabit,
            thousands,
            hundreds,
            tens,
            ones
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} amount  -数量
     * @param {Number} amount.myriabit  -万位数量
     * @param {Number} amount.thousands  -千位数量
     * @param {Number} amount.hundreds  -百位数量
     * @param {Number} amount.tens  -十位数量
     * @param {Number} amount.ones  -个位数量
     * @returns
     * @memberof PermutationFive
     */
    JettonCalc(amount) {
        return amount.myriabit * amount.thousands * amount.hundreds * amount.tens * amount.ones;
    }

    /**
     * 获取方案字符串
     *
     * @memberof PermutationFive
     */
    GetSelectedString(selected) {
        return (
            selected.myriabit.join(" ") +
            "|" +
            selected.thousands.join(" ") +
            "|" +
            selected.hundreds.join(" ") +
            "|" +
            selected.tens.join(" ") +
            "|" +
            selected.ones.join(" ")
        );
    }

    /**
     * 获取玩法(单式、复式)
     *
     * @param {Object} selected  -数量
     * @param {Number} selected.myriabit  -万位数量
     * @param {Number} selected.thousands  -千位数量
     * @param {Number} selected.hundreds  -百位数量
     * @param {Number} selected.tens  -十位数量
     * @param {Number} selected.ones  -个位数量
     * @memberof PermutationFive
     */
    GetBetType(selected) {
        return selected.myriabit.length > 1 ||
            selected.thousands.length > 1 ||
            selected.hundreds.length > 1 ||
            selected.tens.length > 1 ||
            selected.ones.length > 1
            ? "复式投注"
            : "单式投注";
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} list
     * @param {Object} list[].selected
     * @param {String[]} list[].selected.myriabit
     * @param {String[]} list[].selected.thousands
     * @param {String[]} list[].selected.hundreds
     * @param {String[]} list[].selected.tens
     * @param {String[]} list[].selected.ones
     * @param {String} list[].playType
     * @returns
     * @memberof PermutationFive
     */
    GetOrderString(list) {
        return list.map(m => {
            let myriabit, thousands, hundreds, tens, ones, num;
            myriabit = m.selected.myriabit.length > 1 ? `(${m.selected.myriabit.join("")})` : m.selected.myriabit.join("");
            thousands = m.selected.thousands.length > 1 ? `(${m.selected.thousands.join("")})` : m.selected.thousands.join("");
            hundreds = m.selected.hundreds.length > 1 ? `(${m.selected.hundreds.join("")})` : m.selected.hundreds.join("");
            tens = m.selected.tens.length > 1 ? `(${m.selected.tens.join("")})` : m.selected.tens.join("");
            ones = m.selected.ones.length > 1 ? `(${m.selected.ones.join("")})` : m.selected.ones.join("");

            num = myriabit + thousands + hundreds + tens + ones;

            return {
                number: num,
                playid: m.playType
            };
        });
    }

    /**
     * 高亮中奖号码
     *
     * @param {string} selected
     * @param {string[]} result
     * @returns {object[]} res
     * @memberof PermutationFive
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";

        let res = [];

        if (result.length > 0) {
            res.push({ color: "", value: "(" });
            let t = selected.substring(1, selected.length - 1);
            t = t.split(")(");
            for (let index = 0; index < result.length; index++) {
                res = res.concat(
                    t[index].split("").map(m => {
                        return {
                            color: result[index] == m ? hightColor : "",
                            value: m
                        };
                    })
                );
                res.push({ color: "", value: index == result.length - 1 ? ")" : ")(" });
            }
        } else {
            for (let i = 0; i < selected.length; i++) {
                res.push({ color: "", value: selected[i] });
            }
        }

        return res;
    }
}

export const PermutationFivePlayTypeEnum = {
    /**
     * 单式
     */
    Single: 6401,
    /**
     * 复式
     */
    Compound: 6402
};
