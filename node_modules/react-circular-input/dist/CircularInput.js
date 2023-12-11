"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularInput = void 0;
var react_1 = __importStar(require("react"));
var utils_1 = require("./utils");
var CircularInputContext_1 = require("./CircularInputContext");
var CircularTrack_1 = require("./CircularTrack");
var CircularProgress_1 = require("./CircularProgress");
var CircularThumb_1 = require("./CircularThumb");
function CircularInput(_a) {
    var _b = _a.value, value = _b === void 0 ? 0.25 : _b, _c = _a.radius, radius = _c === void 0 ? 100 : _c, _d = _a.onChange, onChange = _d === void 0 ? function () { } : _d, _e = _a.onChangeEnd, onChangeEnd = _e === void 0 ? function () { } : _e, _f = _a.tabIndex, tabIndex = _f === void 0 ? 0 : _f, children = _a.children, props = __rest(_a, ["value", "radius", "onChange", "onChangeEnd", "tabIndex", "children"]);
    var containerRef = react_1.useRef(null);
    var size = radius * 2;
    var center = react_1.useMemo(function () { return ({ x: radius, y: radius }); }, [radius]);
    // Accessibility
    var _g = react_1.useState(false), isFocused = _g[0], setFocused = _g[1];
    var isReadonly = !onChange;
    var handleFocus = react_1.useCallback(function () {
        setFocused(true);
    }, []);
    var handleBlur = react_1.useCallback(function () {
        setFocused(false);
    }, []);
    var handleKeyDown = react_1.useCallback(function (e) {
        if (!isFocused)
            return;
        var keyCode = e.keyCode;
        // arrow up, arrow right, page up, space
        var isIncrement = keyCode === 38 ||
            keyCode === 39 ||
            keyCode === 33 ||
            keyCode === 32;
        // arrow down, arrow left, page down
        var isDecrement = keyCode === 40 || keyCode === 37 || keyCode === 34;
        if (isIncrement) {
            onChange(Math.min(1, value + 0.1));
        }
        if (isDecrement) {
            onChange(Math.max(0, value - 0.1));
        }
        if (isIncrement || isDecrement) {
            e.preventDefault();
        }
    }, [isFocused, onChange, value]);
    var accessibilityProps = {
        tabIndex: tabIndex,
        role: 'slider',
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
    };
    // Geometry utilities
    var getPointFromValue = react_1.useCallback(function (v) {
        return utils_1.polarToCartesian({
            center: center,
            angle: utils_1.valueToAngle(v || value),
            radius: radius,
        });
    }, [value, center, radius]);
    var getValueFromPointerEvent = react_1.useCallback(function (e) {
        return utils_1.calculateNearestValueToPoint({
            point: utils_1.absPos(e),
            container: utils_1.getElementPosition(containerRef.current),
            value: value,
            center: center,
            radius: radius,
        });
    }, [value, center, radius]);
    // Context
    var context = react_1.useMemo(function () { return ({
        value: value,
        radius: radius,
        center: center,
        isFocused: isFocused,
        setFocused: setFocused,
        onChange: onChange,
        onChangeEnd: onChangeEnd,
        getPointFromValue: getPointFromValue,
        getValueFromPointerEvent: getValueFromPointerEvent,
    }); }, [
        value,
        radius,
        center,
        onChange,
        onChangeEnd,
        isFocused,
        setFocused,
        getPointFromValue,
        getValueFromPointerEvent,
    ]);
    var handleClick = react_1.useCallback(function (e) {
        if (isReadonly)
            return;
        var nearestValue = getValueFromPointerEvent(e);
        onChange(nearestValue);
        onChangeEnd(nearestValue);
    }, [onChange, onChangeEnd, getValueFromPointerEvent, isReadonly]);
    var style = __assign(__assign({ overflow: 'visible', outline: 'none' }, (props.style || {})), { touchAction: 'manipulation', WebkitTapHighlightColor: 'rgba(0,0,0,0)' });
    return (react_1.default.createElement(CircularInputContext_1.CircularInputProvider, { value: context },
        react_1.default.createElement("svg", __assign({}, props, { ref: containerRef, width: size, height: size, viewBox: "0 0 " + size + " " + size, style: style, onClick: handleClick }, (!isReadonly ? accessibilityProps : {})), children ? (typeof children === 'function' ? (children(context)) : (children)) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(CircularTrack_1.CircularTrack, null),
            react_1.default.createElement(CircularProgress_1.CircularProgress, null),
            react_1.default.createElement(CircularThumb_1.CircularThumb, null))))));
}
exports.CircularInput = CircularInput;
//# sourceMappingURL=CircularInput.js.map