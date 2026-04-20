// src/client/baseCommand.ts

import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AppConfiguration } from "../configuration/appConfiguration";
import { LoginRequest } from "./request/account/loginRequest";
import { AccountApis } from "./apis/accountApis";
import { BaseResponse } from "./response/baseResponse";

export class BaseCommand {

  protected client: AxiosInstance;

  static BaseUrl: string = AppConfiguration.baseUrl;
  static CloudFlareToken: string = AppConfiguration.cloudFlareKey;
  static DefaultApiVersion: string = "1";

  static AuthToken: string;
  static AuthTokenV2: string;

  constructor() {
    this.client = axios.create({
      baseURL: BaseCommand.BaseUrl
    });
  }

  // ✅ Equivalent of GetCommonHeaders()
  static async getCommonHeaders(withToken: boolean = true, version: number = 1): Promise<Record<string, string>> {

    const headers: Record<string, string> = {
      "Cookie": BaseCommand.CloudFlareToken,
      "Accept": "*/*"
    };

    if (withToken) {
      const token = version === 1
        ? await this.getADFToken()
        : BaseCommand.AuthTokenV2;

      headers["Authorization"] = token;
    }

    return headers;
  }

  // ✅ Equivalent of GetADFToken()
  private static async getADFToken(): Promise<string> {

    const loginRequest: LoginRequest = {
      email: "nshaik_anplat_28012026_01@yopmail.com",
      password: "!QAZxsw2",
      provider: "adf"
    };

    const response = await new AccountApis().login(loginRequest);

    return `Bearer ${response.token}`;
  }

  // ✅ Equivalent of ParseApiResponse<T>()
  static parseApiResponse<T>(response: BaseResponse): T {

    let parsed: any = {};

    try {
      parsed = JSON.parse(response.responseContent);
    } catch {
      parsed = {};
    }

    return {
      ...parsed,
      statusCode: response.statusCode,
      responseContent: response.responseContent,
      rawResponse: response.rawResponse
    } as T;
  }

  // ✅ Equivalent of ParseOnlyCustomResponse<T>()
  static parseOnlyCustomResponse<T>(response: BaseResponse): T {

    return {
      statusCode: response.statusCode,
      responseContent: response.responseContent,
      rawResponse: response.rawResponse
    } as T;
  }
}