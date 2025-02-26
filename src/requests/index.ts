import axios from "axios";
import { EmbedEZ } from "..";
import {
  ErrorResult,
  JsonResult,
  sendErrorAction,
  sendJsonAction,
} from "../responces";
import { SearchResult, EmbedFetch } from "../types";

export const getSearchKey = async (
  input: string
): Promise<ErrorResult | JsonResult<SearchResult>> => {
  try {
    const request = await axios<ErrorResult | JsonResult<SearchResult>>({
      url: `${EmbedEZ.config.url}/api/v1/providers/search`,
      method: "get",
      headers: {
        Authorization: `Bearer ${EmbedEZ.config.apiKey}`,
      },
      params: {
        url: input,
      },
      validateStatus: () => true,
    });

    if (!request.data.success) {
      return sendErrorAction(
        request.status || 500,
        request.data.message || "bad request"
      );
    }

    return sendJsonAction(request.data.data);
  } catch (error) {
    return sendErrorAction(
      500,
      error instanceof Error ? error.message : "Failed to fetch search key"
    );
  }
};

export const getPreview = async (
  search_key: string
): Promise<ErrorResult | JsonResult<EmbedFetch>> => {
  try {
    const request = await axios<ErrorResult | JsonResult<EmbedFetch>>({
      url: `${EmbedEZ.config.url}/api/v1/providers/preview`,
      method: "get",
      headers: {
        Authorization: `Bearer ${EmbedEZ.config.apiKey}`,
      },
      params: {
        search_key: search_key,
      },
      validateStatus: () => true,
    });

    if (!request.data.success) {
      return sendErrorAction(
        request.status || 500,
        request.data.message || "bad request"
      );
    }

    return sendJsonAction(request.data.data);
  } catch (error) {
    return sendErrorAction(
      500,
      error instanceof Error ? error.message : "Failed to fetch preview"
    );
  }
};

export const getCombined = async (
  input: string
): Promise<ErrorResult | JsonResult<EmbedFetch>> => {
  try {
    const request = await axios<ErrorResult | JsonResult<EmbedFetch>>({
      url: `${EmbedEZ.config.url}/api/v1/providers/combined`,
      method: "get",
      headers: {
        Authorization: `Bearer ${EmbedEZ.config.apiKey}`,
      },
      params: {
        q: input,
      },
      validateStatus: () => true,
    });

    if (!request.data.success) {
      return sendErrorAction(
        request.status || 500,
        request.data.message || "bad request"
      );
    }

    return sendJsonAction(request.data.data);
  } catch (error) {
    return sendErrorAction(
      500,
      error instanceof Error ? error.message : "Failed to fetch combined data"
    );
  }
};
