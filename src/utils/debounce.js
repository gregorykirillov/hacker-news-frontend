export const debounce = (func, time) => {
    let tid;

    return (...args) => {
        if (tid) {
            clearTimeout(tid);
        }

        tid = setTimeout(() => func(...args), time);
    };
};
