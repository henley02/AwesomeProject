import { merge, is } from "public/utils/utils";

/**
 * 数字彩基类
 *
 * @export
 * @class Digit
 */
export class Digit {
    constructor() {}

    /**
     * 生成随机数组
     *
     * @param {Array} range     -范围， range[0]<=x<= range[1]
     * @param {Number} amount   -个数
     * @param {Object} option   -选项
     * @param {string[]|number[]} option.except   -排除数字
     * @param {Boolean} option.zeroize   -是否补零
     * @returns
     * @memberof Digit
     */
    Random(range, amount, option = {}) {
        let res = [],
            min = range[0],
            max = range[1],
            interval = range[1] - range[0],
            rand,
            num;
        for (let i = 0; i < amount; i++) {
            rand = Math.random();
            num = min + Math.round(rand * interval);
            if (option.zeroize) num = num < 10 ? "0" + num : num.toString();
            if (option.except && option.except.map(m => parseInt(m)).includes(parseInt(num))) {
                i--;
                continue;
            }
            if (res.join(" ").indexOf(num) > -1) {
                i--;
                continue;
            }
            res.push(num.toString());
        }
        return res;
    }

    /**
     * 指定值中取随机值
     *
     * @param {Array} range     -指定值
     * @param {Number} amount   -个数
     * @param {Object} option   -选项
     * @param {string[]|number[]} option.except   -排除数字
     * @returns
     * @memberof Digit
     */
    RandomIn(range, amount, option = {}) {
        let res = [],
            len = range.length - 1,
            rand,
            index;

        for (let i = 0; i < amount; i++) {
            rand = Math.random();
            index = Math.round(rand * len);
            if (option.except && option.except.includes(range[index])) {
                i--;
                continue;
            }
            if (res.includes(range[index])) {
                i--;
                continue;
            }
            res.push(range[index].toString());
        }
        return res;
    }

    /**
     * 从指定值开始按顺序生成N个数字
     *
     * @param {Number} start   -起始值
     * @param {Number} amount  -数量
     * @param {Object} option  -配置项
     * @param {Boolean} option.zeroize  -是否补零
     * @returns
     * @memberof Digit
     */
    GenerateNumber(start, amount, option = {}) {
        let res = [],
            num;

        for (let i = start; i <= amount; i++) {
            num = i < 10 && option.zeroize ? "0" + i : i.toString();

            res.push(num);
        }
        return res;
    }

    /**
     * 阶乘计算
     *
     * @param {Number} m
     * @param {Number} n
     * @returns
     * @memberof Digit
     */
    Factorial(m, n) {
        if (m == n) return m;
        return m * this.Factorial(m - 1, n);
    }

    /**
     * 组合
     *
     * @param {Number} m
     * @param {Number} n
     * @returns {Number}
     * @memberof Digit
     */
    Combination(m, n) {
        return this.Factorial(m, m - n + 1) / this.Factorial(n, 1);
    }

    /**
     * 补零
     * 个位前补零
     * @param {Number|Number[]|String|String[]} m
     * @returns {String|String[]}
     * @memberof Digit
     */
    Zeroize(m) {
        if (is.Array(m)) {
            return m.map(num => (num.toString().length < 2 ? "0" + num : num.toString()));
        }

        return num.toString().length < 2 ? "0" + m : m.toString();
    }
}
