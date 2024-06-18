"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJsonAction = exports.sendJsonResponse = exports.sendErrorAction = exports.sendErrorResponse = void 0;
/**
 * Sends an error response with the given status and message.
 *
 * @param {number} status - The HTTP status code of the error response.
 * @param {string} message - The error message to be included in the response.
 * @returns {object} - The error response object.
 */
const sendErrorResponse = (status, message) => {
    return Response.json({
        success: false,
        status: status,
        message: message,
    }, {
        status: status,
        statusText: message,
    });
};
exports.sendErrorResponse = sendErrorResponse;
const sendErrorAction = (status, message) => {
    return {
        success: false,
        status: status,
        message: message,
    };
};
exports.sendErrorAction = sendErrorAction;
/**
 * Creates a JSON response object with optional status code.
 *
 * @param {any} data - The data to be included in the response.
 * @param {number} [code] - The optional status code for the response.
 * @returns {object} - The JSON response object.
 */
const sendJsonResponse = (data, code) => {
    return Response.json({
        success: true,
        data: data,
    }, {
        status: code,
    });
};
exports.sendJsonResponse = sendJsonResponse;
const sendJsonAction = (data, code) => {
    return {
        success: true,
        data: data,
    };
};
exports.sendJsonAction = sendJsonAction;
//# sourceMappingURL=responces.js.map