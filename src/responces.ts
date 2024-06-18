/**
 * Sends an error response with the given status and message.
 *
 * @param {number} status - The HTTP status code of the error response.
 * @param {string} message - The error message to be included in the response.
 * @returns {object} - The error response object.
 */
export const sendErrorResponse = (status: number, message: string) => {
  return Response.json(
    {
      success: false,
      status: status,
      message: message,
    },
    {
      status: status,
      statusText: message,
    },
  );
};
export const sendErrorAction = (status: number, message: string): ErrorResult => {
  return {
    success: false,
    status: status,
    message: message,
  }
};
export type ErrorResult = { success: false; message: string; status?: number };

/**
 * Creates a JSON response object with optional status code.
 *
 * @param {any} data - The data to be included in the response.
 * @param {number} [code] - The optional status code for the response.
 * @returns {object} - The JSON response object.
 */
export const sendJsonResponse = (data: any, code?: number) => {
  return Response.json(
    {
      success: true,
      data: data,
    },
    {
      status: code,
    },
  );
};

export const sendJsonAction = (data: any, code?: number): JsonResult => {
  return {
    success: true,
    data: data,
  }
};

export type JsonResult<T = any> = { success: true; data: T };