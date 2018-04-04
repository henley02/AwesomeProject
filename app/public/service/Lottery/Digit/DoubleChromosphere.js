import { Digit } from "./Digit";

/**
 * 双色球
 *
 * @export
 * @class DoubleChromosphere
 * @extends {Digit}
 */
export class DoubleChromosphere extends Digit {
    /**
     * 红球总数
     *
     * @memberof DoubleChromosphere
     */
    RED_COUNT = 33;

    /**
     * 蓝球总数
     *
     * @memberof DoubleChromosphere
     */
    BLUE_COUNT = 16;

    constructor() {
        super();
    }

    /**
     * 初始化双色球盘
     * 生成33个红球，16个蓝球
     * @param {Object} option -配置项
     * @returns
     * @memberof DoubleChromosphere
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
     * @memberof DoubleChromosphere
     */
    Random() {
        let red = super.Random([1, this.RED_COUNT], 6, { zeroize: true });
        let blue = super.Random([1, this.BLUE_COUNT], 1, { zeroize: true });
        return {
            red,
            blue
        };
    }

    /**
     * 双色球补全
     * 不足的补全，足够的保持不变
     * @param {Array} red   -已选红球
     * @param {Array} blue  -已选蓝球
     * @memberof DoubleChromosphere
     */
    CompleteBall(red, blue) {
        let completeRed =
            red.length > 5 ? red : red.concat(super.Random([1, this.RED_COUNT], 6 - red.length, { except: red, zeroize: true }));
        let completeBlue =
            blue.length > 1 ? blue : blue.concat(super.Random([1, this.BLUE_COUNT], 1 - blue.length, { except: blue, zeroize: true }));
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
     * @memberof DoubleChromosphere
     */
    JettonCalc(red, blue) {
        return super.Factorial(red, red - 5) / super.Factorial(6, 1) * blue;
    }

    /**
     * 获取玩法(单式、复式)
     *
     * @param {String[]} red
     * @param {String[]} blue
     * @memberof DoubleChromosphere
     */
    GetBetType(red, blue) {
        return red.length + blue.length > 7 ? [502, "复式"] : [501, "单式"];
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} list
     * @param {Object} list[].selected
     * @param {String[]} list[].selected.red
     * @param {String[]} list[].selected.blue
     * @returns
     * @memberof DoubleChromosphere
     */
    GetOrderString(list) {
        return list.map(m => {
            return {
                number: `${m.selected.red.join(" ")} + ${m.selected.blue.join(" ")}`,
                playid: this.GetBetType(m.selected.red, m.selected.blue)[0]
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
     * @memberof DoubleChromosphere
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
