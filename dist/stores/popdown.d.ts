/// <reference types="svelte" />
import { type Readable, type Writable } from 'svelte/store';
export type CalcPosition = (triggerPosition: number) => number;
export declare const createContentTransformStyleStore: (windowSize: Readable<number[]>, scrollParent: Readable<HTMLElement>, trigger: Writable<HTMLElement>, calcLeft: CalcPosition | null, calcTop: CalcPosition | null, position: string) => Readable<string>;
