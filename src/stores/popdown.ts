import { derived, type Readable } from 'svelte/store';
import { calcTranslateX, calcTranslateY } from '../util/popdown-translate';

export const createDropdownTransformStyleStore = (
  windowSize: Readable<number[]>,
  scrollParent: Readable<HTMLElement>,
  trigger: Readable<HTMLElement>,
  calcLeft: (triggerPosition: number) => number,
  calcTop: (triggerPosition: number) => number,
  position: string,
) => {
  // calculates the position of the dropdown relative to the scrollable ancestor/body
  const ancestorOffset: Readable<{left: number, top: number}> = derived(scrollParent, ($scrollParent: HTMLElement, set) => {
    const onScroll = function(this: HTMLElement) {
      const { left, top } = this.getBoundingClientRect() || {
        left: 0,
        top: 0,
      };
      const scrollLeft = this.tagName !== 'HTML' ? this.scrollLeft : 0;
      const scrollTop = this.tagName !== 'HTML' ? this.scrollTop : 0;
      set({
        left: left - scrollLeft,
        top: top - scrollTop,
      });
    };
    if ($scrollParent) {
      $scrollParent.addEventListener('scroll', onScroll);
    } else {
      scrollParent.subscribe(($scrollParent) => {
        if ($scrollParent) {
          onScroll.call($scrollParent);
          $scrollParent.addEventListener('scroll', onScroll);
        }
      });
    }
    return () => $scrollParent?.removeEventListener('scroll', onScroll);
  },
  );

  return derived(
    [ windowSize, trigger, ancestorOffset ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([ _windowSize, $trigger, $ancestorOffset ]) => {
      let translateX = '';
      let translateY = '';
      if ($trigger) {
        const { left: triggerLeft, right: triggerRight, top: triggerTop, bottom: triggerBottom, width: triggerWidth, height: triggerHeight } = $trigger.getBoundingClientRect();

        const { left: offsetLeft, top: offsetTop } = $ancestorOffset || {
          left: 0,
          top: 0,
        };

        if (calcLeft) {
          translateX = '' + calcLeft(triggerLeft);
        } else {
          translateX = calcTranslateX(position, triggerRight, triggerLeft, offsetLeft, triggerWidth);
        }

        if (calcTop) {
          translateY = '' + calcTop(triggerLeft);
        } else {
          translateY = calcTranslateY(position, triggerTop, offsetTop, triggerBottom, triggerHeight);
        }

        return `translate(${translateX}, ${translateY})`;
      }
      return '';
    },

  );
};