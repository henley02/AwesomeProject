import { Digit } from "./Digit";

/**
 * 十一选五构造类
 * 
 * @class ElevenFive
 */
class ElevenFive {
    PlayTypeEnum = {};

    /**
     * Creates an instance of _ElevenFive.
     * @param {object} playTypeEnum
     * @param {PlayTypeEnum} playType
     * @memberof ElevenFive
     */
    constructor(playEnum, type) {
        this.PlayTypeEnum = playEnum;

        let map = {
            [this.PlayTypeEnum.OptionalTwo]: ElevenFiveOptionalTwo,
            [this.PlayTypeEnum.OptionalThree]: ElevenFiveOptionalThree,
            [this.PlayTypeEnum.OptionalFour]: ElevenFiveOptionalFour,
            [this.PlayTypeEnum.OptionalFive]: ElevenFiveOptionalFive,
            [this.PlayTypeEnum.OptionalSix]: ElevenFiveOptionalSix,
            [this.PlayTypeEnum.OptionalSeven]: ElevenFiveOptionalSeven,
            [this.PlayTypeEnum.OptionalEight]: ElevenFiveOptionalEight,
            [this.PlayTypeEnum.FrontOneDirect]: ElevenFiveFrontOneDirect,
            [this.PlayTypeEnum.FrontTwoDirect]: ElevenFiveFrontTwoDirect,
            [this.PlayTypeEnum.FrontTwoCombination]: ElevenFiveFrontTwoCombination,
            [this.PlayTypeEnum.FrontThreeDirect]: ElevenFiveFrontThreeDirect,
            [this.PlayTypeEnum.FrontThreeCombination]: ElevenFiveFrontThreeCombination
        };
        return new map[type](type);
    }
}

/**
 * 十一选五基类
 * 
 * @class _ElevenFive
 * @extends {Digit}
 */
class _ElevenFive extends Digit {
    /**
     * 十一选五玩法
     *
     * @memberof _ElevenFive
     */
    Type = null;

    /**
     * Creates an instance of _ElevenFive.
     * @param {PlayTypeEnum} type
     * @memberof _ElevenFive
     */
    constructor(type) {
        super();
        this.Type = type;
    }

    /**
     * 初始化球盘
     * 生成个第一位、第二位、第三位
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns
     * @memberof _ElevenFive
     */
    Init(option = {}) {
        let first = super.GenerateNumber(1, 11, { zeroize: true }).map(m => {
            return { num: m };
        });
        let second = super.GenerateNumber(1, 11, { zeroize: true }).map(m => {
            return { num: m };
        });
        let third = super.GenerateNumber(1, 11, { zeroize: true }).map(m => {
            return { num: m };
        });

        if (option.leaveout) {
            if (option.leaveout.first) {
                addLeaveout(first, "first");
            }
            if (option.leaveout.second) {
                addLeaveout(second, "second");
            }
            if (option.leaveout.third) {
                addLeaveout(third, "third");
            }
        }

        function addLeaveout(arr, type) {
            let leaveout;
            arr.forEach((item, index) => {
                leaveout = option.leaveout[type].find(m => m.num == item.num);
                item.leaveout = leaveout ? leaveout.count : "";
            });
        }

        return {
            first,
            second,
            third
        };
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof _ElevenFive
     */
    GetTypeName() {
        return TypeNameEnum[this.Type];
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} list
     * @param {Object} list[].selected
     * @param {String[]} list[].selected.first
     * @param {String[]} list[].selected.second
     * @param {String[]} list[].selected.third
     * @param {String} list[].playType
     * @returns
     * @memberof _ElevenFive
     */
    GetOrderString(list) {
        return list.map(m => {
            return {
                number:
                    m.selected.first.join(" ") +
                    (m.selected.second.length > 0 ? `|${m.selected.second.join(" ")}` : "") +
                    (m.selected.third.length > 0 ? `|${m.selected.third.join(" ")}` : ""),
                playid: m.playType
            };
        });
    }
}

/**
 * 十一选五-任选二
 *
 * @class ElevenFiveOptionalTwo
 * @extends {_ElevenFive}
 */
class ElevenFiveOptionalTwo extends _ElevenFive {
    Type = null;

    TypeName = "任选二";

    /**
     * Creates an instance of ElevenFiveOptionalTwo.
     * @param {PlayTypeEnum} type
     * @memberof ElevenFiveOptionalTwo
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveOptionalTwo
     */
    Random() {
        return {
            first: super.Random([1, 11], 2, { zeroize: true }),
            second: [],
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalTwo
     */
    JettonCalc(selected) {
        return super.Combination(selected.first.length, 2);
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalTwo
     */
    AwardCalc(selected) {
        return selected.first.length >= 2 ? super.Combination(selected.first.length > 5 ? 5 : selected.first.length, 2) * 6 : 0;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveOptionalTwo
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveOptionalTwo
     */
    CompleteBall(selected) {
        if (selected.first.length < 2) {
            selected.first = selected.first.concat(
                super.Random([1, 11], 2 - selected.first.length, { zeroize: true, except: selected.first })
            );
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveOptionalTwo
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        selected = selected.split(" ");

        return selected.map(m => {
            return {
                color: result.includes(m) ? hightColor : "",
                value: m
            };
        });
    }
}

/**
 * 十一选五-任选三
 *
 * @class ElevenFiveOptionalThree
 * @extends {_ElevenFive}
 */
class ElevenFiveOptionalThree extends _ElevenFive {
    Type = null;

    TypeName = "任选三";

    /**
     * Creates an instance of ElevenFiveOptionalThree.
     * @memberof ElevenFiveOptionalThree
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveOptionalThree
     */
    Random() {
        return {
            first: super.Random([1, 11], 3, { zeroize: true }),
            second: [],
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalThree
     */
    JettonCalc(selected) {
        return super.Combination(selected.first.length, 3);
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalThree
     */
    AwardCalc(selected) {
        return selected.first.length >= 3 ? super.Combination(selected.first.length > 5 ? 5 : selected.first.length, 3) * 19 : 0;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveOptionalThree
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveOptionalThree
     */
    CompleteBall(selected) {
        if (selected.first.length < 3) {
            selected.first = selected.first.concat(
                super.Random([1, 11], 3 - selected.first.length, { zeroize: true, except: selected.first })
            );
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveOptionalThree
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        selected = selected.split(" ");

        return selected.map(m => {
            return {
                color: result.includes(m) ? hightColor : "",
                value: m
            };
        });
    }
}

/**
 * 十一选五-任选四
 *
 * @class ElevenFiveOptionalFour
 * @extends {_ElevenFive}
 */
class ElevenFiveOptionalFour extends _ElevenFive {
    Type = null;

    TypeName = "任选四";

    /**
     * Creates an instance of ElevenFiveOptionalFour.
     * @memberof ElevenFiveOptionalFour
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveOptionalFour
     */
    Random() {
        return {
            first: super.Random([1, 11], 4, { zeroize: true }),
            second: [],
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalFour
     */
    JettonCalc(selected) {
        return super.Combination(selected.first.length, 4);
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalFour
     */
    AwardCalc(selected) {
        return selected.first.length >= 4 ? super.Combination(selected.first.length > 5 ? 5 : selected.first.length, 4) * 78 : 0;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveOptionalFour
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveOptionalFour
     */
    CompleteBall(selected) {
        if (selected.first.length < 4) {
            selected.first = selected.first.concat(
                super.Random([1, 11], 4 - selected.first.length, { zeroize: true, except: selected.first })
            );
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveOptionalFour
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        selected = selected.split(" ");

        return selected.map(m => {
            return {
                color: result.includes(m) ? hightColor : "",
                value: m
            };
        });
    }
}

/**
 * 十一选五-任选五
 *
 * @class ElevenFiveOptionalFive
 * @extends {_ElevenFive}
 */
class ElevenFiveOptionalFive extends _ElevenFive {
    Type = null;

    TypeName = "任选五";

    /**
     * Creates an instance of ElevenFiveOptionalFive.
     * @memberof ElevenFiveOptionalFive
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveOptionalFive
     */
    Random() {
        return {
            first: super.Random([1, 11], 5, { zeroize: true }),
            second: [],
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalFive
     */
    JettonCalc(selected) {
        return super.Combination(selected.first.length, 5);
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalFive
     */
    AwardCalc(selected) {
        return selected.first.length >= 5 ? super.Combination(selected.first.length > 5 ? 5 : selected.first.length, 5) * 540 : 0;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveOptionalFive
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveOptionalFive
     */
    CompleteBall(selected) {
        if (selected.first.length < 5) {
            selected.first = selected.first.concat(
                super.Random([1, 11], 5 - selected.first.length, { zeroize: true, except: selected.first })
            );
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveOptionalFive
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        selected = selected.split(" ");

        return selected.map(m => {
            return {
                color: result.includes(m) ? hightColor : "",
                value: m
            };
        });
    }
}

/**
 * 十一选五-任选六
 *
 * @class ElevenFiveOptionalSix
 * @extends {_ElevenFive}
 */
class ElevenFiveOptionalSix extends _ElevenFive {
    Type = null;

    TypeName = "任选六";

    /**
     * Creates an instance of ElevenFiveOptionalSix.
     * @memberof ElevenFiveOptionalSix
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveOptionalSix
     */
    Random() {
        return {
            first: super.Random([1, 11], 6, { zeroize: true }),
            second: [],
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalSix
     */
    JettonCalc(selected) {
        return super.Combination(selected.first.length, 6);
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalSix
     */
    AwardCalc(selected) {
        return selected.first.length >= 6 ? (selected.first.length - 5) * 90 : 0;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveOptionalSix
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveOptionalSix
     */
    CompleteBall(selected) {
        if (selected.first.length < 6) {
            selected.first = selected.first.concat(
                super.Random([1, 11], 6 - selected.first.length, { zeroize: true, except: selected.first })
            );
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveOptionalSix
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        selected = selected.split(" ");

        return selected.map(m => {
            return {
                color: result.includes(m) ? hightColor : "",
                value: m
            };
        });
    }
}

/**
 * 十一选五-任选七
 *
 * @class ElevenFiveOptionalSeven
 * @extends {_ElevenFive}
 */
class ElevenFiveOptionalSeven extends _ElevenFive {
    Type = null;

    TypeName = "任选七";

    /**
     * Creates an instance of ElevenFiveOptionalSeven.
     * @memberof ElevenFiveOptionalSeven
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveOptionalSeven
     */
    Random() {
        return {
            first: super.Random([1, 11], 7, { zeroize: true }),
            second: [],
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalSeven
     */
    JettonCalc(selected) {
        return super.Combination(selected.first.length, 7);
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalSeven
     */
    AwardCalc(selected) {
        return selected.first.length >= 7 ? (selected.first.length - 6) * (selected.first.length - 5) / 2 * 26 : 0;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveOptionalSeven
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveOptionalSeven
     */
    CompleteBall(selected) {
        if (selected.first.length < 7) {
            selected.first = selected.first.concat(
                super.Random([1, 11], 7 - selected.first.length, { zeroize: true, except: selected.first })
            );
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveOptionalSeven
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        selected = selected.split(" ");

        return selected.map(m => {
            return {
                color: result.includes(m) ? hightColor : "",
                value: m
            };
        });
    }
}

/**
 * 十一选五-任选八
 *
 * @class ElevenFiveOptionalEight
 * @extends {_ElevenFive}
 */
class ElevenFiveOptionalEight extends _ElevenFive {
    Type = null;

    TypeName = "任选八";

    /**
     * Creates an instance of ElevenFiveOptionalEight.
     * @memberof ElevenFiveOptionalEight
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveOptionalEight
     */
    Random() {
        return {
            first: super.Random([1, 11], 8, { zeroize: true }),
            second: [],
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalEight
     */
    JettonCalc(selected) {
        return super.Combination(selected.first.length, 8);
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveOptionalEight
     */
    AwardCalc(selected) {
        return selected.first.length >= 8
            ? (selected.first.length - 7) * (selected.first.length - 6) * (selected.first.length - 5) / 6 * 9
            : 0;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveOptionalEight
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveOptionalEight
     */
    CompleteBall(selected) {
        if (selected.first.length < 8) {
            selected.first = selected.first.concat(
                super.Random([1, 11], 8 - selected.first.length, { zeroize: true, except: selected.first })
            );
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveOptionalEight
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        selected = selected.split(" ");

        return selected.map(m => {
            return {
                color: result.includes(m) ? hightColor : "",
                value: m
            };
        });
    }
}

/**
 * 十一选五-前一直选
 *
 * @class ElevenFiveFrontOneDirect
 * @extends {_ElevenFive}
 */
class ElevenFiveFrontOneDirect extends _ElevenFive {
    Type = null;

    TypeName = "前一直选";

    /**
     * Creates an instance of ElevenFiveFrontOneDirect.
     * @memberof ElevenFiveFrontOneDirect
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveFrontOneDirect
     */
    Random() {
        return {
            first: super.Random([1, 11], 1, { zeroize: true }),
            second: [],
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveFrontOneDirect
     */
    JettonCalc(selected) {
        return selected.first.length;
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveFrontOneDirect
     */
    AwardCalc(selected) {
        return 13;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveFrontOneDirect
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveFrontOneDirect
     */
    CompleteBall(selected) {
        if (selected.first.length < 1) {
            selected.first = super.Random([1, 11], 1, { zeroize: true });
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveFrontOneDirect
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        selected = selected.split(" ");

        return selected.map(m => {
            return {
                color: result[0] == m ? hightColor : "",
                value: m
            };
        });
    }
}

/**
 * 十一选五-前二直选
 *
 * @class ElevenFiveFrontTwoDirect
 * @extends {_ElevenFive}
 */
class ElevenFiveFrontTwoDirect extends _ElevenFive {
    Type = null;

    TypeName = "前二直选";

    /**
     * Creates an instance of ElevenFiveFrontTwoDirect.
     * @memberof ElevenFiveFrontTwoDirect
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveFrontTwoDirect
     */
    Random() {
        let first = super.Random([1, 11], 1, { zeroize: true });
        let second = super.Random([1, 11], 1, { zeroize: true, except: first });
        return {
            first,
            second,
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveFrontTwoDirect
     */
    JettonCalc(selected) {
        return selected.first.length * selected.second.length;
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveFrontTwoDirect
     */
    AwardCalc(selected) {
        return 130;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveFrontTwoDirect
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveFrontTwoDirect
     */
    CompleteBall(selected) {
        if (selected.first.length == 0) {
            selected.first = super.Random([1, 11], 1, { zeroize: true, except: selected.second });
        }
        if (selected.second.length == 0) {
            selected.second = super.Random([1, 11], 1, { zeroize: true, except: selected.first });
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveFrontTwoDirect
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        let arr = selected.split("|");
        let res = [];
        if (arr.length > 0) {
            arr.forEach((o, i) => {
                let a = o.split(" ").sort((a, b) => Number(a) - Number(b));
                a.forEach((oo, ii) => {
                    res.push({
                        color: oo == result[i] ? hightColor : "",
                        value: oo
                    });
                });
                if (i < arr.length - 1) {
                    res.push({
                        color: "",
                        value: "|"
                    });
                }
            });
        }
        return res;
    }
}

/**
 * 十一选五-前二组选
 *
 * @class ElevenFiveFrontTwoCombination
 * @extends {_ElevenFive}
 */
class ElevenFiveFrontTwoCombination extends _ElevenFive {
    Type = null;

    TypeName = "前二组选";

    /**
     * Creates an instance of ElevenFiveFrontTwoCombination.
     * @memberof ElevenFiveFrontTwoCombination
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveFrontTwoCombination
     */
    Random() {
        return {
            first: super.Random([1, 11], 2, { zeroize: true }),
            second: [],
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveFrontTwoCombination
     */
    JettonCalc(selected) {
        return super.Combination(selected.first.length, 2);
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveFrontTwoCombination
     */
    AwardCalc(selected) {
        return selected.first.length >= 2 ? 65 : 0;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveFrontTwoCombination
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveFrontTwoCombination
     */
    CompleteBall(selected) {
        if (selected.first.length < 2) {
            selected.first = selected.first.concat(
                super.Random([1, 11], 2 - selected.first.length, { zeroize: true, except: selected.first })
            );
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveFrontTwoCombination
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        selected = selected.split(" ");
        let res = [];
        if (selected.indexOf(result[0]) > -1 || selected.indexOf(result[1]) > -1) {
            res = selected.map(m => {
                return {
                    color: m == result[0] || result[1] == m ? hightColor : "",
                    value: m
                };
            });
        } else {
            res = selected.map(m => {
                return {
                    color: "",
                    value: m
                };
            });
        }
        return res;
    }
}

/**
 * 十一选五-前三直选
 *
 * @class ElevenFiveFrontThreeDirect
 * @extends {_ElevenFive}
 */
class ElevenFiveFrontThreeDirect extends _ElevenFive {
    Type = null;

    TypeName = "前三直选";

    /**
     * Creates an instance of ElevenFiveFrontThreeDirect.
     * @memberof ElevenFiveFrontThreeDirect
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveFrontThreeDirect
     */
    Random() {
        let first = super.Random([1, 11], 1, { zeroize: true });
        let second = super.Random([1, 11], 1, { zeroize: true, except: first });
        let third = super.Random([1, 11], 1, { zeroize: true, except: first.concat(second) });
        return {
            first,
            second,
            third
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveFrontThreeDirect
     */
    JettonCalc(selected) {
        return selected.first.length * selected.second.length * selected.third.length;
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveFrontThreeDirect
     */
    AwardCalc(selected) {
        return 1170;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveFrontThreeDirect
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveFrontThreeDirect
     */
    CompleteBall(selected) {
        if (selected.first.length == 0) {
            selected.first = super.Random([1, 11], 1, { zeroize: true, except: selected.second.concat(selected.third) });
        }
        if (selected.second.length == 0) {
            selected.second = super.Random([1, 11], 1, { zeroize: true, except: selected.first.concat(selected.third) });
        }
        if (selected.third.length == 0) {
            selected.third = super.Random([1, 11], 1, { zeroize: true, except: selected.first.concat(selected.second) });
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveFrontThreeDirect
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        let arr = selected.split("|");
        let res = [];
        if (arr.length > 0) {
            arr.forEach((o, i) => {
                let a = o.split(" ").sort((a, b) => Number(a) - Number(b));
                a.forEach((oo, ii) => {
                    res.push({
                        color: oo == result[i] ? hightColor : "",
                        value: oo
                    });
                });
                if (i < arr.length - 1) {
                    res.push({
                        color: "",
                        value: "|"
                    });
                }
            });
        }
        return res;
    }
}

/**
 * 十一选五-前三组选
 *
 * @class ElevenFiveFrontThreeCombination
 * @extends {_ElevenFive}
 */
class ElevenFiveFrontThreeCombination extends _ElevenFive {
    Type = null;

    TypeName = "前三组选";

    /**
     * Creates an instance of ElevenFiveFrontThreeCombination.
     * @memberof ElevenFiveFrontThreeCombination
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ElevenFiveFrontThreeCombination
     */
    Random() {
        return {
            first: super.Random([1, 11], 3, { zeroize: true }),
            second: [],
            third: []
        };
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveFrontThreeCombination
     */
    JettonCalc(selected) {
        return super.Combination(selected.first.length, 3);
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ElevenFiveFrontThreeCombination
     */
    AwardCalc(selected) {
        return selected.first.length >= 3 ? 195 : 0;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof ElevenFiveFrontThreeCombination
     */
    GetTypeName() {
        return this.TypeName;
    }

    /**
     * 补全一注
     *
     * @param {object} selected         -已选项
     * @param {string[]} selected.first    -第一位
     * @param {string[]} selected.second   -第二位
     * @param {string[]} selected.third    -第三位
     * @memberof ElevenFiveFrontThreeCombination
     */
    CompleteBall(selected) {
        if (selected.first.length < 3) {
            selected.first = selected.first.concat(
                super.Random([1, 11], 3 - selected.first.length, { zeroize: true, except: selected.first })
            );
        }
        return selected;
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {any} result
     * @returns {object[]} res
     * @memberof ElevenFiveFrontThreeCombination
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";
        selected = selected.split(" ");
        let res = [];

        if (selected.indexOf(result[0]) > -1 || selected.indexOf(result[1]) > -1 || selected.indexOf(result[2]) > -1) {
            res = selected.map(m => {
                return {
                    color: m == result[0] || result[1] == m || result[2] == m ? hightColor : "",
                    value: m
                };
            });
        } else {
            res = selected.map(m => {
                return {
                    color: "",
                    value: m
                };
            });
        }
        return res;
    }
}

/**
 * 十一选五玩法枚举
 */
export const ElevenFiveTypeEnum = {
    /**
     * 任选二
     */
    OptionalTwo: "02",
    /**
     * 任选三
     */
    OptionalThree: "03",
    /**
     * 任选四
     */
    OptionalFour: "04",
    /**
     * 任选五
     */
    OptionalFive: "05",
    /**
     * 任选六
     */
    OptionalSix: "06",
    /**
     * 任选七
     */
    OptionalSeven: "07",
    /**
     * 任选八
     */
    OptionalEight: "08",
    /**
     * 前一直选
     */
    FrontOneDirect: "01",
    /**
     * 前二直选
     */
    FrontTwoDirect: "09",
    /**
     * 前二组选
     */
    FrontTwoCombination: "11",
    /**
     * 前三直选
     */
    FrontThreeDirect: "10",
    /**
     * 前三组选
     */
    FrontThreeCombination: "12"
};

/**
 * 十一选五玩法名称
 */
export const TypeNameEnum = {
    [ElevenFiveTypeEnum.OptionalTwo]: "任选二",
    [ElevenFiveTypeEnum.OptionalThree]: "任选三",
    [ElevenFiveTypeEnum.OptionalFour]: "任选四",
    [ElevenFiveTypeEnum.OptionalFive]: "任选五",
    [ElevenFiveTypeEnum.OptionalSix]: "任选六",
    [ElevenFiveTypeEnum.OptionalSeven]: "任选七",
    [ElevenFiveTypeEnum.OptionalEight]: "任选八",
    [ElevenFiveTypeEnum.FrontOneDirect]: "前一直选",
    [ElevenFiveTypeEnum.FrontTwoDirect]: "前二直选",
    [ElevenFiveTypeEnum.FrontTwoCombination]: "前二组选",
    [ElevenFiveTypeEnum.FrontThreeDirect]: "前三直选",
    [ElevenFiveTypeEnum.FrontThreeCombination]: "前三组选"
};

/**
 * 各玩法中奖示例
 */
export const WinExample = {
    [ElevenFiveTypeEnum.OptionalTwo]: {
        name: "任选二",
        result: ["03", "01", "02", "09", "08"],
        win: ["01", "02"],
        loss: ["02", "04"]
    },
    [ElevenFiveTypeEnum.OptionalThree]: {
        name: "任选三",
        result: ["03", "01", "02", "09", "08"],
        win: ["01", "02", "03"],
        loss: ["01", "02", "04"]
    },
    [ElevenFiveTypeEnum.OptionalFour]: {
        name: "任选四",
        result: ["03", "01", "02", "09", "08"],
        win: ["01", "02", "03", "08"],
        loss: ["01", "02", "03", "04"]
    },
    [ElevenFiveTypeEnum.OptionalFive]: {
        name: "任选五",
        result: ["03", "01", "02", "09", "08"],
        win: ["01", "02", "03", "08", "09"],
        loss: ["01", "02", "03", "04", "05"]
    },
    [ElevenFiveTypeEnum.OptionalSix]: {
        name: "任选六",
        result: ["03", "01", "02", "09", "08"],
        win: ["01", "02", "03", "04", "08", "09"],
        loss: ["01", "02", "03", "04", "05", "08"]
    },
    [ElevenFiveTypeEnum.OptionalSeven]: {
        name: "任选七",
        result: ["03", "01", "02", "09", "08"],
        win: ["01", "02", "03", "04", "05", "08", "09"],
        loss: ["02", "03", "04", "05", "08", "10", "11"]
    },
    [ElevenFiveTypeEnum.OptionalEight]: {
        name: "任选八",
        result: ["03", "01", "02", "09", "08"],
        win: ["01", "02", "03", "04", "05", "08", "09", "10"],
        loss: ["01", "02", "03", "04", "05", "06", "07", "08"]
    },
    [ElevenFiveTypeEnum.FrontOneDirect]: {
        name: "前一直选",
        result: ["03", "01", "02", "09", "08"],
        win: ["03"],
        loss: ["01"]
    },
    [ElevenFiveTypeEnum.FrontTwoDirect]: {
        name: "前二直选",
        result: ["03", "01", "02", "09", "08"],
        win: ["03", "01"],
        loss: ["01", "02"]
    },
    [ElevenFiveTypeEnum.FrontTwoCombination]: {
        name: "前二组选",
        result: ["03", "01", "02", "09", "08"],
        win: ["01", "03"],
        loss: ["01", "02"]
    },
    [ElevenFiveTypeEnum.FrontThreeDirect]: {
        name: "前三直选",
        result: ["03", "01", "02", "09", "08"],
        win: ["03", "01", "02"],
        loss: ["01", "02", "03"]
    },
    [ElevenFiveTypeEnum.FrontThreeCombination]: {
        name: "前三组选",
        result: ["03", "01", "02", "09", "08"],
        win: ["01", "02", "03"],
        loss: ["01", "02", "08"]
    }
};

/**
 * 山东11选5
 *
 * @export
 * @class SDElevenFive
 */
export class SDElevenFive {
    static PlayTypeEnum = {
        /**
         * 任选二
         */
        OptionalTwo: 6202,
        /**
         * 任选三
         */
        OptionalThree: 6203,
        /**
         * 任选四
         */
        OptionalFour: 6204,
        /**
         * 任选五
         */
        OptionalFive: 6205,
        /**
         * 任选六
         */
        OptionalSix: 6206,
        /**
         * 任选七
         */
        OptionalSeven: 6207,
        /**
         * 任选八
         */
        OptionalEight: 6208,
        /**
         * 前一直选
         */
        FrontOneDirect: 6201,
        /**
         * 前二直选
         */
        FrontTwoDirect: 6209,
        /**
         * 前二组选
         */
        FrontTwoCombination: 6211,
        /**
         * 前三直选
         */
        FrontThreeDirect: 6210,
        /**
         * 前三组选
         */
        FrontThreeCombination: 6212
    };

    constructor(type) {
        return new ElevenFive(SDElevenFive.PlayTypeEnum, type);
    }
}

/**
 * 广东（幸运）11选5
 *
 * @export
 * @class GDElevenFive
 */
export class GDElevenFive {
    static PlayTypeEnum = {
        /**
         * 任选二
         */
        OptionalTwo: 7202,
        /**
         * 任选三
         */
        OptionalThree: 7203,
        /**
         * 任选四
         */
        OptionalFour: 7204,
        /**
         * 任选五
         */
        OptionalFive: 7205,
        /**
         * 任选六
         */
        OptionalSix: 7206,
        /**
         * 任选七
         */
        OptionalSeven: 7207,
        /**
         * 任选八
         */
        OptionalEight: 7208,
        /**
         * 前一直选
         */
        FrontOneDirect: 7201,
        /**
         * 前二直选
         */
        FrontTwoDirect: 7209,
        /**
         * 前二组选
         */
        FrontTwoCombination: 7211,
        /**
         * 前三直选
         */
        FrontThreeDirect: 7210,
        /**
         * 前三组选
         */
        FrontThreeCombination: 7212
    };

    constructor(type) {
        return new ElevenFive(GDElevenFive.PlayTypeEnum, type);
    }
}

/**
 * 新疆（欢乐）11选5
 *
 * @export
 * @class XJElevenFive
 */
export class XJElevenFive {
    static PlayTypeEnum = {
        /**
         * 任选二
         */
        OptionalTwo: 7402,
        /**
         * 任选三
         */
        OptionalThree: 7403,
        /**
         * 任选四
         */
        OptionalFour: 7404,
        /**
         * 任选五
         */
        OptionalFive: 7405,
        /**
         * 任选六
         */
        OptionalSix: 7406,
        /**
         * 任选七
         */
        OptionalSeven: 7407,
        /**
         * 任选八
         */
        OptionalEight: 7408,
        /**
         * 前一直选
         */
        FrontOneDirect: 7401,
        /**
         * 前二直选
         */
        FrontTwoDirect: 7409,
        /**
         * 前二组选
         */
        FrontTwoCombination: 7411,
        /**
         * 前三直选
         */
        FrontThreeDirect: 7410,
        /**
         * 前三组选
         */
        FrontThreeCombination: 7412
    };

    constructor(type) {
        return new ElevenFive(XJElevenFive.PlayTypeEnum, type);
    }
}

/**
 * 湖北（好运）11选5
 *
 * @export
 * @class HYElevenFive
 */
export class HBElevenFive {
    static PlayTypeEnum = {
        /**
         * 任选二
         */
        OptionalTwo: 7802,
        /**
         * 任选三
         */
        OptionalThree: 7803,
        /**
         * 任选四
         */
        OptionalFour: 7804,
        /**
         * 任选五
         */
        OptionalFive: 7805,
        /**
         * 任选六
         */
        OptionalSix: 7806,
        /**
         * 任选七
         */
        OptionalSeven: 7807,
        /**
         * 任选八
         */
        OptionalEight: 7808,
        /**
         * 前一直选
         */
        FrontOneDirect: 7801,
        /**
         * 前二直选
         */
        FrontTwoDirect: 7809,
        /**
         * 前二组选
         */
        FrontTwoCombination: 7811,
        /**
         * 前三直选
         */
        FrontThreeDirect: 7810,
        /**
         * 前三组选
         */
        FrontThreeCombination: 7812
    };

    constructor(type) {
        return new ElevenFive(HBElevenFive.PlayTypeEnum, type);
    }
}
