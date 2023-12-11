"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementPosition = exports.stopEvent = exports.absPos = exports.valueToAngle = exports.calcAngleDiff = exports.calculateNearestValueToPoint = exports.clamp = exports.matrixScale = exports.degrees = exports.radians = exports.polarToCartesian = exports.ANGLE_OFFSET = exports.DEG_360_IN_RAD = void 0;
exports.DEG_360_IN_RAD = radians(360);
exports.ANGLE_OFFSET = Math.PI;
function polarToCartesian(_a) {
    var center = _a.center, angle = _a.angle, radius = _a.radius;
    return {
        x: center.x + Math.sin(angle) * radius,
        y: center.y + Math.cos(angle) * radius,
    };
}
exports.polarToCartesian = polarToCartesian;
function radians(deg) {
    return (deg * Math.PI) / 180;
}
exports.radians = radians;
function degrees(rad) {
    return (rad * 180) / Math.PI;
}
exports.degrees = degrees;
function matrixScale(scale, x, y) {
    return "matrix(" + scale + ", 0, 0, " + scale + ", " + (x - scale * x) + ", " + (y - scale * y) + ")";
}
exports.matrixScale = matrixScale;
function clamp(min, max, value) {
    return Math.min(Math.max(value, min), max);
}
exports.clamp = clamp;
function calculateNearestValueToPoint(_a) {
    var _b = _a.center, centerX = _b.x, centerY = _b.y, _c = _a.container, containerX = _c.x, containerY = _c.y, _d = _a.point, pointX = _d.x, pointY = _d.y, radius = _a.radius, value = _a.value;
    var radialPosition = {
        x: pointX - containerX - centerX,
        y: -(pointY - containerY - centerY),
    };
    var valuePosition = polarToCartesian({
        center: { x: 0, y: 0 },
        angle: valueToAngle(value),
        radius: radius,
    });
    var deltaTheta = calcAngleDiff(radialPosition.x, radialPosition.y, valuePosition.x, -valuePosition.y);
    var deltaValue = value + deltaTheta / 360;
    var nearestValue = deltaValue > 1 ? deltaValue - 1 : deltaValue;
    return nearestValue;
}
exports.calculateNearestValueToPoint = calculateNearestValueToPoint;
function calcAngleDiff(x1, y1, x2, y2) {
    var arcTangent = Math.atan2(x1 * y2 - y1 * x2, x1 * x2 + y1 * y2);
    if (arcTangent < 0) {
        arcTangent += 2 * Math.PI;
    }
    return (arcTangent * 180) / Math.PI;
}
exports.calcAngleDiff = calcAngleDiff;
function valueToAngle(value) {
    return -value * exports.DEG_360_IN_RAD + exports.ANGLE_OFFSET;
}
exports.valueToAngle = valueToAngle;
function absPos(e) {
    var touchEvent = e.touches && e;
    if (touchEvent) {
        return {
            x: touchEvent.changedTouches[0].pageX -
                (window.scrollX || window.pageXOffset),
            y: touchEvent.changedTouches[0].pageY -
                (window.scrollY || window.pageYOffset),
        };
    }
    var mouseEvent = e.pageX && e;
    if (mouseEvent) {
        return {
            x: mouseEvent.pageX - (window.scrollX || window.pageXOffset),
            y: mouseEvent.pageY - (window.scrollY || window.pageYOffset),
        };
    }
    throw new Error('Unknown event type received (expected: MouseEvent | TouchEvent)');
}
exports.absPos = absPos;
function stopEvent(e) {
    e.stopPropagation();
    e.preventDefault();
}
exports.stopEvent = stopEvent;
function getElementPosition(el) {
    if (!el)
        return;
    var _a = el.getBoundingClientRect(), x = _a.left, y = _a.top;
    return { x: x, y: y };
}
exports.getElementPosition = getElementPosition;
//# sourceMappingURL=utils.js.map