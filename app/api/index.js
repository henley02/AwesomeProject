import $fetch from "../public/fetch/index";

/**
 * 首页数据
 * @param {*} params
 * @param {*} config
 */
export const FetchIndex = config => $fetch.post("javaAppadmin", {action: 90333, params: JSON.stringify({})}, config);


/**
 * 更多彩种
 * @param {*} params
 * @param {*} config
 */
export const FetchMoreLottery = config => $fetch.post("javaAppadmin", {
    action: 90334,
    params: JSON.stringify({})
}, config);


/**
 * 获取数字彩当期数据
 *
 * @param {any} params
 * @param {any} config
 */
export const FetchDigitCurrent = (params, config) => $fetch.post("javaBd", {
    action: 200,
    params: JSON.stringify(params)
}, config);

/**
 * 获取数字彩历史数据
 *
 * @param {any} params
 * @param {any} config
 */
export const FetchDigitHistory = (params, config) => $fetch.post("javaBd", {
    action: 301,
    params: JSON.stringify(params)
}, config);

/**
 * 获取竞足对阵
 * @param config
 * @constructor
 */
export const GetJz = (params, config) => $fetch.post("javaBd", {action: 2022, params: JSON.stringify(params)}, config);

/**
 * 获取竞彩篮球对阵
 * @param params
 * @param config
 * @constructor
 */
export const GetLQ = (params, config) => $fetch.post("javaBd", {action: 2031, params: JSON.stringify(params)}, config);

/**
 * 获取彩金卡数据
 *
 * @param {any} params
 * @param {any} config
 */
export const FetchVoucher = (params, config) => $fetch.post("javaCjk", {
    action: 405,
    params: JSON.stringify(params)
}, config);

/**
 * 获取账户余额数据
 *
 * @param {any} params
 * @param {any} config
 */
export const FetchBalance = (params, config) => $fetch.post("javaTride", {
    action: 1071,
    params: JSON.stringify(params)
}, config);

/**
 * 投注下单
 *
 * @param {any} params
 * @param {any} config
 */
export const Bet = (params, config) => $fetch.post("javaOrder", {action: 207, params: JSON.stringify(params)}, config);

/**
 * 获取支付方式列表
 *
 * @param {any} params
 * @param {any} config
 */
export const FetchPayWayList = config => $fetch.post("javaAppadmin", {action: 71, params: JSON.stringify({})}, config);

/**
 * 支付
 *
 * @param {any} params
 * @param {any} config
 */
export const Pay = (params, config) => $fetch.post("javaTride", {action: 108, params: JSON.stringify(params)}, config);

/**
 * 充值状态查询
 * @param {*} params
 * @param {*} config
 */
export const FetchRechargeStatus = (params, config) => $fetch.post("javaTride", {
    action: 1084,
    params: JSON.stringify(params)
}, config);

/**
 * 获取晒单列表
 * @param {*} params
 * @param {*} config
 */
export const FetchShareList = (params, config) => $fetch.post("infoApi", {
    action: 5010,
    params: JSON.stringify(params)
}, config);

/**
 * 获取晒单详情
 * @param {*} params
 * @param {*} config
 */
export const FetchShareDetail = (params, config) => $fetch.post("infoApi", {
    action: 5002,
    params: JSON.stringify(params)
}, config);

/**
 * 获取晒单评论
 * @param {*} params
 * @param {*} config
 */
export const FetchShareComment = (params, config) => $fetch.post("infoApi", {
    action: 100301,
    params: JSON.stringify(params)
}, config);

/**
 * 发表晒单评论
 * @param {*} params
 * @param {*} config
 */
export const CommentShareDetail = (params, config) => $fetch.post("infoApi", {
    action: 100302,
    params: JSON.stringify(params)
}, config);

/**
 * 晒单点赞
 * @param {*} params
 * @param {*} config
 */
export const LikeShareDetail = (params, config) => $fetch.post("infoApi", {
    action: 5003,
    params: JSON.stringify(params)
}, config);

/**
 * 举报
 * @param {any} params
 * @param {any} config
 */
export const Report = (params, config) => $fetch.post("infoApi", {
    action: 5008,
    params: JSON.stringify(params)
}, config);

/**
 * 获取开奖列表
 * @param {any} config
 */
export const FetchResultList = config => $fetch.post("javaAppadmin", {action: 300, params: JSON.stringify({})}, config);

/**
 * 获取开奖列表悬浮广告
 * @param {any} config
 */
export const FetchResultFloatAD = config => $fetch.post("javaAppadmin", {
    action: 903305,
    params: JSON.stringify({})
}, config);

/**
 * 获取数字彩开奖详情
 * @param {any} params
 * @param {any} config
 */
export const FetchDigitResultDetail = (params, config) => $fetch.post("javaBd", {
    action: 302,
    params: JSON.stringify(params)
}, config);

/**
 * 获取竞彩足球开奖详情
 * @param {any} params
 * @param {any} config
 */
export const FetchFootballResultDetail = (params, config) => $fetch.post("javaBd", {
    action: 310,
    params: JSON.stringify(params)
}, config);

/**
 * 获取竞彩篮球开奖详情
 * @param {any} params
 * @param {any} config
 */
export const FetchBasketballResultDetail = (params, config) => $fetch.post("javaBd", {
    action: 311,
    params: JSON.stringify(params)
}, config);

/**
 * 获取北京单场开奖详情
 * @param {any} params
 * @param {any} config
 */
export const FetchBeiJingResultDetail = (params, config) => $fetch.post("javaBd", {
    action: 312,
    params: JSON.stringify(params)
}, config);

/**
 * 获取竞技彩期次列表
 * @param {any} params
 * @param {any} config
 */
export const FetchAthleticsHistory = (params, config) => $fetch.post("javaBd", {
    action: 313,
    params: JSON.stringify(params)
}, config);

/**
 * 获取竞技彩期次列表
 * @param {any} params
 * @param {any} config
 */
export const FetchSchemeDetail = (params, config) => $fetch.post("javaOrder", {
    action: 2102,
    params: JSON.stringify(params)
}, config);

/**
 * 获取活动列表
 * @param {any} params
 * @param {any} config
 */
export const FetchActivityList = (params, config) => $fetch.post("javaAppadmin", {
    action: 9006,
    params: JSON.stringify(params)
}, config);
