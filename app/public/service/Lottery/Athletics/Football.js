export class Football {
    constructor({ Type, Score, Rq, Pre, HalfScore }) {
        let map = {
            [PlayTypeEnum.SPF]: FootballSPF,
            [PlayTypeEnum.RQS]: FootballRQSPF,
            [PlayTypeEnum.BQC]: FootballBQC,
            [PlayTypeEnum.ZJQ]: FootballZJQ,
            [PlayTypeEnum.CBF]: FootballCBF,
            [PlayTypeEnum.SXP]: FootballSXP
        };
        return new map[Type](Score, Rq || Pre || HalfScore);
    }
}

class _Football {
    constructor(Type, Score) {
        this.Type = Type;
        this._score = Score;
    }

    Type = null;

    _score = null;

    /**
     *  比分
     *
     * @readonly
     * @returns {object} score
     * @memberof _Football
     */
    get Score() {
        return this.GetScore(this._score);
    }

    /**
     *  获取彩果
     *
     * @returns
     * @memberof _Football
     */
    GetResult() {
        if (this._score == "#") {
            return "";
        }
        if (!this.HadResult(this._score)) {
            return "待定";
        }
        if (this._score == "-1:-1") {
            return "停售";
        }
    }

    /**
     *  获取比分
     *
     * @param {string} score
     * @returns {object}
     * @memberof _Football
     */
    GetScore(score) {
        let res = {
            Home: "",
            Away: ""
        };
        if (score) {
            let scores = score.split(":");
            let result = new Array(2);

            return {
                Home: parseInt(scores[0]),
                Away: parseInt(scores[1])
            };
        }

        return res;
    }

    /**
     *  判断是否开过奖
     *
     * @returns
     * @memberof _Football
     */
    HadResult() {
        if (this._score == null || this._score.indexOf(":") == -1) {
            return false;
        } else {
            return true;
        }
    }

    /**
     *  比分转胜平负
     *
     * @memberof _Football
     */
    ScoreToResult(score) {
        return score.Home > score.Away ? "主胜" : score.Home < score.Away ? "客胜" : "平";
    }

    /**
     *  比分转胜平负（简写）
     *
     * @param {any} score
     * @memberof _Football
     */
    ScoreToSimpleResult(score) {
        return score.Home > score.Away ? "胜" : score.Home < score.Away ? "负" : "平";
    }
}

/**
 * 胜平负
 *
 * @class FootballSPF
 * @extends {_Football}
 */
class FootballSPF extends _Football {
    constructor(Score) {
        super(PlayTypeEnum.SPF, Score);
    }

    GetResult() {
        let res = super.GetResult();
        if (res !== undefined) return res;
        return super.ScoreToResult(super.Score);
    }

    GetPlayTypeName() {
        return "胜平负";
    }

    GetBet(sg) {
        let result = "";
        if (sg == 3) {
            result = "主胜";
        } else if (sg == 1) {
            result = "平";
        } else if (sg == 0) {
            result = "客胜";
        }
        return result;
    }
}

/**
 * 让球胜平负
 *
 * @class FootballRQSPF
 * @extends {_Football}
 */
class FootballRQSPF extends _Football {
    constructor(Score, Rq) {
        super(PlayTypeEnum.RQS, Score);
        this._rq = parseInt(Rq);
    }

    _rq = null;

    get Score() {
        let res = super.Score;
        res.Home = res.Home + this._rq;

        return res;
    }

    GetResult() {
        let res = super.GetResult();
        if (res !== undefined) return res;
        return super.ScoreToResult(this.Score);
    }

    GetPlayTypeName() {
        return `让球(${this._rq})胜平负`;
    }

    GetBet(sg) {
        let result = "";
        if (sg == 3) {
            result = "主胜";
        } else if (sg == 1) {
            result = "平";
        } else if (sg == 0) {
            result = "客胜";
        }
        return result;
    }
}

/**
 * 半全场
 *
 * @class FootballBQC
 * @extends {_Football}
 */
class FootballBQC extends _Football {
    constructor(Score, HalfScore) {
        super(PlayTypeEnum.BQC, Score);
        this._halfScore = HalfScore;
    }

    _halfScore = null;

    /**
     *  比分
     *
     * @readonly
     * @memberof _Football
     */
    get HalfScore() {
        let res = {
            Home: "",
            Away: ""
        };
        if (this._halfScore) {
            let scores = this._halfScore.split(":");
            let result = new Array(2);

            return {
                Home: parseInt(scores[0]),
                Away: parseInt(scores[1])
            };
        }

        return res;
    }

    GetResult() {
        let res = super.GetResult();
        if (res !== undefined) return res;
        return super.ScoreToSimpleResult(super.Score) + "-" + super.ScoreToSimpleResult(this.HalfScore);
    }

    GetPlayTypeName() {
        return `半全场`;
    }

    GetBet(sg) {
        let result = "";
        let res = sg.split("-");
        for (let i = 0; i < res.length; i++) {
            if (res[i] == 3) {
                result += "胜";
            } else if (res[i] == 1) {
                result += "平";
            } else if (res[i] == 0) {
                result += "负";
            }
            if (i != res.length - 1) {
                result += "-";
            }
        }
        return result;
    }
}

/**
 * 总进球
 *
 * @class FootballZJQ
 * @extends {_Football}
 */
class FootballZJQ extends _Football {
    constructor(Score) {
        super(PlayTypeEnum.ZJQ, Score);
    }

    GetResult() {
        let res = super.GetResult();
        if (res !== undefined) return res;
        let total = super.Score.Home + super.Score.Away;

        return total >= 7 ? "7+球" : `${total}球`;
    }

    GetPlayTypeName() {
        return `总进球`;
    }

    GetBet(sg) {
        let result = "";
        result = sg + "球";
        return result;
    }
}

/**
 * 猜比分
 *
 * @class FootballCBF
 * @extends {_Football}
 */
class FootballCBF extends _Football {
    constructor(Score) {
        super(PlayTypeEnum.CBF, Score);
    }

    ScoreTextList = ["1:0", "2:0", "2:1", "3:0", "3:1", "3:2", "4:0", "4:1", "4:2", "5:0", "5:1", "5:2", "0:0", "1:1", "2:2", "3:3", "0:1", "0:2", "1:2", "0:3", "1:3", "2:3", "0:4", "1:4", "2:4", "0:5", "1:5", "2:5"].sort();

    GetResult() {
        let search = this.ScoreTextList.indexOf(super._score);
        if (search > -1) {
            return super._score;
        } else {
            if (super.Score.Home == super.Score.Away) {
                return "平其他";
            } else if (super.Score.Home > super.Score.Away) {
                return "胜其他";
            } else {
                return "负其他";
            }
        }
    }

    GetPlayTypeName() {
        return `猜比分`;
    }

    GetBet(sg) {
        let result = "";
        let search = this.ScoreTextList.indexOf(sg);

        if (search > -1) {
            result = sg;
        } else {
            let scores = super.GetScore(sg);
            if (scores.Home == scores.Away) {
                result = "平其他";
            } else if (scores.Home > scores.Away) {
                result = "胜其他";
            } else {
                result = "负其他";
            }
        }
        return result;
    }
}

/**
 * 上下单双
 *
 * @class FootballSXP
 * @extends {_Football}
 */
class FootballSXP extends _Football {
    constructor(Score) {
        super(PlayTypeEnum.SXP, Score);
    }

    GetResult() {
        //上单：上盘+单数，上盘指主队与客队总进球数结果大于或等于3，单数指主队与客队总进球数为奇数。
        //上双：上盘+双数，上盘指主队与客队总进球数结果大于或等于3，双数指主队与客队总进球数为偶数。
        //下单：下盘+单数，下盘指主队与客队总进球数结果小于3，单数指主队与客队总进球数为奇数。
        //下双：下盘+双数，下盘指主队与客队总进球数结果小于3，双数指主队与客队总进球数为偶数。
        let total = super.Score.Home + super.Score.Away;

        if (total >= 3) {
            if (total % 2 == 0) {
                return "上双";
            } else {
                return "上单";
            }
        } else {
            if (total % 2 == 0) {
                return "下双";
            } else {
                return "下单";
            }
        }
    }

    GetPlayTypeName() {
        return `上下单双`;
    }

    GetBet(sg) {
        let result = "";
        if (sg == 1) {
            result = "下单";
        } else if (sg == 2) {
            result = "上双";
        } else if (sg == 3) {
            result = "上单";
        } else if (sg == 0) {
            result = "下双";
        }
        return result;
    }
}

export const PlayTypeEnum = {
    /**
     *胜平负
     */
    SPF: 1,
    /**
     *让球胜平负
     */
    RQS: 2,
    /**
     *半全场
     */
    BQC: 3,
    /**
     *总进球
     */
    ZJQ: 4,
    /**
     *猜比分
     */
    CBF: 5,
    /**
     *上下单双
     */
    SXP: 6
};
