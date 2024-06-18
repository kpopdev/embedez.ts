"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedEZ = void 0;
const requests_1 = require("./requests");
const utils_1 = require("./utils");
class EmbedEZ {
    static setConfig(config) {
        this.config = Object.assign(Object.assign({}, this.config), config);
    }
}
exports.EmbedEZ = EmbedEZ;
EmbedEZ.utils = new utils_1.Utils();
EmbedEZ.config = {
    url: 'https://embedez.com',
    apiKey: '',
};
EmbedEZ.getSearchKey = requests_1.getSearchKey;
EmbedEZ.getPreview = requests_1.getPreview;
