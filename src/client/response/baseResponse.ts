// src/client/response/baseResponse.ts

import { AxiosResponse } from "axios";

export interface BaseResponse {
  statusCode: number;
  responseContent: string;
  rawResponse: AxiosResponse;
}