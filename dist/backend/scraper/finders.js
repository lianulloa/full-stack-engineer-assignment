"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericFinder = void 0;
const genericFinder = (source, { valuesParentSelector, buySelector, sellSelector }) => {
    const getPrice = (element, query) => {
        var _a, _b;
        return Number((_b = (_a = element.querySelector(query)) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.replace(',', '.').replace('$', ''));
    };
    const valuesParent = document.querySelector(valuesParentSelector);
    if (valuesParent) {
        const buy_price = getPrice(valuesParent, buySelector);
        const sell_price = getPrice(valuesParent, sellSelector);
        if (buy_price && sell_price)
            return {
                buy_price,
                sell_price,
                source
            };
    }
};
exports.genericFinder = genericFinder;
