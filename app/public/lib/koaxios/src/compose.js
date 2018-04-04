function compose(middleware) {
    return function(context, next) {
        // last called middleware #
        let index = -1;
        return dispatch(0);
        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error("next() called multiple times"));
            index = i;
            const fn = middleware[i] || next;
            if (!fn) return Promise.resolve();
            try {
                return Promise.resolve(
                    fn(context, function next() {
                        return dispatch(i + 1);
                    })
                );
            } catch (err) {
                return Promise.reject(err);
            }
        }
    };
}


export default compose;