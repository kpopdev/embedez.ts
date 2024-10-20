import axios from "axios"
import { EmbedEZ } from ".."
import { ErrorResult, JsonResult, sendErrorAction, sendJsonAction } from "../responces"
import { SearchResult, EmbedFetch, EmbedFetchError } from "../types"

export const getSearchKey = async (input: string): Promise<ErrorResult | JsonResult<SearchResult>> => {
  const request = await axios<ErrorResult | JsonResult<SearchResult>>({
    url: `${EmbedEZ.config.url}/api/v1/providers/search`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${EmbedEZ.config.apiKey}`,
    },
    params: {
      url: input
    },
    validateStatus: () => true,
  })

  if (!request.data.success) {
    return sendErrorAction(request.status || 500, request.data.message || "bad request")
  }

  return sendJsonAction(request.data.data)
}

export const getPreview = async (search_key: string): Promise<ErrorResult | JsonResult<EmbedFetchError | EmbedFetch>> => {
  const request = await axios<ErrorResult | JsonResult<EmbedFetchError | EmbedFetch>>({
    url: `${EmbedEZ.config.url}/api/v1/providers/preview`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${EmbedEZ.config.apiKey}`,
    },
    params: {
      search_key: search_key
    },
    validateStatus: () => true,
  })

  if (!request.data.success) {
    return sendErrorAction(request.status || 500, request.data.message || "bad request")
  }

  return sendJsonAction(request.data.data)
}