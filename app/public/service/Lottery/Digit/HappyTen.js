import { Digit } from "./Digit";

/**
 * 快乐十分玩法枚举
 */
const HappyTenPlayTypeEnum = {
    /**
     * 选一数投
     */
    OneNumber: "01",
    /**
     * 选一红投
     */
    OneRed: "02",
    /**
     * 选一数投_复式
     */
    OneNumber_Compound: "03",
    /**
     * 选二
     */
    TwoOptional: "11",
    /**
     * 选二连组
     */
    TwoContinuityCombination: "12",
    /**
     * 选二连直
     */
    TwoContinuityDirect: "13",
    /**
     * 选二_复式
     */
    TwoOptional_Compound: "14",
    /**
     * 选二连组_复式
     */
    TwoContinuityCombination_Compound: "15",
    /**
     * 选三
     */
    ThreeOptional: "21",
    /**
     * 选三前组
     */
    ThreeFrontCombination: "22",
    /**
     * 选三前直
     */
    ThreeFrontDirect: "23",
    /**
     * 选三_复式
     */
    ThreeOptional_Compound: "24",
    /**
     * 选三前组_复式
     */
    ThreeFrontCombination_Compound: "25",
    /**
     * 选四
     */
    FourOptional: "31",
    /**
     * 选四_复式
     */
    FourOptional_Compound: "32",
    /**
     * 选五
     */
    FiveOptional: "41",
    /**
     * 选五_复式
     */
    FiveOptional_Compound: "42"
};

/**
 * 快乐十分基类
 *
 * @class _HappyTen
 * @extends {Digit}
 */
class _HappyTen extends Digit {
    /**
     * 快乐十分玩法
     *
     * @memberof _HappyTen
     */
    Type = null;

    /**
     * 已选
     *
     * @memberof _HappyTen
     */
    Selected = {
        first: [], //万
        second: [], //千
        third: [] //百
    };

    /**
     * 球盘-供选项
     *
     * @memberof _HappyTen
     */
    Plate = {
        first: [], //万
        second: [], //千
        third: [] //百
    };

    constructor(type) {
        super();
        this.Type = type;
        this.Plate = this.Init();
    }

    /**
     * 初始化球盘
     * 生成个第一位、第二位、第三位
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns
     * @memberof _HappyTen
     */
    Init(option = {}) {
        let first = super.GenerateNumber(1, 20, { zeroize: true }).map(m => {
            return { num: m };
        });
        let second = super.GenerateNumber(1, 20, { zeroize: true }).map(m => {
            return { num: m };
        });
        let third = super.GenerateNumber(1, 20, { zeroize: true }).map(m => {
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
     * 获取下单字符串
     *
     * @param {Object[]} selected
     * @param {object} selected[].selected
     * @param {string} selected[].selected.first
     * @param {string} selected[].selected.second
     * @param {string} selected[].selected.third
     * @param {PlayTypeEnum} selected[].playType
     * @param {string} join
     * @param {string} join2
     * @returns
     * @memberof _HappyTen
     */
    GetOrderString(selected, join = "", join2 = "") {
        return selected.map(m => {
            return {
                number: Object.values(m.selected)
                    .filter(s => s.length > 0)
                    .map(s => s.join(join))
                    .join(join2),
                playid: m.playType
            };
        });
    }
}

/**
 * 选一数投
 *
 * @class OneNumber
 * @extends {_HappyTen}
 */
class OneNumber extends _HappyTen {
    /**
     * 玩法
     *
     * @memberof OneNumber
     */
    Type = null;

    /**
     * 复式玩法
     *
     * @memberof OneNumber
     */
    TypeCompound = null;

    /**
     * 玩法名称
     *
     * @memberof OneNumber
     */
    TypeName = "选一数投";

    /**
     * Creates an instance of OneNumber.
     * @param {any} type
     * @param {any} type_compound
     * @memberof OneNumber
     */
    constructor(type, type_compound) {
        super(type);
        this.Type = type;
        this.TypeCompound = type_compound;
        this.Plate = this.Init();
    }

    /**
     * 初始化球盘
     * 生成个第一位、第二位、第三位
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns
     * @memberof OneNumber
     */
    Init(option = {}) {
        let first = super.GenerateNumber(1, 18, { zeroize: true }).map(m => {
            return { num: m };
        });
        let second = [];
        let third = [];

        if (option.leaveout) {
            if (option.leaveout.first) {
                addLeaveout(first, "first");
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
     * 机选
     *
     * @memberof OneNumber
     */
    Random() {
        this.Selected = {
            first: super.Random([1, 18], 1, { zeroize: true }),
            second: [],
            third: []
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof OneNumber
     */
    JettonCalc() {
        return this.Selected.first.length;
    }

    /**
     * 最高奖金计算
     *
     * @memberof OneNumber
     */
    AwardCalc() {
        return this.JettonCalc(this.Selected) > 0 ? 25 : 0;
    }

    /**
     * 补全一注
     *
     * @memberof OneNumber
     */
    CompleteBall() {
        if (this.Selected.first.length < 1) {
            this.Selected.first = super.Random([1, 18], 1, { zeroize: true });
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
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof OneNumber
     */
    GetOrderString(selected) {
        return super.GetOrderString(
            selected.map(m => {
                m.playType = this.JettonCalc(m.selected) > 1 ? this.TypeCompound : this.Type;
                return m;
            }),
            " ",
            ""
        );
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof OneNumber
     */
    Select(item) {
        let clickIndex = this.Selected.first.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.first.splice(clickIndex, 1);
        } else {
            this.Selected.first.push(item);
        }
    }
}

/**
 * 选一红投
 *
 * @class OneRed
 * @extends {_HappyTen}
 */
class OneRed extends _HappyTen {
    /**
     * 玩法
     *
     * @memberof OneRed
     */
    Type = null;

    /**
     * 玩法名称
     *
     * @memberof OneRed
     */
    TypeName = "选一红投";

    /**
     * Creates an instance of OneRed.
     * @param {any} type
     * @memberof OneRed
     */
    constructor(type) {
        super(type);
        this.Type = type;
        this.Plate = this.Init();
    }

    /**
     * 初始化球盘
     * 生成个第一位、第二位、第三位
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns
     * @memberof OneRed
     */
    Init(option = {}) {
        let first = super.GenerateNumber(19, 20, { zeroize: true }).map(m => {
            return { num: m };
        });
        let second = [];
        let third = [];

        if (option.leaveout) {
            if (option.leaveout.first) {
                addLeaveout(first, "first");
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
     * 机选
     *
     * @memberof OneRed
     */
    Random() {
        this.Selected = {
            first: super.Random([19, 20], 1, { zeroize: true }),
            second: [],
            third: []
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof OneRed
     */
    JettonCalc() {
        return this.Selected.first.length;
    }

    /**
     * 最高奖金计算
     *
     * @memberof OneRed
     */
    AwardCalc() {
        return this.JettonCalc(this.Selected) > 0 ? 25 : 0;
    }

    /**
     * 补全一注
     *
     * @memberof OneRed
     */
    CompleteBall() {
        if (this.Selected.first.length < 1) {
            this.Selected.first = super.Random([19, 20], 1, { zeroize: true });
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
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof OneNumber
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected, "", "");
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof OneNumber
     */
    Select(item) {
        let clickIndex = this.Selected.first.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.first.splice(clickIndex, 1);
        } else {
            this.Selected.first = [].concat(item);
        }
    }
}

/**
 * 任选二
 *
 * @class TwoOptional
 * @extends {_HappyTen}
 */
class TwoOptional extends _HappyTen {
    /**
     * 玩法
     *
     * @memberof TwoOptional
     */
    Type = null;

    /**
     * 复式玩法
     *
     * @memberof OneNumber
     */
    TypeCompound = null;

    /**
     * 玩法名称
     *
     * @memberof TwoOptional
     */
    TypeName = "任选二";

    /**
     * Creates an instance of TwoOptional.
     * @param {any} type
     * @param {any} type_compound
     * @memberof TwoOptional
     */
    constructor(type, type_compound) {
        super(type);
        this.Type = type;
        this.TypeCompound = type_compound;
        this.Plate = this.Init();
    }

    /**
     * 机选
     *
     * @memberof TwoOptional
     */
    Random() {
        this.Selected = {
            first: super.Random([1, 20], 2, { zeroize: true }),
            second: [],
            third: []
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof TwoOptional
     */
    JettonCalc() {
        return super.Combination(this.Selected.first.length, 2);
    }

    /**
     * 最高奖金计算
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof TwoOptional
     */
    AwardCalc() {
        return this.JettonCalc() > 0 ? 8 : 0;
    }

    /**
     * 补全一注
     *
     * @memberof TwoOptional
     */
    CompleteBall() {
        if (this.Selected.first.length < 2) {
            this.Selected.first = this.Selected.first.concat(
                super.Random([1, 20], 2 - this.Selected.first.length, { zeroize: true, except: this.Selected.first })
            );
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
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof TwoOptional
     */
    GetOrderString(selected) {
        return super.GetOrderString(
            selected.map(m => {
                m.playType = this.JettonCalc(m.selected) > 1 ? this.TypeCompound : this.Type;
                return m;
            }),
            " ",
            ""
        );
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof TwoOptional
     */
    Select(item) {
        let clickIndex = this.Selected.first.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.first.splice(clickIndex, 1);
        } else {
            this.Selected.first.push(item);
        }
    }
}

/**
 * 任选三
 *
 * @class ThreeOptional
 * @extends {_HappyTen}
 */
class ThreeOptional extends _HappyTen {
    /**
     * 玩法
     *
     * @memberof ThreeOptional
     */
    Type = null;

    /**
     * 复式玩法
     *
     * @memberof OneNumber
     */
    TypeCompound = null;

    /**
     * 玩法名称
     *
     * @memberof ThreeOptional
     */
    TypeName = "任选三";

    /**
     * Creates an instance of ThreeOptional.
     * @param {any} type
     * @param {any} type_compound
     * @memberof ThreeOptional
     */
    constructor(type, type_compound) {
        super(type);
        this.Type = type;
        this.TypeCompound = type_compound;
        this.Plate = this.Init();
    }

    /**
     * 机选
     *
     * @memberof ThreeOptional
     */
    Random() {
        this.Selected = {
            first: super.Random([1, 20], 3, { zeroize: true }),
            second: [],
            third: []
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof ThreeOptional
     */
    JettonCalc() {
        return super.Combination(this.Selected.first.length, 3);
    }

    /**
     * 最高奖金计算
     *
     * @memberof ThreeOptional
     */
    AwardCalc() {
        return this.JettonCalc() > 0 ? 24 : 0;
    }

    /**
     * 补全一注
     *
     * @memberof ThreeOptional
     */
    CompleteBall() {
        if (this.Selected.first.length < 3) {
            this.Selected.first = this.Selected.first.concat(
                super.Random([1, 20], 3 - this.Selected.first.length, { zeroize: true, except: this.Selected.first })
            );
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
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof ThreeOptional
     */
    GetOrderString(selected) {
        return super.GetOrderString(
            selected.map(m => {
                m.playType = this.JettonCalc(m.selected) > 1 ? this.TypeCompound : this.Type;
                return m;
            }),
            " ",
            ""
        );
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof ThreeOptional
     */
    Select(item) {
        let clickIndex = this.Selected.first.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.first.splice(clickIndex, 1);
        } else {
            this.Selected.first.push(item);
        }
    }
}

/**
 * 任选四
 *
 * @class FourOptional
 * @extends {_HappyTen}
 */
class FourOptional extends _HappyTen {
    /**
     * 玩法
     *
     * @memberof FourOptional
     */
    Type = null;

    /**
     * 复式玩法
     *
     * @memberof OneNumber
     */
    TypeCompound = null;

    /**
     * 玩法名称
     *
     * @memberof FourOptional
     */
    TypeName = "任选四";

    /**
     * Creates an instance of FourOptional.
     * @param {any} type
     * @param {any} type_compound
     * @memberof FourOptional
     */
    constructor(type, type_compound) {
        super(type);
        this.Type = type;
        this.TypeCompound = type_compound;
        this.Plate = this.Init();
    }

    /**
     * 机选
     *
     * @memberof FourOptional
     */
    Random() {
        this.Selected = {
            first: super.Random([1, 20], 4, { zeroize: true }),
            second: [],
            third: []
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof FourOptional
     */
    JettonCalc() {
        return super.Combination(this.Selected.first.length, 4);
    }

    /**
     * 最高奖金计算
     *
     * @memberof FourOptional
     */
    AwardCalc() {
        return this.JettonCalc() > 0 ? 80 : 0;
    }

    /**
     * 补全一注
     *
     * @memberof FourOptional
     */
    CompleteBall() {
        if (this.Selected.first.length < 4) {
            this.Selected.first = this.Selected.first.concat(
                super.Random([1, 20], 4 - this.Selected.first.length, { zeroize: true, except: this.Selected.first })
            );
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
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof FourOptional
     */
    GetOrderString(selected) {
        return super.GetOrderString(
            selected.map(m => {
                m.playType = this.JettonCalc(m.selected) > 1 ? this.TypeCompound : this.Type;
                return m;
            }),
            " ",
            ""
        );
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof FourOptional
     */
    Select(item) {
        let clickIndex = this.Selected.first.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.first.splice(clickIndex, 1);
        } else {
            this.Selected.first.push(item);
        }
    }
}

/**
 * 任选五
 *
 * @class FiveOptional
 * @extends {_HappyTen}
 */
class FiveOptional extends _HappyTen {
    /**
     * 玩法
     *
     * @memberof FiveOptional
     */
    Type = null;

    /**
     * 复式玩法
     *
     * @memberof OneNumber
     */
    TypeCompound = null;

    /**
     * 玩法名称
     *
     * @memberof FiveOptional
     */
    TypeName = "任选五";

    /**
     * Creates an instance of FiveOptional.
     * @param {any} type
     * @param {any} type_compound
     * @memberof FiveOptional
     */
    constructor(type, type_compound) {
        super(type);
        this.Type = type;
        this.TypeCompound = type_compound;
    }

    /**
     * 机选
     *
     * @memberof FiveOptional
     */
    Random() {
        this.Selected = {
            first: super.Random([1, 20], 5, { zeroize: true }),
            second: [],
            third: []
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof FiveOptional
     */
    JettonCalc() {
        return super.Combination(this.Selected.first.length, 5);
    }

    /**
     * 最高奖金计算
     *
     * @memberof FiveOptional
     */
    AwardCalc() {
        return this.JettonCalc() > 0 ? 320 : 0;
    }

    /**
     * 补全一注
     *
     * @memberof FiveOptional
     */
    CompleteBall() {
        if (this.Selected.first.length < 5) {
            this.Selected.first = this.Selected.first.concat(
                super.Random([1, 20], 5 - this.Selected.first.length, { zeroize: true, except: this.Selected.first })
            );
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
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof FiveOptional
     */
    GetOrderString(selected) {
        return super.GetOrderString(
            selected.map(m => {
                m.playType = this.JettonCalc(m.selected) > 1 ? this.TypeCompound : this.Type;
                return m;
            }),
            " ",
            ""
        );
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof FiveOptional
     */
    Select(item) {
        let clickIndex = this.Selected.first.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.first.splice(clickIndex, 1);
        } else {
            this.Selected.first.push(item);
        }
    }
}

/**
 * 选二连组
 *
 * @class TwoContinuityCombination
 * @extends {_HappyTen}
 */
class TwoContinuityCombination extends _HappyTen {
    /**
     * 玩法
     *
     * @memberof TwoContinuityCombination
     */
    Type = null;

    /**
     * 复式玩法
     *
     * @memberof OneNumber
     */
    TypeCompound = null;

    /**
     * 玩法名称
     *
     * @memberof TwoContinuityCombination
     */
    TypeName = "选二连组";

    /**
     * Creates an instance of TwoContinuityCombination.
     * @param {any} type
     * @param {any} type_compound
     * @memberof TwoContinuityCombination
     */
    constructor(type, type_compound) {
        super(type);
        this.Type = type;
        this.TypeCompound = type_compound;
    }

    /**
     * 机选
     *
     * @memberof TwoContinuityCombination
     */
    Random() {
        this.Selected = {
            first: super.Random([1, 20], 2, { zeroize: true }),
            second: [],
            third: []
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof TwoContinuityCombination
     */
    JettonCalc() {
        return super.Combination(this.Selected.first.length, 2);
    }

    /**
     * 最高奖金计算
     *
     * @memberof TwoContinuityCombination
     */
    AwardCalc() {
        return this.JettonCalc() > 0 ? 31 : 0;
    }

    /**
     * 补全一注
     *
     * @memberof TwoContinuityCombination
     */
    CompleteBall() {
        if (this.Selected.first.length < 2) {
            this.Selected.first = this.Selected.first.concat(
                super.Random([1, 20], 2 - this.Selected.first.length, { zeroize: true, except: this.Selected.first })
            );
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
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof TwoContinuityCombination
     */
    GetOrderString(selected) {
        return super.GetOrderString(
            selected.map(m => {
                m.playType = this.JettonCalc(m.selected) > 1 ? this.TypeCompound : this.Type;
                return m;
            }),
            " ",
            ""
        );
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof TwoContinuityCombination
     */
    Select(item) {
        let clickIndex = this.Selected.first.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.first.splice(clickIndex, 1);
        } else {
            this.Selected.first.push(item);
        }
    }
}

/**
 * 选二连直
 *
 * @class TwoContinuityDirect
 * @extends {_HappyTen}
 */
class TwoContinuityDirect extends _HappyTen {
    /**
     * 玩法
     *
     * @memberof TwoContinuityDirect
     */
    Type = null;

    /**
     * 玩法名称
     *
     * @memberof TwoContinuityDirect
     */
    TypeName = "选二连直";

    /**
     * Creates an instance of TwoContinuityDirect.
     * @param {any} type
     * @memberof TwoContinuityDirect
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof TwoContinuityDirect
     */
    Random() {
        let first = super.Random([1, 20], 1, { zeroize: true });
        let second = super.Random([1, 20], 1, { zeroize: true, except: first });
        this.Selected = {
            first,
            second,
            third: []
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof TwoContinuityDirect
     */
    JettonCalc() {
        return this.Selected.first.length * this.Selected.second.length;
    }

    /**
     * 最高奖金计算
     *
     * @memberof TwoContinuityDirect
     */
    AwardCalc() {
        return this.JettonCalc() > 0 ? 62 : 0;
    }

    /**
     * 补全一注
     *
     * @memberof TwoContinuityDirect
     */
    CompleteBall() {
        if (this.Selected.first.length < 1) {
            this.Selected.first = super.Random([1, 20], 1, { zeroize: true, except: this.Selected.second });
        }
        if (this.Selected.second.length < 1) {
            this.Selected.second = super.Random([1, 20], 1, { zeroize: true, except: this.Selected.first });
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
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof TwoContinuityDirect
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected, " ", " ");
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof TwoContinuityDirect
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

/**
 * 选三前组
 *
 * @class ThreeFrontCombination
 * @extends {_HappyTen}
 */
class ThreeFrontCombination extends _HappyTen {
    /**
     * 玩法
     *
     * @memberof ThreeFrontCombination
     */
    Type = null;

    /**
     * 复式玩法
     *
     * @memberof OneNumber
     */
    TypeCompound = null;

    /**
     * 玩法名称
     *
     * @memberof ThreeFrontCombination
     */
    TypeName = "选三前组";

    /**
     * Creates an instance of ThreeFrontCombination.
     * @param {any} type
     * @param {any} type_compound
     * @memberof ThreeFrontCombination
     */
    constructor(type, type_compound) {
        super(type);
        this.Type = type;
        this.TypeCompound = type_compound;
    }

    /**
     * 机选
     *
     * @memberof ThreeFrontCombination
     */
    Random() {
        this.Selected = {
            first: super.Random([1, 20], 3, { zeroize: true }),
            second: [],
            third: []
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @param {Object} selected         -已选项
     * @param {Array} selected.first    -第一位
     * @param {Array} selected.second   -第二位
     * @param {Array} selected.third    -第三位
     * @memberof ThreeFrontCombination
     */
    JettonCalc() {
        return super.Combination(this.Selected.first.length, 3);
    }

    /**
     * 最高奖金计算
     *
     * @memberof ThreeFrontCombination
     */
    AwardCalc() {
        return this.JettonCalc() > 0 ? 1300 : 0;
    }

    /**
     * 补全一注
     *
     * @memberof ThreeFrontCombination
     */
    CompleteBall() {
        if (this.Selected.first.length < 3) {
            this.Selected.first = this.Selected.first.concat(
                super.Random([1, 20], 3 - this.Selected.first.length, { zeroize: true, except: this.Selected.first })
            );
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
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof ThreeFrontCombination
     */
    GetOrderString(selected) {
        return super.GetOrderString(
            selected.map(m => {
                m.playType = this.JettonCalc(m.selected) > 1 ? this.TypeCompound : this.Type;
                return m;
            }),
            " ",
            ""
        );
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof ThreeFrontCombination
     */
    Select(item) {
        let clickIndex = this.Selected.first.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.first.splice(clickIndex, 1);
        } else {
            this.Selected.first.push(item);
        }
    }
}

/**
 * 选三前直
 *
 * @class ThreeFrontDirect
 * @extends {_HappyTen}
 */
class ThreeFrontDirect extends _HappyTen {
    /**
     * 玩法
     *
     * @memberof ThreeFrontDirect
     */
    Type = null;

    /**
     * 玩法名称
     *
     * @memberof ThreeFrontDirect
     */
    TypeName = "选三前直";

    /**
     * Creates an instance of ThreeFrontDirect.
     * @param {any} type
     * @memberof ThreeFrontDirect
     */
    constructor(type) {
        super(type);
        this.Type = type;
    }

    /**
     * 机选
     *
     * @memberof ThreeFrontDirect
     */
    Random() {
        let first = super.Random([1, 20], 1, { zeroize: true });
        let second = super.Random([1, 20], 1, { zeroize: true, except: first });
        let third = super.Random([1, 20], 1, { zeroize: true, except: first.concat(second) });
        this.Selected = {
            first,
            second,
            third
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof ThreeFrontDirect
     */
    JettonCalc() {
        return this.Selected.first.length * this.Selected.second.length * this.Selected.third.length;
    }

    /**
     * 最高奖金计算
     *
     * @memberof ThreeFrontDirect
     */
    AwardCalc() {
        return this.JettonCalc() > 0 ? 8000 : 0;
    }

    /**
     * 补全一注
     *
     * @memberof ThreeFrontDirect
     */
    CompleteBall() {
        if (this.Selected.first.length < 1) {
            this.Selected.first = super.Random([1, 20], 1, { zeroize: true, except: this.Selected.second.concat(this.Selected.third) });
        }
        if (this.Selected.second.length < 1) {
            this.Selected.second = super.Random([1, 20], 1, { zeroize: true, except: this.Selected.first.concat(this.Selected.third) });
        }
        if (this.Selected.third.length < 1) {
            this.Selected.third = super.Random([1, 20], 1, { zeroize: true, except: this.Selected.first.concat(this.Selected.second) });
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
     * @param {PlayTypeEnum} selected[].playType
     * @returns
     * @memberof ThreeFrontDirect
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected, " ", " ");
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof ThreeFrontDirect
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

/**
 * 快乐十分
 *
 * @class HappyTen
 */
class HappyTen {
    /**
     * 玩法枚举
     *
     * @memberof HappyTen
     */
    PlayTypeEnum = {};

    /**
     * Creates an instance of HappyTen.
     * @param {any} playEnum 玩法枚举
     * @param {any} type 具体玩法
     * @memberof HappyTen
     */
    constructor(playEnum, type) {
        this.PlayTypeEnum = playEnum;

        let map = {
            [this.PlayTypeEnum.OneNumber]: OneNumber,
            [this.PlayTypeEnum.OneRed]: OneRed,
            [this.PlayTypeEnum.TwoOptional]: TwoOptional,
            [this.PlayTypeEnum.TwoContinuityCombination]: TwoContinuityCombination,
            [this.PlayTypeEnum.TwoContinuityDirect]: TwoContinuityDirect,
            [this.PlayTypeEnum.ThreeOptional]: ThreeOptional,
            [this.PlayTypeEnum.ThreeFrontCombination]: ThreeFrontCombination,
            [this.PlayTypeEnum.ThreeFrontDirect]: ThreeFrontDirect,
            [this.PlayTypeEnum.FourOptional]: FourOptional,
            [this.PlayTypeEnum.FiveOptional]: FiveOptional
        };

        try {
            let key = Object.entries(this.PlayTypeEnum).find(m => m[1] == type)[0];
            return new map[type](type, this.PlayTypeEnum[key + "_Compound"]);
        } catch (error) {
            throw new Error("未找到该玩法!");
        }
    }
}

/**
 * 重庆快乐十分
 *
 * @export
 * @class CQHappyTen
 */
export class CQHappyTen {
    static PlayTypeEnum = {
        /**
         * 选一数投
         */
        OneNumber: "8101",
        /**
         * 选一红投
         */
        OneRed: "8102",
        /**
         * 选一数投_复式
         */
        OneNumber_Compound: "8103",
        /**
         * 选二
         */
        TwoOptional: "8111",
        /**
         * 选二连组
         */
        TwoContinuityCombination: "8112",
        /**
         * 选二连直
         */
        TwoContinuityDirect: "8113",
        /**
         * 选二_复式
         */
        TwoOptional_Compound: "8114",
        /**
         * 选二连组_复式
         */
        TwoContinuityCombination_Compound: "8115",
        /**
         * 选三
         */
        ThreeOptional: "8121",
        /**
         * 选三前组
         */
        ThreeFrontCombination: "8122",
        /**
         * 选三前直
         */
        ThreeFrontDirect: "8123",
        /**
         * 选三_复式
         */
        ThreeOptional_Compound: "8124",
        /**
         * 选三前组_复式
         */
        ThreeFrontCombination_Compound: "8125",
        /**
         * 选四
         */
        FourOptional: "8131",
        /**
         * 选四_复式
         */
        FourOptional_Compound: "8132",
        /**
         * 选五
         */
        FiveOptional: "8141",
        /**
         * 选五_复式
         */
        FiveOptional_Compound: "8142"
    };

    constructor(type) {
        return new HappyTen(CQHappyTen.PlayTypeEnum, type);
    }
}
