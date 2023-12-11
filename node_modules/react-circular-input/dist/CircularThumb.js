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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularThumb = void 0;
var react_1 = __importStar(require("react"));
var _1 = require("./");
var CircularThumb = function (props) {
    var _a = _1.useCircularInputContext(), getPointFromValue = _a.getPointFromValue, isFocused = _a.isFocused;
    var ref = react_1.useRef(null);
    var isDragging = _1.useCircularDrag(ref).isDragging;
    var point = getPointFromValue();
    if (!point)
        return null;
    var x = point.x, y = point.y;
    var style = __assign({ transition: 'r 150ms cubic-bezier(0.215, 0.61, 0.355, 1)' }, (props.style || {}));
    return (react_1.default.createElement("circle", __assign({ r: isFocused || isDragging ? 23 : 20, fill: "#0045e5" }, props, { style: style, ref: ref, cx: x, cy: y })));
};
exports.CircularThumb = CircularThumb;
//# sourceMappingURL=CircularThumb.js.map