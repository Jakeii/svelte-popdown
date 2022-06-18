
export function calcTranslateX(
  position: string,
  triggerRight: number,
  triggerLeft: number,
  offsetLeft: number,
  triggerWidth: number,
) {

  if (position.indexOf('inner-right') > -1) {
    return `calc(${Math.floor(triggerRight - offsetLeft)}px - 100%)`;
  } else if (position.indexOf('outer-right') > -1) {
    return `${Math.floor(triggerRight - offsetLeft)}px`;
  } else if (position.indexOf('outer-left') > -1) {
    return `calc(${Math.floor(triggerLeft - offsetLeft)}px - 100%)`;
  } else if (position.indexOf('center') > -1) {
    return `calc(${Math.floor(triggerLeft - offsetLeft)}px - 50% + ${triggerWidth / 2}px)`;
  } else {
    // inner-left is default
    return `${Math.floor(triggerLeft- offsetLeft)}px`;
  }
}

export function calcTranslateY(
  position: string,
  triggerTop: number,
  offsetTop: number,
  triggerBottom: number,
  triggerHeight: number,
) {
  if (position.indexOf('above') > -1) {
    return `calc(${Math.floor(triggerTop - offsetTop)}px - 100%)`;
  } else if (position.indexOf('top') > -1) {
    return `${Math.floor(triggerTop - offsetTop)}px`;
  } else if (position.indexOf('below') > -1) {
    return `calc(${Math.floor(triggerBottom - offsetTop)}px)`;
  } else if (position.indexOf('middle') > -1) {
    return `calc(${Math.floor(triggerTop - offsetTop)}px - 50% + ${triggerHeight /2}px)`;
  } else if (position.indexOf('bottom') > -1) {
  // below is default
    return `calc(${Math.floor(triggerBottom - offsetTop)}px - 100%)`;
  }
}