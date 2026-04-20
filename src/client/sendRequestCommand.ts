
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseResponse } from "./response/baseResponse";

export class SendRequestCommand {

  private url!: string;
  private requestHeaders: Record<string, string> = {};
  private requestParams: Record<string, string> = {};
  private requestBody: any;
  private method: string = "GET";
  private timeout?: number;

  private withBody = false;
  private withParams = false;
  private withHeaders = false;
  private withTimeout = false;

  // 🔧 Fluent Methods

  withRequestUrl(url: string): this {
    this.url = url;
    return this;
  }

  withRequestHeader(headers: Record<string, string>): this {
    this.withHeaders = true;
    this.requestHeaders = headers;
    return this;
  }

  withRequestParameter(params: Record<string, string>): this {
    this.withParams = true;
    this.requestParams = params;
    return this;
  }

  withRequestBody(body: any): this {
    this.withBody = true;
    this.requestBody = body;
    return this;
  }

  withRequestMethod(method:any): this {
    this.method = method.toUpperCase();
    return this;
  }

  withRequestTimeOut(timeout: number): this {
    this.withTimeout = true;
    this.timeout = timeout;
    return this;
  }

  // Execute (Equivalent of Execute())

  async execute(): Promise<BaseResponse> {

    console.log("Executing received request...");

    const config: AxiosRequestConfig = {
      url: this.url,
      method: this.method as any,
      headers: this.withHeaders ? this.requestHeaders : {},
      params: this.withParams ? this.requestParams : {},
      data: this.withBody ? this.requestBody : undefined,
      timeout: this.withTimeout ? this.timeout : undefined
    };

    // CURL Logging
    const curl = this.getCurlCommand();
    console.log("Curl Command -->", curl);

    const start = Date.now();

    try {
      const response: AxiosResponse = await axios(config);

      const responseTime = Date.now() - start;

      console.log(
        `Response: Status ${response.status} | Time: ${responseTime} ms\n`,
        response.data
      );

      return {
        statusCode: response.status,
        responseContent: JSON.stringify(response.data),
        rawResponse: response
      };

    } catch (error: any) {

      const responseTime = Date.now() - start;

      console.error("API Error:", error.response?.data || error.message);

      return {
        statusCode: error.response?.status || 500,
        responseContent: JSON.stringify(error.response?.data || error.message),
        rawResponse: error.response
      };
    }
  }

  // Helper: CURL Generator

  private getCurlCommand(): string {
    let curl = `curl -X ${this.method} "${this.url}"`;

    if (this.withHeaders) {
      for (const key in this.requestHeaders) {
        curl += ` -H "${key}: ${this.requestHeaders[key]}"`;
      }
    }

    if (this.withBody) {
      const body =
        typeof this.requestBody === "string"
          ? this.requestBody
          : JSON.stringify(this.requestBody);

      curl += ` -d '${body}'`;
    }

    return curl;
  }
}