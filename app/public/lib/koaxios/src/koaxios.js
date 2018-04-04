import axios from "axios";
import compose from "./compose";

class Koaxios {
    _instance = null;

    _interceptors = {
        request: [],
        response: []
    };

    get _interceptorsHandler() {
        return {
            request: this._interceptors.request.filter(m => m[0]).map(m => m[0]),
            response: this._interceptors.response.filter(m => m[0]).map(m => m[0])
        };
    }

    get _interceptorsErrorHandler() {
        return {
            request: this._interceptors.request.filter(m => m[1]).map(m => m[1]),
            response: this._interceptors.response.filter(m => m[1]).map(m => m[1])
        };
    }

    /**
     * axios.defaults代理
     *
     * @memberof Axios
     */
    defaults = {};

    constructor(option, interceptors = { request: [], response: [] }) {
        this._instance = axios.create(option);
        this._interceptors.request = interceptors.request.map(m => m);
        this._interceptors.response = interceptors.response.map(m => m);
        this._initInterceptors();
        this._initProxy();
    }

    /**
     * 拦截器插件
     *
     * @memberof Axios
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
    }

    /**
     * 初始化axios实例代理
     *
     * @memberof Axios
     */
    _initProxy() {
        let methods = ["delete", "get", "head", "options", "patch", "post", "put", "request"];
        methods.forEach(item => {
            this[item] = (...args) => {
                return this._instance[item](...args);
            };
        });

        this.defaults = this._instance.defaults;
    }

    /**
     * 初始化拦截器
     *
     * @memberof Axios
     */
    _initInterceptors() {
        this._instance.interceptors.request.use(
            config => {
                return compose(this._interceptorsHandler.request)(config).then((conf) => {
                    return conf||config;
                });
            },
            error => {
                return compose(this._interceptorsErrorHandler.request)(error).then(() => {
                    return Promise.reject(error);
                });
            }
        );

        this._instance.interceptors.response.use(
            response => {
                return compose(this._interceptorsHandler.response)(response).then((res) => {
                    return res||response;
                });
            },
            error => {
                return compose(this._interceptorsErrorHandler.response)(error).then(() => {
                    return Promise.reject(error);
                });
            }
        );
    }
}

export default Koaxios;
