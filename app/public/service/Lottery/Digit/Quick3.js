import { Digit } from "./Digit";

/**
 * 快三
 * 
 * @class Quick3
 * @extends {Digit}
 */
class Quick3 extends Digit {
    /**
     * 快三玩法
     *
     * @memberof Quick3
     */
    Type = null;

    PlayTypeEnum = {};

    Quick3TypeNameEnum = {};

    /**
     * Creates an instance of Quick3.
     * @param {PlayTypeEnum} playType
     * @param {object} playTypeEnum
     * @memberof Quick3
     */
    constructor(playTypeEnum, playType) {
        super();
        this.PlayTypeEnum = playTypeEnum;
        this.Quick3TypeNameEnum = {
            [playTypeEnum.Sum]: "和值",
            [playTypeEnum.ThreeSameAll]: "三同号通选",
            [playTypeEnum.ThreeSameSingle]: "三同号单选",
            [playTypeEnum.ThreeDiverse]: "三不同号",
            [playTypeEnum.ThreeContinuityAll]: "三连号通选",
            [playTypeEnum.TwoSameCompound]: "二同号复选",
            [playTypeEnum.TwoSameSingle]: "二同号单选",
            [playTypeEnum.TwoDiverseSingle]: "二不同号单选"
        };
        this.Type = playType;
    }

    /**
     * 初始化球盘
     *
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns
     * @memberof Quick3
     */
    Init(option = {}) {
        let FomulaMap = {
            [this.PlayTypeEnum.Sum]: () => {
                let numbers = super.GenerateNumber(3, 18);
                let res = numbers.map(m => {
                    return {
                        num: m.toString(),
                        money: Quick3Award[m]
                    };
                });

                return res;
            },
            [this.PlayTypeEnum.ThreeSameAll]: () => {
                let numbers = ["111,222,333,444,555,666"];
                let res = numbers.map(m => {
                    return {
                        num: m
                    };
                });

                return res;
            },
            [this.PlayTypeEnum.ThreeContinuityAll]: () => {
                let numbers = ["123,234,345,456"];
                let res = numbers.map(m => {
                    return {
                        num: m
                    };
                });

                return res;
            },
            [this.PlayTypeEnum.ThreeDiverse]: () => {
                let numbers = super.GenerateNumber(1, 6);
                let res = numbers.map(m => {
                    return {
                        num: m.toString()
                    };
                });

                return res;
            },
            [this.PlayTypeEnum.ThreeSameSingle]: () => {
                let numbers = [111, 222, 333, 444, 555, 666];
                let res = numbers.map(m => {
                    return {
                        num: m.toString()
                    };
                });

                return res;
            },
            [this.PlayTypeEnum.TwoDiverseSingle]: () => {
                let numbers = super.GenerateNumber(1, 6);
                let res = numbers.map(m => {
                    return {
                        num: m.toString()
                    };
                });

                return res;
            },
            [this.PlayTypeEnum.TwoSameCompound]: () => {
                let res = [11, 22, 33, 44, 55, 66].map(m => {
                    return {
                        num: m.toString()
                    };
                });

                return res;
            },
            [this.PlayTypeEnum.TwoSameSingle]: () => {
                let res = super
                    .GenerateNumber(1, 6)
                    .concat([11, 22, 33, 44, 55, 66])
                    .map(m => {
                        return {
                            num: m.toString()
                        };
                    });

                return res;
            }
        };

        let res = FomulaMap[this.Type]();

        if (option.leaveout) {
            let leaveout;
            res.forEach((item, index) => {
                leaveout = option.leaveout.find(m => m.num == item.num);
                item.leaveout = leaveout ? leaveout.count : "";
            });
        }
        return res;
    }

    /**
     * 机选
     *
     * @returns
     * @memberof Quick3
     */
    Random() {
        let FomulaMap = {
            [this.PlayTypeEnum.Sum]: () => {
                return super.Random([3, 18], 1);
            },
            [this.PlayTypeEnum.ThreeSameAll]: () => {
                return ["111,222,333,444,555,666"];
            },
            [this.PlayTypeEnum.ThreeContinuityAll]: () => {
                return ["123,234,345,456"];
            },
            [this.PlayTypeEnum.ThreeDiverse]: () => {
                return super.Random([1, 6], 3);
            },
            [this.PlayTypeEnum.ThreeSameSingle]: () => {
                return super.RandomIn([111, 222, 333, 444, 555, 666], 1);
            },
            [this.PlayTypeEnum.TwoDiverseSingle]: () => {
                return super.Random([1, 6], 2);
            },
            [this.PlayTypeEnum.TwoSameCompound]: () => {
                return super.RandomIn([11, 22, 33, 44, 55, 66], 1);
            },
            [this.PlayTypeEnum.TwoSameSingle]: () => {
                let res = [];
                res = super.RandomIn([11, 22, 33, 44, 55, 66], 1);
                res = res.concat(super.Random([1, 6], 1, { except: [parseInt(res[0].substring(0, 1))] }));
                return res;
            }
        };
        return FomulaMap[this.Type]();
    }

    /**
     * 注数计算
     *
     * @param {Array} selected
     * @returns
     * @memberof Quick3
     */
    JettonCalc(selected) {
        let FomulaMap = {
            [this.PlayTypeEnum.Sum]: () => {
                return selected.length;
            },
            [this.PlayTypeEnum.ThreeSameAll]: () => {
                return selected.length;
            },
            [this.PlayTypeEnum.ThreeContinuityAll]: () => {
                return selected.length;
            },
            [this.PlayTypeEnum.ThreeSameSingle]: () => {
                return selected.length;
            },
            [this.PlayTypeEnum.ThreeDiverse]: () => {
                return selected.length > 2 ? super.Combination(selected.length, 3) : 0;
            },
            [this.PlayTypeEnum.TwoDiverseSingle]: () => {
                return selected.length > 1 ? super.Combination(selected.length, 2) : 0;
            },
            [this.PlayTypeEnum.TwoSameCompound]: () => {
                return selected.length;
            },
            [this.PlayTypeEnum.TwoSameSingle]: () => {
                let same = selected.filter(m => m.length == 2);
                let diverse = selected.filter(m => m.length == 1);
                return same.length * diverse.length;
            }
        };

        return FomulaMap[this.Type]();
    }

    /**
     * 奖金计算
     *
     * @param {Array} selected
     * @returns
     * @memberof Quick3
     */
    AwardCalc(selected) {
        let FomulaMap = {
            [this.PlayTypeEnum.Sum]: () => {
                return Math.max(...selected.map(m => Quick3Award[m]));
            },
            [this.PlayTypeEnum.ThreeSameAll]: () => {
                return selected.length > 0 ? 40 : 0;
            },
            [this.PlayTypeEnum.ThreeContinuityAll]: () => {
                return selected.length > 0 ? 10 : 0;
            },
            [this.PlayTypeEnum.ThreeSameSingle]: () => {
                return selected.length > 0 ? 240 : 0;
            },
            [this.PlayTypeEnum.ThreeDiverse]: () => {
                return selected.length > 2 ? 40 : 0;
            },
            [this.PlayTypeEnum.TwoDiverseSingle]: () => {
                return selected.length > 1 ? 8 : 0;
            },
            [this.PlayTypeEnum.TwoSameCompound]: () => {
                return selected.length > 0 ? 15 : 0;
            },
            [this.PlayTypeEnum.TwoSameSingle]: () => {
                let same = selected.filter(m => m.length == 2);
                let diverse = selected.filter(m => m.length == 1);
                return same.length > 0 && diverse.length > 0 ? 80 : 0;
            }
        };

        return FomulaMap[this.Type]();
    }

    /**
     * 获取结果类型
     *
     * @param {Number[]} result
     * @returns
     * @memberof Quick3
     */
    GetResultType(result) {
        let t = result.map(m => parseInt(m));
        let one = t[0],
            two = t[1],
            three = t[2],
            res;

        if (t.every(m => m == one)) {
            res = "三同号";
        } else if (t.some(m => t.filter(n => n == m).length == 2)) {
            res = "二同号";
        } else if (isContinuity(t)) {
            res = "三连号";
        } else {
            res = "三不同";
        }

        function isContinuity(arr) {
            let max = Math.max(...arr),
                min = Math.min(...arr);
            let sum = (max - min + 1) * (max + min) / 2,
                sum2 = arr.reduce((a, b) => a + b, 0);
            return sum == sum2;
        }

        return res;
    }

    /**
     * 获取选择字符串
     *
     * @param {Array} selected
     * @returns
     * @memberof Quick3
     */
    GetSelectedString(selected, type) {
        let res = "";
        let select = [];
        Object.assign(select, selected);
        select.sort((a, b) => parseInt(a) - parseInt(b));
        if (type == this.PlayTypeEnum.ThreeSameAll || type == this.PlayTypeEnum.ThreeContinuityAll) {
            res = this.Quick3TypeNameEnum[type];
        } else if (type == this.PlayTypeEnum.TwoSameSingle) {
            res = select.filter(m => m.length == 2).join(" ") + "#" + select.filter(m => m.length == 1).join(" ");
        } else if (type == this.PlayTypeEnum.TwoSameCompound) {
            res = select.join("* ") + "*";
        } else {
            res = select.join(" ");
        }
        return res;
    }

    /**
     * 获取玩法名称
     *
     * @returns
     * @memberof Quick3
     */
    GetTypeName() {
        let map = {
            [this.PlayTypeEnum.Sum]: "和值",
            [this.PlayTypeEnum.ThreeSameAll]: "三同号通选",
            [this.PlayTypeEnum.ThreeSameSingle]: "三同号单选",
            [this.PlayTypeEnum.ThreeDiverse]: "三不同号",
            [this.PlayTypeEnum.ThreeContinuityAll]: "三连号通选",
            [this.PlayTypeEnum.TwoSameCompound]: "二同号复选",
            [this.PlayTypeEnum.TwoSameSingle]: "二同号单选",
            [this.PlayTypeEnum.TwoDiverseSingle]: "二不同号单选"
        };
        return map[this.Type];
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} selected
     * @param {String[]} selected[].selected
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof Quick3
     */
    GetOrderString(selected) {
        return selected.map(m => {
            let o = {
                number: "", //,
                playid: m.playType
            };

            let str = this.GetSelectedString(m.selected, m.playType);
            if (o.playid == this.PlayTypeEnum.ThreeSameAll || o.playid == this.PlayTypeEnum.ThreeContinuityAll) {
                o.number = str;
            } else {
                o.number = str.replace(/ /g, ",");
            }
            return o;
        });
    }

    /**
     * 补全一注
     *
     * @param {string[]} selected
     * @memberof Quick3
     */
    CompleteBall(selected) {
        let FomulaMap = {
            [this.PlayTypeEnum.Sum]: () => {
                return this.Random();
            },
            [this.PlayTypeEnum.ThreeSameAll]: () => {
                return this.Random();
            },
            [this.PlayTypeEnum.ThreeContinuityAll]: () => {
                return this.Random();
            },
            [this.PlayTypeEnum.ThreeSameSingle]: () => {
                return this.Random();
            },
            [this.PlayTypeEnum.ThreeDiverse]: () => {
                if (selected.length < 3) {
                    return selected.concat(super.Random([1, 6], 3 - selected.length, { except: selected }));
                } else {
                    return selected;
                }
            },
            [this.PlayTypeEnum.TwoDiverseSingle]: () => {
                if (selected.length < 2) {
                    return selected.concat(super.Random([1, 6], 2 - selected.length, { except: selected }));
                } else {
                    return selected;
                }
            },
            [this.PlayTypeEnum.TwoSameCompound]: () => {
                return this.Random();
            },
            [this.PlayTypeEnum.TwoSameSingle]: () => {
                let same = selected.filter(m => m.length == 2),
                    diverse = selected.filter(m => m.length == 1),
                    res = [];
                if (same.length == 0) {
                    same = super.RandomIn(["11", "22", "33", "44", "55", "66"].filter(m => !diverse.includes(m.substring(0, 1))), 1);
                }

                if (diverse.length == 0) {
                    diverse = super.Random([1, 6], 1, { except: same.map(m => parseInt(m.toString().substring(0, 1))) });
                }
                res = same.concat(diverse);

                return res;
            }
        };

        return FomulaMap[this.Type]();
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {string[]} result
     * @returns {object[]} res
     * @memberof Quick3
     */
    HighLightBetNumber(selected, result) {
        const hightColor = "#e23a3a";

        selected = this.Type == this.PlayTypeEnum.TwoSameSingle ? selected : selected.split(",");
        let FomulaMap = {
            [this.PlayTypeEnum.Sum]: item => {
                let res = parseInt(result[0]) + parseInt(result[1]) + parseInt(result[2]);
                return item.map(m => {
                    return {
                        color: m == res ? hightColor : "",
                        value: m
                    };
                });
            },
            [this.PlayTypeEnum.ThreeSameAll]: item => {
                if (result[0] == result[1] && result[1] == result[2]) {
                    return item.map(m => {
                        return {
                            color: hightColor,
                            value: m
                        };
                    });
                } else {
                    return item.map(m => {
                        return {
                            color: "",
                            value: m
                        };
                    });
                }
            },
            [this.PlayTypeEnum.ThreeContinuityAll]: item => {
                if (Number(result[0]) + 1 == result[1] && Number(result[1]) + 1 == result[2]) {
                    return item.map(m => {
                        return {
                            color: hightColor,
                            value: m
                        };
                    });
                } else {
                    return item.map(m => {
                        return {
                            color: "",
                            value: m
                        };
                    });
                }
            },
            [this.PlayTypeEnum.ThreeSameSingle]: item => {
                return item.map(m => {
                    return {
                        color: result.join("") == m ? hightColor : "",
                        value: m
                    };
                });
            },
            [this.PlayTypeEnum.ThreeDiverse]: item => {
                return item.map(m => {
                    return {
                        color: result.includes(m) ? hightColor : "",
                        value: m
                    };
                });
            },
            [this.PlayTypeEnum.TwoDiverseSingle]: item => {
                return item.map(m => {
                    return {
                        color: result.join("").indexOf(m) > -1 ? hightColor : "",
                        value: m
                    };
                });
            },
            [this.PlayTypeEnum.TwoSameCompound]: item => {
                if (result[0] == result[1] || result[1] == result[2]) {
                    return item.map(m => {
                        return {
                            color: result[1] == m.substr(1, 1) ? hightColor : "",
                            value: m
                        };
                    });
                } else {
                    return item.map(m => {
                        return {
                            color: "",
                            value: m
                        };
                    });
                }
            },
            [this.PlayTypeEnum.TwoSameSingle]: item => {
                let left = selected.split("#")[0].split(",");
                let right = selected.split("#")[1].split(",");
                let res = left.map(m => {
                    return {
                        color: result[1] == m.substr(1, 1) ? hightColor : "",
                        value: m
                    };
                });

                res.push({ color: "", value: "#" });

                var num = result.concat();
                num.splice(1, 1);
                num = num.join("");
                res = res.concat(
                    right.map(m => {
                        return {
                            color: num.includes(m) ? hightColor : "",
                            value: m
                        };
                    })
                );

                return res;
            }
        };

        if (result.length == 0) {
            return item.map(m => {
                return {
                    color: "",
                    value: m
                };
            });
        } else {
            return FomulaMap[this.Type](selected);
        }
    }
}

/**
 * 快3奖金
 */
export const Quick3Award = {
    3: 240,
    4: 80,
    5: 40,
    6: 25,
    7: 16,
    8: 12,
    9: 10,
    10: 9,
    11: 9,
    12: 10,
    13: 12,
    14: 16,
    15: 25,
    16: 40,
    17: 80,
    18: 240
};

/**
 * 广西快三
 *
 * @export
 * @class GXQuick3
 * @extends {Quick3}
 */
export class GXQuick3 extends Quick3 {
    static PlayTypeEnum = {
        /**
         * 和值
         */
        Sum: 6801,
        /**
         * 三同号通选
         */
        ThreeSameAll: 6802,
        /**
         * 三同号单选
         */
        ThreeSameSingle: 6804,
        /**
         * 三不同号
         */
        ThreeDiverse: 6805,
        /**
         * 三连号通选
         */
        ThreeContinuityAll: 6803,
        /**
         * 二同号复选
         */
        TwoSameCompound: 6806,
        /**
         * 二同号单选
         */
        TwoSameSingle: 6807,
        /**
         * 二不同号单选
         */
        TwoDiverseSingle: 6808
    };

    constructor(type) {
        super(GXQuick3.PlayTypeEnum, type);
    }
}

/**
 * 江西快三
 *
 * @export
 * @class JXQuick3
 * @extends {Quick3}
 */
export class JXQuick3 extends Quick3 {
    static PlayTypeEnum = {
        /**
         * 和值
         */
        Sum: 6701,
        /**
         * 三同号通选
         */
        ThreeSameAll: 6702,
        /**
         * 三同号单选
         */
        ThreeSameSingle: 6704,
        /**
         * 三不同号
         */
        ThreeDiverse: 6705,
        /**
         * 三连号通选
         */
        ThreeContinuityAll: 6703,
        /**
         * 二同号复选
         */
        TwoSameCompound: 6706,
        /**
         * 二同号单选
         */
        TwoSameSingle: 6707,
        /**
         * 二不同号单选
         */
        TwoDiverseSingle: 6708
    };

    constructor(type) {
        super(JXQuick3.PlayTypeEnum, type);
    }
}

/**
 * 吉林快三
 *
 * @export
 * @class JLQuick3
 * @extends {Quick3}
 */
export class JLQuick3 extends Quick3 {
    static PlayTypeEnum = {
        /**
         * 和值
         */
        Sum: 6901,
        /**
         * 三同号通选
         */
        ThreeSameAll: 6902,
        /**
         * 三同号单选
         */
        ThreeSameSingle: 6904,
        /**
         * 三不同号
         */
        ThreeDiverse: 6905,
        /**
         * 三连号通选
         */
        ThreeContinuityAll: 6903,
        /**
         * 二同号复选
         */
        TwoSameCompound: 6906,
        /**
         * 二同号单选
         */
        TwoSameSingle: 6907,
        /**
         * 二不同号单选
         */
        TwoDiverseSingle: 6908
    };

    constructor(type) {
        super(JLQuick3.PlayTypeEnum, type);
    }
}
