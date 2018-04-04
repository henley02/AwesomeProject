import { Digit } from "./Digit";

/**
 *  大乐透
 *
 * @export
 * @class SuperEnalotto
 * @extends {Digit}
 */
export class SuperEnalotto extends Digit {
    /**
     * 红球总数
     *
     * @memberof SuperEnalotto
     */
    RED_COUNT = 35;

    /**
     * 蓝球总数
     *
     * @memberof SuperEnalotto
     */
    BLUE_COUNT = 12;

    constructor() {
        super();
    }

    /**
     * 初始化大乐透球盘
     * 生成35个红球，12个蓝球
     * @param {Object} option -配置项
     * @returns
     * @memberof SuperEnalotto
     */
    Init(option) {
        let red = super.GenerateNumber(1, this.RED_COUNT, { zeroize: true });
        let blue = super.GenerateNumber(1, this.BLUE_COUNT, { zeroize: true });
        return {
            red,
            blue
        };
    }

    /**
     * 机选
     *
     * @returns
     * @memberof SuperEnalotto
     */
    Random() {
        let red = super.Random([1, this.RED_COUNT], 5, { zeroize: true });
        let blue = super.Random([1, this.BLUE_COUNT], 2, { zeroize: true });
        return {
            red,
            blue
        };
    }

    /**
     * 大乐透补全
     * 不足的补全，足够的保持不变
     * @param {String[]} red   -已选红球
     * @param {String[]} blue  -已选蓝球
     * @memberof SuperEnalotto
     */
    CompleteBall(red, blue) {
        let completeRed =
            red.length > 4 ? red : red.concat(super.Random([1, this.RED_COUNT], 5 - red.length, { except: red, zeroize: true }));
        let completeBlue =
            blue.length > 2 ? blue : blue.concat(super.Random([1, this.BLUE_COUNT], 2 - blue.length, { except: blue, zeroize: true }));
        return {
            red: completeRed,
            blue: completeBlue
        };
    }

    /**
     * 计算注数
     *
     * @param {Number} red  -红球数
     * @param {Number} blue -蓝球数
     * @returns
     * @memberof SuperEnalotto
     */
    JettonCalc(red, blue) {
        return super.Factorial(red, red - 4) / super.Factorial(5, 1) * (super.Factorial(blue, blue - 1) / super.Factorial(2, 1));
    }

    /**
     * 获取玩法(单式、复式)
     *
     * @param {Number} red
     * @param {Number} blue
     * @param {Boolean} addition 是否追加
     * @memberof SuperEnalotto
     */
    GetPlayType(red, blue, addition = false) {
        return red.length + blue.length > 7 ? [addition ? 3904 : 3902, "复式"] : [addition ? 3903 : 3901, "单式"];
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} list
     * @param {Object} list[].selected
     * @param {String[]} list[].selected.red
     * @param {String[]} list[].selected.blue
     * @param {boolean} [isAddition=false]
     * @returns
     * @memberof SuperEnalotto
     */
    GetOrderString(list, isAddition = false) {
        return list.map(m => {
            return {
                number: `${m.selected.red.join(" ")} + ${m.selected.blue.join(" ")}`,
                playid: this.GetPlayType(m.selected.red, m.selected.blue, isAddition)[0]
            };
        });
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {object} result
     * @param {string[]} result.red
     * @param {string[]} result.blue
     * @returns {object[]} res
     * @memberof SuperEnalotto
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";

        let red = selected.split(" + ")[0].split(" ");
        let blue = selected.split(" + ")[1].split(" ");

        let res = [];

        res = red.map(m => {
            return {
                color: result.red.includes(m) ? hightColor : "",
                value: m
            };
        });

        res.push({
            color: "",
            value: "+"
        });

        res = res.concat(
            blue.map(m => {
                return {
                    color: result.blue.includes(m) ? hightColor : "",
                    value: m
                };
            })
        );
        return res;
    }
}
