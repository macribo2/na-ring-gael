import { SetStateAction, Dispatch } from 'react';
import { Coordinates } from './utils';
export declare type CircularInputContext = {
    value: number;
    radius: number;
    center: Coordinates;
    isFocused: boolean;
    setFocused: Dispatch<SetStateAction<boolean>>;
    onChange: (value: number) => void;
    onChangeEnd: (value: number) => void;
    getPointFromValue: (v?: number) => Coordinates | null;
    getValueFromPointerEvent: (...args: Parameters<EventListener>) => number;
};
export declare const CircularInputProvider: import("react").Provider<CircularInputContext>;
export declare function useCircularInputContext(): CircularInputContext;
