"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCircularInputContext = exports.CircularInputProvider = void 0;
var react_1 = require("react");
var Context = react_1.createContext({});
exports.CircularInputProvider = Context.Provider;
function useCircularInputContext() {
    var context = react_1.useContext(Context);
    if (!context) {
        throw new Error("CircularInput components cannot be rendered outside the CircularInput component");
    }
    return context;
}
exports.useCircularInputContext = useCircularInputContext;
//# sourceMappingURL=CircularInputContext.js.map