"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    checkForSocialMediaContent(input) {
        const regex = /(tiktok|instagram|twitter|x\.com|reddit|ifunny|youtu\w*)/g;
        const check = input.match(regex);
        return check !== null;
    }
}
exports.Utils = Utils;
