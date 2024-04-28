const createListener = (node, cb) => (e) => {
    if (node.contains(e.target)) {
        return;
    }
    cb();
};
const onClickOutside = (node, cb) => {
    const listener = createListener(node, cb);
    window.addEventListener('click', listener);
    return {
        update: (cb) => {
            window.removeEventListener('click', listener);
            const newListener = createListener(node, cb);
            window.addEventListener('click', newListener);
        },
        destroy: () => window.removeEventListener('click', listener),
    };
};
export { onClickOutside };
