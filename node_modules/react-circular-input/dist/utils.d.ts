import { MouseEvent, TouchEvent } from 'react';
export declare const DEG_360_IN_RAD: number;
export declare const ANGLE_OFFSET: number;
export declare type Coordinates = {
    x: number;
    y: number;
};
export declare function polarToCartesian({ center, angle, radius, }: {
    center: Coordinates;
    angle: number;
    radius: number;
}): Coordinates;
export declare function radians(deg: number): number;
export declare function degrees(rad: number): number;
export declare function matrixScale(scale: number, x: number, y: number): string;
export declare function clamp(min: number, max: number, value: number): number;
export declare function calculateNearestValueToPoint({ center: { x: centerX, y: centerY }, container: { x: containerX, y: containerY }, point: { x: pointX, y: pointY }, radius, value, }: {
    center: Coordinates;
    container: Coordinates;
    point: Coordinates;
    radius: number;
    value: number;
}): number;
export declare function calcAngleDiff(x1: number, y1: number, x2: number, y2: number): number;
export declare function valueToAngle(value: number): number;
export declare function absPos(e: TouchEvent | MouseEvent): {
    x: number;
    y: number;
};
export declare function stopEvent(e: Event | MouseEvent | TouchEvent): void;
export declare function getElementPosition(el?: Element | null): {
    x: number;
    y: number;
} | undefined;
