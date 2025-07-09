const createListener = (node: HTMLElement, cb: (e: MouseEvent) => unknown) => (e: MouseEvent) => {
  if (node.contains(e.target as Node)) {
    return;
  }
  cb(e);
};

const onClickOutside = (node: HTMLElement, cb: (e: MouseEvent) => unknown) => {
  const listener = createListener(node, cb);
  window.addEventListener('click', listener);

  return {
    update: (cb: (e: MouseEvent) => unknown) => {
      window.removeEventListener('click', listener);
      const newListener = createListener(node, cb);
      window.addEventListener('click', newListener);
    },
    destroy: () => window.removeEventListener('click', listener),
  };
};

export { onClickOutside };
