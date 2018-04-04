import Koaxios from "./koaxios";

class KoaxiosGenerator {
    _option = null;

    _interceptors = {
        request: [],
        response: []
    };

    /**
     * 拦截器插件
     *
     * @memberof KoaxiosGenerator
     */
    interceptors = {
        request: {
            use: interceptor => {
                this._interceptors.request.push(interceptor);
            }
        },
        response: {
            use: interceptor => {
                this._interceptors.response.push(interceptor);
            }
        }
    };

    /**
     * Creates an instance of KoaxiosGenerator.
     * @param {object} option
     * @memberof KoaxiosGenerator
     */
    constructor(option = {}) {
        this._option = option;
    }

    /**
     * 生成axios实例
     *
     * @returns
     * @memberof KoaxiosGenerator
     */
    create(opt = {}) {
        let instance = new Koaxios(merge({},this._option, opt), this._interceptors);

        return instance;
    }
}

/**
 * 合并
 * @param {*} target
 */
const merge = function(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }

    return target;
};

export default KoaxiosGenerator;
