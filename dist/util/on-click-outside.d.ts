declare const onClickOutside: (node: HTMLElement, cb: () => void) => {
    update: (cb: () => void) => void;
    destroy: () => void;
};
export { onClickOutside };
