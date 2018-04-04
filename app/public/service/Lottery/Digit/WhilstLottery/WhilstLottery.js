import { Digit } from "../Digit";

/**
 * 时时彩
 *
 * @export
 * @class WhilstLottery
 * @extends {Digit}
 */
export class _WhilstLottery extends Digit {
    /**
     * 时时彩玩法
     *
     * @memberof _WhilstLottery
     */
    Type = null;

    /**
     * 复式玩法
     *
     * @memberof OneNumber
     */
    TypeCompound = null;

    /**
     * 已选
     *
     * @memberof _WhilstLottery
     */
    Selected = {
        first: [], //万
        second: [], //千
        third: [], //百
        fourth: [], //十
        fifth: [] //个
    };

    /**
     * 球盘-供选项
     * 
     * @memberof _WhilstLottery
     */
    Plate = {
        first: [], //万
        second: [], //千
        third: [], //百
        fourth: [], //十
        fifth: [] //个
    };

    /**
     * Creates an instance of _WhilstLottery.
     * @param {any} type
     * @param {any} type_compound
     * @memberof _WhilstLottery
     */
    constructor(type, type_compound = null) {
        super();
        this.Type = type;
        this.TypeCompound = type_compound;
    }

    /**
     * 初始化球盘
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns {object[]}
     * @memberof _WhilstLottery
     */
    Init(option = {}) {
        let first = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return { num: m };
        });
        let second = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return { num: m };
        });
        let third = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return { num: m };
        });
        let fourth = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return { num: m };
        });
        let fifth = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
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
            if (option.leaveout.fourth) {
                addLeaveout(fourth, "fourth");
            }
            if (option.leaveout.fifth) {
                addLeaveout(fifth, "fifth");
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
            first, //万
            second, //千
            third, //百
            fourth, //十
            fifth //个
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
     * @param {string} selected[].selected.fourth
     * @param {string} selected[].selected.fifth
     * @param {PlayTypeEnum} selected[].playType
     * @param {string} join
     * @param {string} join2
     * @returns
     * @memberof _WhilstLottery
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

    /**
     * 选择
     * 
     * @param {object} item 
     * @param {string} item.num
     * @param {string} type selected字段属性
     * @memberof _WhilstLottery
     */
    Select(item,type){
        let clickIndex = this.Selected[type].findIndex(m=>m==item);
        if (clickIndex > -1) {
            this.Selected[type].splice(clickIndex, 1);
        }else{
            this.Selected[type].push(item)
        }
    }
}
