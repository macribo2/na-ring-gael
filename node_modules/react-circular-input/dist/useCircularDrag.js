"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCircularDrag = void 0;
var react_1 = require("react");
var _1 = require("./");
function useCircularDrag(ref) {
    var _a = _1.useCircularInputContext(), onChange = _a.onChange, onChangeEnd = _a.onChangeEnd, getValueFromPointerEvent = _a.getValueFromPointerEvent;
    var _b = react_1.useState(false), isDragging = _b[0], setDragging = _b[1];
    var handleStart = react_1.useCallback(function (e) {
        if (!onChange)
            return;
        stopEvent(e);
        setDragging(true);
        var nearestValue = getValueFromPointerEvent(e);
        onChange(nearestValue);
    }, [onChange, setDragging, getValueFromPointerEvent]);
    var handleMove = react_1.useCallback(function (e) {
        stopEvent(e);
        var nearestValue = getValueFromPointerEvent(e);
        onChange(nearestValue);
    }, [onChange, getValueFromPointerEvent]);
    var handleEnd = react_1.useCallback(function (e) {
        stopEvent(e);
        setDragging(false);
        if (!onChangeEnd)
            return;
        var nearestValue = getValueFromPointerEvent(e);
        onChangeEnd(nearestValue);
    }, [onChangeEnd, getValueFromPointerEvent]);
    // we can't just use React for this due to needing { passive: false } to prevent touch devices scrolling
    react_1.useEffect(function () {
        var node = ref.current;
        if (!node)
            return;
        addStartListeners(node, handleStart);
        return function () {
            if (!node)
                return;
            removeStartListeners(node, handleStart);
        };
    }, [ref, handleStart]);
    react_1.useEffect(function () {
        if (!isDragging)
            return;
        addListeners(handleMove, handleEnd);
        return function () {
            removeListeners(handleMove, handleEnd);
        };
    }, [isDragging, handleMove, handleEnd]);
    return { isDragging: isDragging };
}
exports.useCircularDrag = useCircularDrag;
function addStartListeners(element, onStart) {
    element.addEventListener('mousedown', onStart, { passive: false });
    element.addEventListener('touchstart', onStart, { passive: false });
}
function removeStartListeners(element, onStart) {
    element.removeEventListener('mousedown', onStart);
    element.removeEventListener('touchstart', onStart);
}
function addListeners(onMove, onEnd) {
    document.addEventListener('mousemove', onMove, { passive: false });
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd, { passive: false });
    document.addEventListener('touchend', onEnd, { passive: false });
}
function removeListeners(onMove, onEnd) {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('mouseup', onEnd);
    document.removeEventListener('touchend', onEnd);
}
var stopEvent = function (e) {
    e.stopPropagation();
    if (e.cancelable) {
        e.preventDefault();
    }
};
//# sourceMappingURL=useCircularDrag.js.map