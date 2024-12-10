"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCombined = exports.getPreview = exports.getSearchKey = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("..");
const responces_1 = require("../responces");
const getSearchKey = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield (0, axios_1.default)({
        url: `${__1.EmbedEZ.config.url}/api/v1/providers/search`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${__1.EmbedEZ.config.apiKey}`,
        },
        params: {
            url: input
        },
        validateStatus: () => true,
    });
    if (!request.data.success) {
        return (0, responces_1.sendErrorAction)(request.status || 500, request.data.message || "bad request");
    }
    return (0, responces_1.sendJsonAction)(request.data.data);
});
exports.getSearchKey = getSearchKey;
const getPreview = (search_key) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield (0, axios_1.default)({
        url: `${__1.EmbedEZ.config.url}/api/v1/providers/preview`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${__1.EmbedEZ.config.apiKey}`,
        },
        params: {
            search_key: search_key
        },
        validateStatus: () => true,
    });
    if (!request.data.success) {
        return (0, responces_1.sendErrorAction)(request.status || 500, request.data.message || "bad request");
    }
    return (0, responces_1.sendJsonAction)(request.data.data);
});
exports.getPreview = getPreview;
const getCombined = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield (0, axios_1.default)({
        url: `${__1.EmbedEZ.config.url}/api/v1/providers/preview`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${__1.EmbedEZ.config.apiKey}`,
        },
        params: {
            q: input
        },
        validateStatus: () => true,
    });
    if (!request.data.success) {
        return (0, responces_1.sendErrorAction)(request.status || 500, request.data.message || "bad request");
    }
    return (0, responces_1.sendJsonAction)(request.data.data);
});
exports.getCombined = getCombined;
//# sourceMappingURL=index.js.map