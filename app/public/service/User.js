import cookies from "public/utils/cookies";
import link from "public/config/link";
import { getParamsCode } from "public/utils/getParamsCode";

/**
 * 用户类
 *
 * @class User
 */
class User {
    /**
     * 用户信息
     * @type {Object}
     */
    info = cookies.get("userInfo") || {};

    initPromise = null;

    loginEvent = null;

    logoutEvent = null;

    /**
     * Creates an instance of User.
     * @memberof User
     */
    constructor() {
        this._initBaseInfo().then(res => {
            this.info = res;
        });
    }

    /**
     *  是否登录
     *
     * @readonly
     * @memberof User
     */
    get isLogin() {
        return this.info.isLogin;
    }

    /**
     * 是否登录-异步
     * @method isLoginAsync
     * @return {Boolean}    [description]
     */
    get isLoginAsync() {
        return this.initPromise.then(res => {
            return this.info.isLogin;
        });
    }

    /**
     *  初始化用户信息
     *
     * @memberof User
     */
    _initBaseInfo() {
        this.initPromise = new Promise((resolve, reject) => {
            import("public/fetch/instance/crypto-instance").then(async fetch => {
                let info = cookies.get("userInfo") || {};
                this.info = info;

                let res = await fetch.default.post("userApi", { action: 107, params: JSON.stringify({}) });

                if (res.code == 0) {
                    info = Object.assign(info, res.data);
                    info.Balance = res.data.Balance.toFixed(2);
                    info.isLogin = true;
                } else if (res.code == -2) {
                    info.isLogin = false;
                    cookies.remove("userInfo");
                }
                info.frm = cookies.get("from") || getParamsCode("frm") || "zz";
                resolve(info);
            });
        });
        return this.initPromise;
    }

    /**
     * 用户名登录
     * @method login
     * @param  {string} name 用户名
     * @param  {string} pwd  密码
     * @return {Promise}      [description]
     */
    login(name, pwd) {
        return import("public/fetch/instance/crypto-instance").then(async fetch => {
            let res = await fetch.default.post("userApi", {
                action: 1011,
                params: JSON.stringify({
                    name: name,
                    pw: pwd,
                    usertype: 1
                })
            });

            this._loginAfter(res);

            return res;
        });
    }

    /**
     * 手机号快捷登录
     * @method loginWithPhone
     * @param  {[type]}       phone [description]
     * @param  {[type]}       code  [description]
     * @return {[type]}             [description]
     */
    loginWithPhone(phone, code) {
        return import("public/fetch/instance/crypto-instance").then(async fetch => {
            let res = await fetch.default.post("userApi", {
                action: 1016,
                params: JSON.stringify({
                    mobile: phone,
                    verifycode: code
                })
            });

            this._loginAfter(res);

            return res;
        });
    }

    /**
     * 多账号选择登录
     * @method loginWithMultAccount
     * @param  {string}             phone    手机号
     * @param  {string}             userName 用户名
     * @return {Promise}                      [description]
     */
    loginWithMultAccount(phone, userName) {
        return import("public/fetch/instance/crypto-instance").then(async fetch => {
            let res = await fetch.default.post("userApi", {
                action: 1015,
                params: JSON.stringify({
                    mobile: phone,
                    username: userName
                })
            });

            this._loginAfter();

            return res;
        });
    }

    /**
     * 登出
     * @method logout
     * @return {[type]} [description]
     */
    logout() {
        return import("public/fetch/instance/crypto-instance").then(async fetch => {
            try {
                let res = await fetch.default.post("userApi", {
                    action: 110,
                    params: JSON.stringify({})
                });
            } catch (e) {
            } finally {
                cookies.remove("userInfo");
                this.info.isLogin = false;
                window.location.href = "/lottery/#/login";

                if (this.logoutEvent) {
                    this.logoutEvent(res);
                }
            }
            return res;
        });
    }

    /**
     * 登录成功回调
     * @method _loginAfter
     * @return {[type]}     [description]
     */
    _loginAfter(res) {
        if (res.code == 0) {
            if (res.code == 0) {
                cookies.set("userInfo", JSON.stringify(res.data));
            }

            this.refresh().then(info => {
                if (this.loginEvent) {
                    this.loginEvent(info);
                }
            });
        } else {
            if (this.loginEvent) {
                this.loginEvent(this.info);
            }
        }
    }

    /**
     * 订阅登录事件
     * @method subscribeLogin
     * @return {[type]}       [description]
     */
    subscribeLogin(cb) {
        this.loginEvent = cb;
    }

    /**
     * 订阅登出事件
     * @method subscribeLogout
     * @return {[type]}        [description]
     */
    subscribeLogout(cb) {
        this.logoutEvent = cb;
    }

    /**
     * 重新获取基本信息
     *
     * @memberof User
     */
    refresh() {
        return this._initBaseInfo();
    }
}

export default class {
    _instance = null;

    constructor() {
        throw Error("cant create instance");
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new User();
        }

        window.user = this._instance;
        return this._instance;
    }
}
