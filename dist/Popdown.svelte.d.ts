import { SvelteComponent } from "svelte";
import { type CalcPosition } from './stores/popdown';
declare const __propDef: {
    props: {
        contentClass?: string | undefined;
        position?: string | undefined;
        target?: string | HTMLElement | undefined;
        showContent?: boolean | undefined;
        calcLeft?: CalcPosition | null | undefined;
        calcTop?: CalcPosition | null | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        trigger: {};
        content: {};
    };
};
export type PopdownProps = typeof __propDef.props;
export type PopdownEvents = typeof __propDef.events;
export type PopdownSlots = typeof __propDef.slots;
export default class Popdown extends SvelteComponent<PopdownProps, PopdownEvents, PopdownSlots> {
}
export {};
