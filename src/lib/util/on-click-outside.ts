const createListener = (node: HTMLElement, cb: (e: MouseEvent) => unknown) => (e: MouseEvent) => {
  if (node.contains(e.target as Node)) {
    return;
  }
  cb(e);
};

const onClickOutside = (node: HTMLElement, cb: () => void) => {
  const listener = createListener(node, cb);
  window.addEventListener('click', listener);

  return {
    update: (cb: () => void) => {
      window.removeEventListener('click', listener);
      const newListener = createListener(node, cb);
      window.addEventListener('click', newListener);
    },
    destroy: () => window.removeEventListener('click', listener),
  };
};

export { onClickOutside };
