// src/client/apis/accountApis.ts

import { Method } from "../../enums/jsonReturnType";
import { BaseCommand } from "../baseCommand";
import { LoginRequest } from "../request/account/loginRequest";
import { LoginResponse } from "../response/account/loginResponse";
import { SendRequestCommand } from "../sendRequestCommand";


export class AccountApis extends BaseCommand {

  
  async login(requestBody: LoginRequest, version: number = 1): Promise<LoginResponse> {
    const allure = (this as any).allure;
    const apiKey = "q5].Q7vf*C,4}p'8vVFp8KFsu<7WK->$LT#*7}Vn";

    // Equivalent of GetCommonHeaders(false, version)
    const headers: Record<string, any> = BaseCommand.getCommonHeaders(false, version);
    headers["x-ldi-api-key"] = apiKey;

    const uri = `/api/mobile/v${version}/Account/login`;

    let loginResponse: LoginResponse;

    // Equivalent of AllureApi.Step
    //await allure.step(`Received Login Request for v${version}`, async () => {

      const response = new SendRequestCommand()
       .withRequestUrl(BaseCommand.BaseUrl +uri)
       .withRequestMethod(Method.Post)
       .withRequestHeader(headers)
       .withRequestBody(requestBody)
       .execute();

      loginResponse = BaseCommand.parseApiResponse<LoginResponse>(await response);
   // });

    return loginResponse!;
  }
}