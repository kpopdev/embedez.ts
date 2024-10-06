"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    checkForSocialMediaContent(input) {
        const regex = /(tiktok|instagram|twitter|x\.com|reddit|ifunny|youtu\w*)/g;
        const check = input.match(regex);
        return check !== null;
    }
    extractIdFromUrl(pattern, url) {
        const paramNames = pattern.match(/:[a-zA-Z0-9_]+/g) || [];
        const regexPattern = pattern.replace(/:[a-zA-Z0-9_]+/g, "([.a-zA-Z0-9_-]+)");
        const regex = new RegExp(regexPattern);
        const match = url.match(regex);
        if (match) {
            const extractedValues = match.slice(1);
            if (extractedValues.length !== paramNames.length) {
                throw new Error("Mismatch in the number of extracted values and placeholders.");
            }
            const result = {};
            paramNames.forEach((paramName, index) => {
                const paramNameKey = paramName.slice(1);
                const extractedValue = extractedValues[index];
                result[paramNameKey] = extractedValue;
            });
            return result;
        }
        return {};
    }
}
exports.Utils = Utils;
//# sourceMappingURL=index.js.map